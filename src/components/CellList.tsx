import { useTypedSelector } from '../hooks/useTypedSelector';

function CellList() {
  useTypedSelector((state) => state);
  return <div>Cell List</div>;
}

export default CellList;
