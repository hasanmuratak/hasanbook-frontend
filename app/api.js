
import axios from "axios";

const API = "http://localhost:3001";

export const loginApi = async (email, password) => {
  const response = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return response.json();
};

export const getPosts = async () => {
  const response = await fetch(`${API}/posts`);
  return response.json();
};

export const createPost = async (formData, token) => {
  const response = await fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    
    },
    body: formData
  });

  return response.json();
};

// export const deletePost = async(postId ,token)=>{
//   const response = await fetch(`${API}/posts/${postId}`,{
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`
//     },
    
//   });
//   return response.json();
// }
export const deletePostApi = async (id) => {
  const token = sessionStorage.getItem("token");

  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

   console.log("DELETE STATUS:", res.status);

  const text = await res.text();
  console.log("DELETE RESPONSE:", text);

  if (!res.ok) {
    throw new Error(text || "Post silinemedi");
  }


  return true; // başarılı
};




export const likePost = async (id, token) => {
  const response = await fetch(`${API}/posts/${id}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.json();
};

export const commentPost = async (id, text, token) => {
  const response = await fetch(`${API}/posts/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });

  return response.json();
};

export const deleteComment = async (postId, commentId, token) => {
  console.log("DELETE PARAMS:", postId, commentId); // 🔍 DEBUG

  const res = await fetch(
    `http://localhost:3001/posts/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
};

// createPP.js
export const createPP = async (file, id, token) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch(
    `http://localhost:3001/users/${id}/avatar`, // 🔥 BURASI
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }
  );

  return res.json();
};

export const createWP = async (file,id,token) =>{

  const formData = new FormData();
  formData.append("wallpaper",file);

const res = await fetch(
      `http://localhost:3001/users/${id}/wallpaper`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
          // ❌ Content-Type YAZMA
        },
        body: formData
      }
    );

  return res.json();
};




// bildirim kısmı

// const api = axios.create({
//   baseURL: "http://localhost:3001"
// });

// api.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const getNotifications = async () => {
//   const res = await api.get("/api/notifications");
//   return res.data;
// };