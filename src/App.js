import './App.css';

import { Route, Routes } from 'react-router-dom';
import Login from './Authentication/Login/Login';
import Register from './Authentication/Register/Register';
import Homepage from './Pages/Home/Homepage';
import Welcome from './Pages/Welcome/Welcome';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='dashboard' element={<Homepage />} />
    </Routes>
  );
}

export default App;
