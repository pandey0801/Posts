import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsList from "./PostsList";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostsList />} />
      </Routes>
    </>
  );
}

export default App;
