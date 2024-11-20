import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import StudyRoom from './pages/StudyRoom';
import FlashcardEditor from './pages/FlashcardEditor';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/study/:roomId" element={<StudyRoom />} />
          <Route path="/edit/:cardId?" element={<FlashcardEditor />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
