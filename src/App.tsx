import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvitationPage from './components/InvitationPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<InvitationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
