import { Routes, Route } from 'react-router-dom';

import Home from '../../pages/home';
import VideoPlayerTest from '../../pages/test';

import './styles.scss';

const Routing = () => (
  <main>
    <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route path='/test' element={<VideoPlayerTest />} />
    </Routes>
  </main>
);

export default Routing;