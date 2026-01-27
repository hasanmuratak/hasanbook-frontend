"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import "./chat.css";

export default function ChatPage() {
  const { chatId } = useParams();
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [token, setToken] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [mounted, setMounted] = useState(false);

  /* 🔐 TOKEN (SADECE CLIENT) */
  useEffect(() => {
    const t = sessionStorage.getItem("token");
    if (!t) {
      router.push("/login");
      return;
    }

    setToken(t);
    setCurrentUserId(jwtDecode(t).id);
    setMounted(true);
  }, [router]);

  /* 📥 MESAJLARI ÇEK */
  const fetchMessages = useCallback(async () => {
    if (!chatId || !token) return;

    try {
      const res = await fetch(
        `http://localhost:3001/messages/${chatId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("FETCH MESSAGES ERROR:", err.message);
    }
  }, [chatId, token]);
  
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);




  /* 📤 MESAJ GÖNDER */
  const sendMessage = async () => {
    if (!newMessage.trim() || !token) return;

    try {
      const res = await fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomId: chatId,
          text: newMessage,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const savedMessage = await res.json();

      setMessages((prev) =>
        prev.some((m) => m._id === savedMessage._id)
          ? prev
          : [...prev, savedMessage]
      );

      setNewMessage("");
    } catch (err) {
      console.error("SEND MESSAGE ERROR:", err.message);
    }
  };


  /* 🧱 HYDRATION GUARD */

  if (!mounted) return null;
  return (
    <div className="chat-container">
      <div className="chat-header">Chat ID: {chatId}</div>

      <div className="chat-messages">
        {messages.map((m) => {
          const isMe =
            m.sender?._id?.toString() === currentUserId?.toString();

          return (
            <div
              key={m._id}
              className={`message ${isMe ? "me" : "other"}`}
            >
              <div className="username">{m.sender?.username}</div>
              <div className="text">{m.text}</div>
            </div>
          );
        })}
      </div>

      <div className="chat-input">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Mesaj yaz..."
        />
        <button onClick={sendMessage}>Gönder</button>
      </div>
    </div>
  );
}
