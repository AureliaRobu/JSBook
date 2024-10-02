import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  RootState,
  updateCell,
  deleteCell,
  moveCell,
  insertCellAfter,
  CellTypes,
  Direction,
} from '../state';

export const useCells = () => {
  const dispatch = useDispatch();
  const {
    data: cells,
    order,
    loading,
    error,
  } = useSelector((state: RootState) => state.cells);

  const updateCellContent = useCallback(
    (id: string, content: string) => {
      dispatch(updateCell({ id, content }));
    },
    [dispatch]
  );

  const deleteCellById = useCallback(
    (id: string) => {
      dispatch(deleteCell(id));
    },
    [dispatch]
  );

  const moveCellInDirection = useCallback(
    (id: string, direction: Direction) => {
      dispatch(moveCell({ id, direction }));
    },
    [dispatch]
  );

  const insertNewCell = useCallback(
    (id: string | null, type: CellTypes) => {
      dispatch(insertCellAfter({ id, type }));
    },
    [dispatch]
  );

  const getCumulativeCode = useCallback(
    (cellId: string): string => {
      const showFunc = `
      var show = function(value) {
        const root = document.getElementById('root');
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      }
    `;
      const showFuncNoOp = `var show = () => {}`;

      const orderedCells = order.map((id) => cells[id]);
      const cumulativeCode: string[] = [];

      for (const cell of orderedCells) {
        if (cell.type === 'code') {
          if (cell.id === cellId) {
            cumulativeCode.push(showFunc);
          } else {
            cumulativeCode.push(showFuncNoOp);
          }
          cumulativeCode.push(cell.content);
        }
      }

      return cumulativeCode.join('\n');
    },
    [cells, order]
  );

  return {
    cells,
    cellOrder: order,
    isLoading: loading,
    error,
    updateCellContent,
    deleteCellById,
    moveCellInDirection,
    insertNewCell,
    getCumulativeCode,
  };
};
