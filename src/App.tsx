import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvitationPage from './components/InvitationPage';
import HomePage from './components/HomePage';
import InfoPage from './components/info/InfoPage';
import CrewPage from './components/info/CrewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/crew/:provider" element={<CrewPage />} />
        <Route path="/:slug" element={<InvitationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
