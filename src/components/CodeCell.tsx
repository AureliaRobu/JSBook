import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundler from '../bundler';
import Resizable from './Resizable';

function CodeCell() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output.code);
      setError(output.error);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => setInput(value)}
            initialValue="const a = 1;"
          />
        </Resizable>
        <Preview code={code} error={error}/>
      </div>
    </Resizable>
  );
}

export default CodeCell;
