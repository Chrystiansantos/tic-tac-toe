import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Play } from '../pages/Play';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
}
