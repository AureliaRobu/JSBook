import './CellList.css';
import { Fragment } from 'react';
import { useCells } from '../hooks/useCells';
import CellListItem from './CellListItem';
import AddCell from './AddCell';

function CellList() {
  const { cells, cellOrder } = useCells();
  const orderedCells = cellOrder.map((id) => cells[id]);
  return (
    <div className="cell-list">
      <AddCell forceVisible={orderedCells.length === 0} previousCellId={null} />

      {orderedCells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
}

export default CellList;
