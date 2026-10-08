import { getSessionUser } from "@/lib/session";
import { revision } from "@/lib/revision";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * A live stream of "something changed, re-read the page".
 *
 * Server-sent events rather than a websocket: the app is deployed on a
 * serverless platform where nothing holds a socket open, and this needs no
 * second service, no protocol upgrade and no client library. The browser
 * reconnects on its own when the stream ends.
 *
 * The stream deliberately closes itself after 50 seconds, comfortably inside
 * the platform's function ceiling, and EventSource immediately opens another.
 */
export async function GET(req: Request) {
  const user = await getSessionUser();
  const uid = user ? String(user._id) : undefined;
  const enc = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;
      const send = (event: string, data: unknown) => {
        if (closed) return;
        try {
          controller.enqueue(enc.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
        } catch {
          closed = true;
        }
      };
      const stop = () => {
        if (closed) return;
        closed = true;
        try { controller.close(); } catch { /* already gone */ }
      };
      req.signal.addEventListener("abort", stop);

      let last = await revision(uid);
      send("open", { rev: last });

      const started = Date.now();
      while (!closed && Date.now() - started < 50_000) {
        await new Promise((r) => setTimeout(r, 1000));
        if (closed) break;
        try {
          const now = await revision(uid);
          if (now !== last) {
            last = now;
            send("change", { rev: now });
          } else {
            send("ping", {});           // keeps proxies from closing the pipe
          }
        } catch {
          /* a hiccup reading the database must not kill the stream */
        }
      }
      stop();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
