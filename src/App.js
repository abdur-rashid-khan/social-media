import { Route, Routes } from "react-router-dom";
import './App.css';
import NotFound from "./Components/404/NotFound";
import SignUp from "./Components/Auth/CreateAccout/NewAccount";
import Login from "./Components/Auth/Login/Login";
import DashBoard from "./Components/Dashboard/Dashboard";
import Overview from "./Components/Dashboard/Overview";
import Home from "./Components/Home/Home";
import Post from "./Components/Post/Post";
import Navbar from "./Components/share/Navbar/Navbar";
import CreateNewPost from "./Components/Upload/CreateNewPost";
// const socket = io('http://localhost:5000')

function App() {
  // const sendMessage = () => {
  //   socket.emit();
  // }
  return (
    <>

      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<DashBoard />} >
          <Route index element={
            <Post></Post>
          }></Route>
          <Route path='/home' element={
            <Home></Home>
          }></Route>
          <Route path='/create/new-post' element={
            <CreateNewPost></CreateNewPost>
          }></Route>
        </Route>
        <Route path='/login' element={
          <Login></Login>
        }></Route>
        <Route path='/signup' element={
          <SignUp></SignUp>
        }></Route>
        <Route path='*' element={
          <NotFound></NotFound>
        }></Route>
      </Routes>
    </>
  );
}

export default App;
