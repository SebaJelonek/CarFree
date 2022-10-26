import { Provider } from 'jotai';
import Navigation from './components/Navigation/Navigation';
import './App.css';

function App() {
  return (
    <Provider>
      <h1>
        Rezerwacja restauracja{' '}
        <a
          target='_blank'
          href='https://zsgnr2krakow.pl/restauracja-pokusa-kontakt/'
        >
          pokusa
        </a>
      </h1>
      <div className='App'>
        <Navigation />
      </div>
    </Provider>
  );
}

export default App;
