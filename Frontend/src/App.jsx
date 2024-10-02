import './App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Layout from './pages/layout';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='register' element={<Register/>} />
      <Route path='login' element={<Login/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
