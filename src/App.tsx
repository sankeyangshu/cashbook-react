import { HashRouter } from 'react-router-dom';
import Router from './routers';
import NavBar from '@/components/NavBar';

const App = () => {
  return (
    <HashRouter>
      <Router />
      <NavBar />
    </HashRouter>
  );
};

export default App;
