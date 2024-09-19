import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { useCells } from '../hooks/useCells';
import './ActionBar.css';

interface ActionBarProps {
  id: string;
}

function ActionBar({ id }: ActionBarProps) {
  const { deleteCellById, moveCellInDirection } = useCells();
  return (
    <div className="action-bar">
      <button
        type="button"
        className="button is-primary is-small"
        onClick={() => moveCellInDirection(id, 'up')}
      >
        <span>
          <FaArrowUp />
        </span>
      </button>
      <button
        type="button"
        className="button is-primary is-small"
        onClick={() => moveCellInDirection(id, 'down')}
      >
        <span>
          <FaArrowDown />
        </span>
      </button>
      <button
        type="button"
        className="button is-primary is-small"
        onClick={() => deleteCellById(id)}
      >
        <span>
          <FaTimes />
        </span>
      </button>
    </div>
  );
}

export default ActionBar;
