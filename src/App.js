import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './HomePage';
import About from './About';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import PlayComponent from './PlayScene';
import AllReplique from './AllReplique';
import Dictaphone from './Speech';

function App() {
  return (<>
    <BrowserRouter>
    <NavBar />
    <div className='mt-[100px]'>

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/about" element={<Dictaphone />} />
        <Route path="/play" element={<PlayComponent />} />
        <Route path="/allsentences" element={<AllReplique />} />
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </div>
    </BrowserRouter>
  </>
  );
}

export default App;
