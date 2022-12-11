import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/topbar/Topbar';
import { Context } from './context/Context';
import Homepage from './page/homepage/Homepage';
import Login from './page/login/Login';
import Register from './page/register/Register';
import Settings from './page/settings/Settings';
import Single from './page/single/Single';
import Write from './page/write/Write';

function App() {
  const [state] = useContext(Context);
  const user = state.user;

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/login' element={user ? <Homepage />: <Login />}></Route>
        <Route path='/register' element={user ? <Homepage />: <Register />}></Route>
        <Route path='/settings' element={user ? <Settings /> : <Register/>}></Route>
        <Route path='/write' element={user ? <Write /> : <Register />}></Route>
        <Route path='/single' element={<Settings />}></Route>
        <Route path='/post/:postId' element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;