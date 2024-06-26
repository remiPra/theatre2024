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
import Dictaphone from './Dictaphone'
import PlayComponentAudio from './PlaySceneAudio';
import Ollama from './Ollama';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './LoginPage';
import GroqApiComponent from './GroqApi';
import Anthropic from './AnthropicApi';
import PlayAudioTraining from './PlayAudioTraining';
import Secretaire from './components/Secretaire';

function App() {
  return (<>
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <div className='mt-[100px]'>

          <Routes>
            
            {/* <Route path="/about" element={<Dictaphone />} /> */}
            {/* <Route path="/play" element={<PlayComponent />} /> */}
          
            <Route path="/" element={
              <ProtectedRoute redirectTo="/login">
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/audio" element={
              <ProtectedRoute redirectTo="/login">
               <PlayComponentAudio />
              </ProtectedRoute>
            } />
            <Route path="/training" element={
              <ProtectedRoute redirectTo="/login">
               <PlayAudioTraining />
              </ProtectedRoute>
            } />
              <Route path="/login" element={<LoginPage />} />
            {/* <ProtectedRoute>
              <Route path="/audio" element={<PlayComponentAudio />} />
            </ProtectedRoute> */}
            <Route path="/allsentences" element={<AllReplique />} />
            {/* <Route path="/ollama" element={<Ollama />} /> */}
            <Route path="/groq" element={<GroqApiComponent />} />
            <Route path="/anthro" element={<Anthropic />} />
            <Route path="/secret" element={<Secretaire />} />
            {/* Ajoutez d'autres routes ici */}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  </>
  );
}

export default App;
