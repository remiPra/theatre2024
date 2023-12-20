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

function App() {
  return (<>
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
