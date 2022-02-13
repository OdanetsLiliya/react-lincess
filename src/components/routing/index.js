import { Routes, Route } from 'react-router-dom';

import Home from '../../pages/home';
import VideoPlayerTest from '../../pages/test';
import DetailedAnimePage from '../../pages/DetailedAnimePage';

import './styles.scss';

const Routing = () => (
  <main>
    <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route path='/test' element={<VideoPlayerTest />} />
      <Route path='/detailed' element={<DetailedAnimePage />} />
    </Routes>
  </main>
);

export default Routing;