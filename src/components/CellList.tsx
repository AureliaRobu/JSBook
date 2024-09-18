import { useCells } from '../hooks/useCells';
import CellListItem from './CellListItem';

function CellList() {
  const { cells, cellOrder } = useCells();
  const orderedCells = cellOrder.map((id) => cells[id]);
  return (
    <div>
      {orderedCells.map((cell) => (
        <CellListItem key={cell.id} cell={cell} />
      ))}
    </div>
  );
}

export default CellList;
