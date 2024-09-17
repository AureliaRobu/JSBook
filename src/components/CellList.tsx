import { useTypedSelector } from '../hooks/useTypedSelector';
import CellListItem from './CellListItem';

function CellList() {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id];
    });
  });
  return (
    <div>
      {cells.map((cell) => (
        <CellListItem key={cell.id} cell={cell} />
      ))}
    </div>
  );
}

export default CellList;
