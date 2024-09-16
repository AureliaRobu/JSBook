import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import CellList from './CellList';

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
}
