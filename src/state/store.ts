import { configureStore } from '@reduxjs/toolkit';
import cellsReducer, { insertCellBefore } from './reducers/cellsReducer';

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.dispatch(insertCellBefore({ id: null, type: 'code' }));
store.dispatch(insertCellBefore({ id: null, type: 'text' }));
