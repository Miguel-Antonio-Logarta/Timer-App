import './styles/App.css';
import Timer from './components/Timer.js';
import ATestButton from './components/ATestButton';
import Navbar from './components/Navbar';
import Background from './components/Background';

function App() {
  return (
    <div className="the-app">
      <Navbar/>
      <Timer />
      <Background />
      {/* <ATestButton/> */}
    </div>
  );
}

export default App;
