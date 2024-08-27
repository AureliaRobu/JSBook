import './Preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
    <html>
        <head></head>
        <body>
            <div id = 'root'></div>
            <script >
            const errorHandler = (err)=>{
				const root = document.querySelector('#root');
					root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
					console.error(err);
            }
			window.addEventListener('error', (event)=> {
				event.preventDefault();
				errorHandler(event.error);
			})
            window.addEventListener('message', (event)=> {
				try {
					console.log(event.data)
				  eval(event.data)
				}catch (err){
					errorHandler(err)
				}
				
            }, false)
            </script>
        </body>
    </html>
  `;
function Preview({ code, error }: PreviewProps) {
  const iframe = useRef<any>();

  useEffect(() => {
    const handleLoad = () => {
      iframe.current.contentWindow.postMessage(code, '*');
    };

    iframe.current.srcdoc = html;
    iframe.current.addEventListener('load', handleLoad);

    return () => {
      iframe.current.removeEventListener('load', handleLoad);
    };
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
}

export default Preview;
