import { configureStore } from '@reduxjs/toolkit';
import cellsReducer from './reducers/cellsReducer';

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
  },
});
