import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';
import TextEditor from './TextEditor';
import { store } from '../state/store';

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <TextEditor />
      </Provider>
    </div>
  );
}
