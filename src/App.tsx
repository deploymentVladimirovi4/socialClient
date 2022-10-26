import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UserPage from "./pages/userPage/UserPage";
import People from "./pages/people/People";
import Messenger from "./pages/messenger/Messenger";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import { useSelector } from "react-redux";
import { selectIsAuth } from "./redux/slices/AuthSlice";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import VideosPage from "./pages/videosPage/VideosPage";
import MusicPage from "./pages/musicPage/MusicPage";

function App() {
  const isAuth = useSelector(selectIsAuth);
  return (
    <BrowserRouter>
      <div className="app">
        <Topbar />
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile/:userId"
            element={isAuth ? <UserPage /> : <Login />}
          />
          <Route path="/users" element={isAuth ? <People /> : <Login />} />
          <Route
            path="/messenger"
            element={isAuth ? <Messenger /> : <Login />}
          />
          <Route path="/videos" element={isAuth ? <VideosPage /> : <Login />} />
          <Route path="/music" element={isAuth ? <MusicPage /> : <Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
