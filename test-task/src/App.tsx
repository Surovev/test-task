
import './App.scss';
import Finalize from './pages/Finalize/Finalize';
import Dashboard from './pages/Dashboard/Dashboard';
import Results from './pages/Results/Results';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="results/:id" element={<Results />} />
        <Route path="finalize/:id" element={<Finalize />} />
      </Routes>
    </div>
  );
}

export default App;
