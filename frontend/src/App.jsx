import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import CreatePost from "./components/Post/CreatePost";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact/:id" element={<Contact />} />
          <Route path="/post" element={<CreatePost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
