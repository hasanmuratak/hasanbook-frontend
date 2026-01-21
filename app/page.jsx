"use client";

import { useEffect, useState } from "react";
import { getPosts } from "./api";
import { jwtDecode } from "jwt-decode";
import { useUser } from "./context/UserContext";
import CreatePost from "./components/CreatePost";
import PostCard from "./components/PostCard";
import Sidebar from "./components/Sidebar";
import Protected from "./components/Protected";

import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

export default function App() {
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const currentUserId = token ? jwtDecode(token).id : null;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    loadPosts();
  }, [token]);

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  if (!token) return null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} />

      <button onClick={() => setSidebarOpen(prev => !prev)}>
        Sidebar Aç / Kapat
      </button>

      {/* MAIN */}
      <Box sx={{ flex: 1, padding: 3 }}>
        {/* FEED CONTAINER */}
        <Box
          sx={{
            maxWidth: 800,
            margin: "20px auto",
            backgroundColor: "background.default", // 🔥 var(--bg)
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Protected>
            <CreatePost token={token} onPostCreated={loadPosts} />
          </Protected>

          <Box sx={{ height: 1, my: 2, backgroundColor: "divider" }} />

          {posts.map(p => (
            <PostCard
              key={p._id}
              post={p}
              token={token}
              currentUserId={currentUserId}
              onUpdate={loadPosts}
              user={user}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
