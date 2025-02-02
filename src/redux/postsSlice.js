// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // const API_URL = "https://jsonplaceholder.typicode.com/posts";
// // https://jsonplaceholder.typicode.com/todos
// const API_URL = "https://jsonplaceholder.typicode.com/posts";

// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
//   const response = await fetch(API_URL);
//   const data = await response.json();
//   return data;
// });

// // export const fetchPostsById = createAsyncThunk(
// //   "posts/fetchPostsById",
// //   async (id) => {
// //     // const response = await fetch(API_URL);
// //     const response = await fetch(`${API_URL}/${id}`);
// //     const data = await response.json();
// //     console.log("data", data);
// //     return data;
// //   }
// // );

// // Fetch a single post by ID
// export const fetchPostById = createAsyncThunk(
//   "posts/fetchPostById",
//   async (id) => {
//     const response = await axios.get(
//       `https://jsonplaceholder.typicode.com/posts/${id}`
//     );
//     return response.data;
//   }
// );

// export const createPost = createAsyncThunk("posts/createPost", async (post) => {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(post),
//   });
//   const data = await response.json();
//   return data;
// });

// export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
//   await fetch(`${API_URL}/${id}`, {
//     method: "DELETE",
//   });
//   return id;
// });

// const postsSlice = createSlice({
//   name: "posts",
//   initialState: { posts: [], status: "idle", error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.posts = action.payload;
//       })
//       // .addCase(fetchPostsById.fulfilled, (state, action) => {
//       //   state.posts = action.payload;
//       // })
//       .addCase(createPost.fulfilled, (state, action) => {
//         state.posts.unshift(action.payload);
//       })
//       .addCase(deletePost.fulfilled, (state, action) => {
//         state.posts = state.posts.filter((post) => post.id !== action.payload);
//       });
//   },
// });

// export default postsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
});

// Fetch a single post by ID using fetch
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  }
);

// Create a new post
export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  console.log("post", post);
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  console.log("data", data);
  return data;
});

// Delete a post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return id;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], postDetails: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        console.log("get", state.posts);

        // const existingPosts = new Map(
        //   state.posts.map((post) => [post.id, post])
        // );
        // action.payload.forEach((post) => existingPosts.set(post.id, post));

        // state.posts = Array.from(existingPosts.values());
        // console.log("Updated posts after fetch:", state.posts);
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.postDetails = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        // state.posts.unshift(action.payload);
        // state.posts = [action.payload, ...state.posts]; // Correct way to update the state
        // console.log("action.payload", action);
        // console.log("state.posts", state.posts);
        // console.log("check", state.posts);

        const newPost = { ...action.payload, id: Date.now() }; // Generate unique ID
        state.posts = [newPost, ...state.posts]; // Add to the start of the list
        console.log("New post:", newPost);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
