/**
 * Applies the saved theme before the first paint, so a viewer who chose light
 * never sees a black flash on the way in.
 */
export default function ThemeScript() {
  const js = `(function(){try{var m=localStorage.getItem('kairos-theme');if(m==='light'||m==='dark')document.documentElement.setAttribute('data-theme',m);}catch(e){}})()`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
