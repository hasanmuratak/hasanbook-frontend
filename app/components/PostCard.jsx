"use client";

import { useState } from "react";
import Link from "next/link";
import { likePost, commentPost, deleteComment, deletePostApi } from "../api";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { red } from "@mui/material/colors";
import { useRouter } from "next/navigation";

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";
import dayjs from "../lib/dayjs";
export default function PostCard({
  post,
  token,
  currentUserId,
  onUpdate,
  user
}) {
  const [active, setActive] = useState(false);
  const [commentText, setCommentText] = useState("");
  const router = useRouter();
  const ownerId = post.user?._id?.toString() || post.user.toString();
  const isOwner = ownerId === currentUserId;
  const isAdmin = user?.role === "admin";


  // time //
  const time =
  dayjs().diff(dayjs(post.createdAt), "hour") < 24
    ? dayjs(post.createdAt).fromNow()
    : dayjs(post.createdAt).format("DD MMM"); 


  return (
    <div
      style={{
        border: "1px solid var(--input-border)",
        background: "var(--card)",
        color: "var(--text)",
        padding: 14,
        marginBottom: 14,
        borderRadius: 12,
      }}
    >
      {/* HEADER */}
      <Link href={`/profile/${post.user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Avatar
            src={
              post.user?.avatar
                ? `http://localhost:3001/uploads/${post.user.avatar}`
                : "http://localhost:3001/avatars/default.jpg"
            }
          />
          <b>{post.user.username}</b>
          {/* DELETE POST */}
          {(isOwner || isAdmin) && (
            <button
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "var(--text)",
                cursor: "pointer",
                float: "right",
              }}
              onClick={async (e) => {
                e.preventDefault();     // 🔥 Link’i durdurur
                e.stopPropagation();   // 🔥 Yukarı tıklamayı keser

                const ok = window.confirm("Bu gönderiyi silmek istiyor musun?");
                if (!ok) return;

                await deletePostApi(post._id);
                onUpdate();
              }}
            >
              <ClearSharpIcon sx={{ borderRadius: "50%", padding: "1px",  color: "red", fontSize: 30 }} />
            </button>
          )}
        </Box>
      </Link>




      {/* MEDIA */}
      {post.media && post.mediaType && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          {post.mediaType === "image" ? (
            <img
              src={`http://localhost:3001/uploads/${post.media}`}
              style={{ maxWidth: "85%", borderRadius: 8 }}
            />
          ) : (
            <video
              src={`http://localhost:3001/uploads/${post.media}`}
              controls
              style={{ maxWidth: "70%", borderRadius: 8 }}
            />
          )}
        </div>
      )}

      {/* CONTENT */}
      {post.content && <p style={{ marginBottom: 8 }}>{post.content}</p>}

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: 12, fontSize: 14 }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: "var(--text)",
            cursor: "pointer",
          }}
          onClick={async () => {
            await likePost(post._id, token);
            onUpdate();
          }}
        >
          ❤️ {post.likes?.length || 0}
        </button>

        <button
          style={{
            background: "none",
            border: "none",
            color: "var(--text)",
            cursor: "pointer",
          }}
          onClick={() => setActive(!active)}
        >
          💬 Yanıtla
        </button>

        <span style={{ fontSize: 12, opacity: 0.7 }}>
          
            <span>{time}</span>

        </span>
      </div>

      {/* COMMENT INPUT */}
      {active && (
        <div style={{ marginTop: 10 }}>
          <TextField
            multiline
            minRows={3}
            maxRows={6}
            placeholder="Ne düşünüyorsun?"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: "var(--input-bg)",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                color: "var(--text)",
                "& fieldset": {
                  borderColor: "var(--input-border)",
                },
              },
            }}
          />

          <button
            style={{
              marginTop: 8,
              padding: "6px 12px",
              background: "var(--bg)",
              border: "1px solid var(--input-border)",
              color: "var(--text)",
              borderRadius: 6,
              cursor: "pointer",
            }}
            onClick={async () => {
              if (!commentText) return;
              await commentPost(post._id, commentText, token);
              setCommentText("");
              setActive(false);
              onUpdate();
            }}
          >
            Gönder
          </button>
        </div>
      )}

      {/* COMMENTS */}
      {post.comments.map(c => {
        const ownerId = c.user?._id?.toString() || c.user.toString();
        const isOwner = ownerId === currentUserId;

        return (
          <div
            key={c._id}
            style={{
              border: "1px solid var(--input-border)",
              background: "var(--bg)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 8,
              marginLeft: 20,
              padding: "6px 8px",
              borderRadius: 8,
            }}
          >
            <Link href={`/profile/${c.user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Avatar
                  sx={{ width: 22, height: 22 }}
                  src={
                    c.user?.avatar
                      ? `http://localhost:3001/uploads/${c.user.avatar}`
                      : "http://localhost:3001/avatars/default.jpg"
                  }
                />
                <b style={{ fontSize: 13 }}>{c.user.username}</b>
              </Box>
            </Link>

            <span style={{ fontSize: 13 }}>{c.text}</span>

            {(isOwner || isAdmin) && (
              <button
                style={{
                  marginLeft: "auto",
                  background: "none",
                  border: "none",
                  color: "var(--text)",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  await deleteComment(post._id, c._id, token);
                  onUpdate();
                }}
              >
                <DeleteIcon sx={{ fontSize: 16 }} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
