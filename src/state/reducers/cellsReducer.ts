import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    updateCell: (
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.data[id];
      state.order = state.order.filter((cellId) => cellId !== id);
    },
    moveCell: (
      state,
      action: PayloadAction<{ id: string; direction: 'up' | 'down' }>
    ) => {
      const { id, direction } = action.payload;
      const index = state.order.findIndex((cellId) => cellId === id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
    },
    insertCellAfter: (
      state,
      action: PayloadAction<{ id: string | null; type: 'code' | 'text' }>
    ) => {
      const { id, type } = action.payload;
      const newCell: Cell = {
        id: Math.random().toString(36).substr(2, 5),
        type,
        content: '',
      };

      state.data[newCell.id] = newCell;

      const foundIndex = state.order.findIndex((cellId) => cellId === id);
      if (foundIndex < 0) {
        state.order.unshift(newCell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, newCell.id);
      }
    },
  },
});

export const { updateCell, deleteCell, moveCell, insertCellAfter } =
  cellsSlice.actions;
export default cellsSlice.reducer;
