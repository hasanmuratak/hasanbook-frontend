"use client";


import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "../../globals.css";


export default function ChatPage() {

    const { chatId } = useParams();
    const router = useRouter();

    const token = sessionStorage.getItem("token");

    const currentUserId = token ? jwtDecode(token).id : null;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token]);



    const sendMessage = async () => {

        const response = await fetch("http://localhost:3001/messages", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                roomId: chatId,
                text: newMessage,
            })


        })
        setNewMessage("");

    };

    useEffect(() => {
        // fetch messages for this chat bla bla bla

        fetch(`http://localhost:3001/messages/${chatId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error("Mesajlar alınırken hata oluştu:", err));
    }, [chatId,sendMessage]);


    return (
        <div className="chat-container">
            <div className="chat-header">
                Chat ID: {chatId}
            </div>

            <div className="chat-messages">
                {messages.map((m) => (
                    <div
                        key={m._id}
                        className={`message ${m.sender?._id === currentUserId ? "me" : "other"
                            }`}
                    >
                        <div className="username">
                            {m.sender?.username}
                        </div>
                        {m.text}
                    </div>
                ))}
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

//"use client";

// import { jwtDecode } from "jwt-decode";
// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// export default function ChatPage() {
//   const { chatId } = useParams();
//   const router = useRouter();

//   const token = sessionStorage.getItem("token");
//   const currentUserId = token ? jwtDecode(token).id : null;

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   // auth kontrol
//   useEffect(() => {
//     if (!token) router.push("/login");
//   }, [token]);

//   // mesajları çek
//   useEffect(() => {
//     if (!chatId) return;

//     fetch(`http://localhost:3001/messages/${chatId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then(setMessages)
//       .catch(console.error);
//   }, [chatId]);

//   // mesaj gönder
//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     await fetch("http://localhost:3001/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         roomId: chatId,
//         text: newMessage,
//       }),
//     });

//     setNewMessage("");
//   };

//   return (
//     <div>
//       <h1>Chat ID: {chatId}</h1>

//       {messages.map((m) => (
//         <li key={m._id}>
//           {m.sender?.username}: {m.text}
//         </li>
//       ))}

//       <input
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         placeholder="Mesaj yaz.."
//       />

//       <button onClick={sendMessage}>Gönder</button>
//     </div>
//   );
// }
