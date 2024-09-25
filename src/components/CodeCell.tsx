import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import { Cell } from '../state';
import { useCells } from '../hooks/useCells';
import { useBundles } from '../hooks/useBundles';

interface CodeCellProps {
  cell: Cell;
}

function CodeCell({ cell }: CodeCellProps) {
  const { updateCellContent } = useCells();
  const { createBundle, bundles } = useBundles();
  const bundle = bundles[cell.id];
  console.log(bundle);

  useEffect(() => {
    if (!bundle) {
      const timer = setTimeout(async () => {
        await createBundle(cell.id, cell.content);
      }, 0);
      return () => {
        clearTimeout(timer);
      };
    }
    const timer = setTimeout(async () => {
      await createBundle(cell.id, cell.content);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [createBundle, cell.id, cell.content]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCellContent(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div>Loading...</div>
        ) : (
          <Preview code={bundle.code} error={bundle.err} />
        )}
      </div>
    </Resizable>
  );
}

export default CodeCell;
