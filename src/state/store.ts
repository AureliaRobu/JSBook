import { configureStore } from '@reduxjs/toolkit';
import cellsReducer, { insertCellAfter } from './reducers/cellsReducer';
import bundlesReducer from './reducers/bundlesReducer';

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.dispatch(insertCellAfter({ id: null, type: 'code' }));
store.dispatch(insertCellAfter({ id: null, type: 'text' }));
