import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundler from '../bundler';
import Resizable from './Resizable';
import { Cell } from '../state';
import { useCells } from '../hooks/useCells';

interface CodeCellProps {
  cell: Cell;
}

function CodeCell({ cell }: CodeCellProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const { updateCellContent } = useCells();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      setCode(output.code);
      setError(output.error);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCellContent(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
