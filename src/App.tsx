import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InvitationPage from './components/InvitationPage';
import yachtVector from './assets/images/yacht.png';

const HomePage = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      navigate(`/${code.trim()}`);
    }
  };

  return (
    <div className="container text-center p-4 d-flex flex-col items-center justify-center" style={{ minHeight: '80vh' }}>
      <div className="mb-3">
        <img src={yachtVector} alt="" style={{ width: '150px', opacity: 0.8 }} />
      </div>

      <h1 className="mb-2">Anna & Paweł</h1>
      <p className="mb-2 text-md">Wpisz kod z zaproszenia, aby potwierdzić obecność.</p>

      <form onSubmit={handleSubmit} className="w-full" style={{ maxWidth: '300px' }}>
        <div className="form-group mb-1">
          <input
            type="text"
            placeholder="Twój kod (np. nowaki)"
            value={code}
            onChange={e => setCode(e.target.value)}
            className="text-center"
            autoFocus
          />
        </div>
        <button type="submit" className="btn w-full">Otwórz zaproszenie</button>
      </form>
    </div>
  );
};

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
