import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  RootState,
  updateCell,
  deleteCell,
  moveCell,
  insertCellBefore,
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
      dispatch(insertCellBefore({ id, type }));
    },
    [dispatch]
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
  };
};
