import './CodeCell.css';
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
  const { updateCellContent, getCumulativeCode } = useCells();
  const { createBundle, bundles } = useBundles();
  const bundle = bundles[cell.id];
  const cumulativeCode = getCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      const timer = setTimeout(async () => {
        await createBundle(cell.id, cumulativeCode.join('\n'));
      }, 0);
      return () => {
        clearTimeout(timer);
      };
    }
    const timer = setTimeout(async () => {
      await createBundle(cell.id, cumulativeCode.join('\n'));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [createBundle, cell.id, cumulativeCode.join('\n')]);

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
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
}

export default CodeCell;
