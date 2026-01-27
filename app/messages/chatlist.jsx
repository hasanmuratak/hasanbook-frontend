"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import  "./message.css";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [token, setToken] = useState(null);
  const router = useRouter();

  // 🔐 TOKEN (hydration-safe)
  useEffect(() => {
    const t = sessionStorage.getItem("token");
    if (!t) {
      router.push("/login");
    } else {
      setToken(t);
    }
  }, [router]);

  const userId = token ? jwtDecode(token).id : null;

  // 📥 CHATLERİ ÇEK
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:3001/chats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChats(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("CHAT FETCH ERROR:", err);
      });
  }, [token]);

  return (
    <div className="chat-list">
      <h2>Chat List be</h2>

      {chats.map((chat) => {
        const otherUser = chat.participants?.find(
          (u) => u._id !== userId
        );

        return (
          <div
            key={chat._id}
            className="chat-item"
            onClick={() => router.push(`/messages/${chat._id}`)}
          >
            <div className="chat-title">
              {chat.isGroupChat
                ? chat.chatName
                : otherUser?.username}
            </div>

            <div className="chat-last">
              {chat.lastMessage?.text || "Mesaj yok"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
