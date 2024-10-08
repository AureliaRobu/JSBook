import { Cell } from '../state';
import './CellListItem.css';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import ActionBar from './ActionBar';

interface CellListItemProps {
  cell: Cell;
}

function CellListItem({ cell }: CellListItemProps) {
  let child: JSX.Element;

  if (cell.type === 'code') {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }
  return <div className="cell-list-item">{child}</div>;
}

export default CellListItem;
