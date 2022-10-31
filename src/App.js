import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import './App.css';
import Home from "./Components/Home/Home";
const socket = io('http://localhost:5000')

function App() {
  const sendMessage = () => {
    socket.emit();
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
