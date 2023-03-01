import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import Page from './components/Page';
import Loginpage from './components/LoginPage';
function App() {
  return (
    <>

    <Routes>
    <Route  path="/" element={<Loginpage />}> </Route> 
    <Route  path="/post" element={<Page />}> </Route>
    </Routes>
    </>
  );
}

export default App;
