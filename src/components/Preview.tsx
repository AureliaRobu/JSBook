import { useEffect, useRef, useCallback } from 'react';
import './Preview.css';

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        const errorHandler = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        };

        window.addEventListener('error', (event) => {
          event.preventDefault();
          errorHandler(event.error);
        });

        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            errorHandler(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;

function Preview({ code, error }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendCode = useCallback(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(code, '*');
    }
  }, [code]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.srcdoc = html;
      const handleLoad = () => sendCode();
      iframe.addEventListener('load', handleLoad);

      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, [sendCode]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
}

export default Preview;
