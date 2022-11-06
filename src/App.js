import './App.css';
import SearchMovies from './components/SearchMovies';

function App() {
  return (
    <div className="App">
      <main className="main__container">
        <h1 className="main__title">React Movie Search</h1>
        <SearchMovies />
      </main>
    </div>
  );
}

export default App;
