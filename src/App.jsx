import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsList from "./PostsList";
// import CreatePost from "./CreatePost";
// import PostDetails from "./PostDetails";
// import PostsList from "./pages/PostsList";
// import PostDetails from "./pages/PostDetails";
// import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostsList />} />
        {/* <Route path="/post/:id" element={<PostDetails />} /> */}
        {/* <Route path="/create" element={<CreatePost />} /> */}
      </Routes>
    </>
  );
}

export default App;
