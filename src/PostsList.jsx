import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  deletePost,
  fetchPosts,
  fetchPostById,
} from "../src/redux/postsSlice";
import { Link } from "react-router-dom";

const PostsList = () => {
  const dispatch = useDispatch();
  const { posts, postDetails } = useSelector((state) => state.posts) || [];
  const { status } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ title, body }));
    setTitle("");
    setBody("");
  };

  const Del = (id) => {
    dispatch(deletePost(id));
  };

  const openModal = (id) => {
    dispatch(fetchPostById(id));
    setSelectedPost(posts.find((post) => post.id === id));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen p-6`}
    >
      {/* Dark Mode Toggle Button */}
      <div className="flex justify-end">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Posts</h1>

      {/* Create Post */}
      <div className="mb-4 flex gap-4">
        <div className="max-w-lg mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Create Post</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded bg-white text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Body"
              className="w-full p-2 border rounded bg-white text-black"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Posts List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`p-4 rounded-lg shadow-md ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <p className="text-green-500">{post.id}</p>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
            <div className="mb-4 flex justify-between">
              <button
                onClick={() => openModal(post.id)}
                className="text-blue-500 mt-2"
              >
                Read More
              </button>
              <button
                className="text-red-500 mt-2"
                onClick={() => Del(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            } max-w-md w-full`}
          >
            <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
            <p className="mt-4">{selectedPost.body}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsList;
