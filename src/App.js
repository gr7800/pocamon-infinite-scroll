import logo from './logo.svg';
import './App.css';
import MainRoutes from './AllRoutes/MainRoutes';
import Navbar from './componets/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainRoutes/>
    </div>
  );
}

export default App;
