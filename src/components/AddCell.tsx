import './AddCell.css';
import { FaPlus } from 'react-icons/fa';
import { useCells } from '../hooks/useCells';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

function AddCell({ previousCellId, forceVisible = false }: AddCellProps) {
  const { insertNewCell } = useCells();
  return (
    <div className={`add-cell ${forceVisible ? 'force-visible' : ''}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          type="button"
          onClick={() => insertNewCell(previousCellId, 'code')}
        >
          <span className="icon is-small">
            <FaPlus />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          type="button"
          onClick={() => insertNewCell(previousCellId, 'text')}
        >
          <span className="icon is-small">
            <FaPlus />
          </span>
          <span>Text</span>
        </button>
      </div>

      <div className="divider" />
    </div>
  );
}

export default AddCell;
