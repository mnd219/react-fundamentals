import {
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import PostsPage from "./pages/PostsPage/PostsPage";
import PostPage from "./pages/PostPage/PostPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage";


function App() {
  const token = localStorage.getItem('token');
  
  return (
    <div className="App">
      <Navbar token={token}/>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="posts" element={<PostsPage />}></Route>
        <Route path="/posts/:postId" element={<PostPage />}></Route>
        <Route path="profile" element={<ProfilePage token={token}/>}></Route>
        <Route path="login" element={<LoginPage token={token}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
