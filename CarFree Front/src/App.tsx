import { Provider } from 'jotai';
import Navigation from './components/Navigation/Navigation';
import './App.css';

function App() {
  return (
    <Provider>
      <div className='App'>
        <Navigation />
      </div>
    </Provider>
  );
}

export default App;
