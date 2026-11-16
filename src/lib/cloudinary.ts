import { createHash, randomUUID } from "node:crypto";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

function configuredCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Document storage is not configured. Please try again later.",
    );
  }
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
  return cloudinary;
}

export function evidenceDigest(content: Buffer) {
  return createHash("sha256").update(content).digest("hex");
}

export async function uploadEvidenceToCloudinary(
  content: Buffer,
  name: string,
) {
  const sdk = configuredCloudinary();
  const extension =
    name
      .split(".")
      .pop()
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 10) || "bin";
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "kairos/evidence";
  if (!/^kairos\/(?:[a-z0-9_-]+\/?)+$/i.test(folder))
    throw new Error("Invalid document storage folder.");
  let result: UploadApiResponse;
  try {
    result = await new Promise<UploadApiResponse>((resolve, reject) => {
      // Raw preserves PDFs, images and office files exactly as supplied. All
      // assets require authenticated delivery, including unpublished drafts.
      sdk.uploader
        .upload_stream(
          {
            resource_type: "raw",
            type: "authenticated",
            overwrite: false,
            public_id: `${folder}/${randomUUID()}.${extension}`,
            timeout: 12000,
          },
          (error, response) => {
            if (error || !response)
              reject(new Error("Cloudinary upload failed."));
            else resolve(response);
          },
        )
        .end(content);
    });
  } catch {
    throw new Error("Document upload failed. Please try again.");
  }
  return {
    storage: "cloudinary" as const,
    cloudinaryPublicId: result.public_id,
    cloudinaryAssetId: result.asset_id,
    size: content.length,
    sha256: evidenceDigest(content),
  };
}

export async function downloadCloudinaryEvidence(publicId: string) {
  const sdk = configuredCloudinary();
  // This signed URL stays on the server. The app endpoint enforces draft
  // ownership before streaming the asset, so no permanent public URL leaks.
  const url = sdk.url(publicId, {
    resource_type: "raw",
    type: "authenticated",
    secure: true,
    sign_url: true,
  });
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    if (!response.ok || !response.body) throw new Error("Unavailable file");
    return response;
  } catch {
    throw new Error("Could not load the document. Please try again.");
  }
}

export async function removeCloudinaryEvidence(publicId: string) {
  const sdk = configuredCloudinary();
  try {
    const options = {
      resource_type: "raw",
      type: "authenticated",
      invalidate: true,
      timeout: 10000,
    } as const;
    const result = await sdk.uploader.destroy(publicId, options);
    if (result.result !== "ok" && result.result !== "not found")
      throw new Error("Deletion failed");
  } catch {
    throw new Error("Could not remove the temporary Cloudinary file.");
  }
}
