import { Routes, Route } from 'react-router-dom';
import { General } from './components/General.jsx';
import { Login } from './components/Login.jsx';
import { NotFound } from './components/NotFoundPage.jsx';

function App() {
  return (
      <Routes>
        <Route path="/" element={<General />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;