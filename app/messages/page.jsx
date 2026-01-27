"use client";

import dynamic from "next/dynamic";

const ChatList = dynamic(() => import("./chatlist"), {
  ssr: false,
});

export default function MessagesPage() {
  return (
    <div className="messages-page">
      <div className="chat-list-container">
        <ChatList />
      </div>
    </div>
  );
}
