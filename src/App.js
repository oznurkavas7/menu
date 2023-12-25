import './App.css';
import Login from './components/Login';
import Menu from './components/Menu';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';

function App() {
  return (
    <div>
    <Router>
      <Header></Header>
      <Routes>
      <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
    </Routes>
    </Router>
  </div>
  );
}

export default App;
