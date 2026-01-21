"use client";

import { useState, useRef } from "react";
import { createPost } from "../api";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export default function CreatePost({ token, onPostCreated }) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const fileInputRef = useRef(null);

  const openFile = (acceptType) => {
    setAnchorEl(null);
    fileInputRef.current.accept = acceptType;
    fileInputRef.current.click();
  };

  const handlePost = async () => {
    if (!content.trim() && !file) return;

    const formData = new FormData();
    formData.append("content", content);
    if (file) formData.append("media", file);

    await createPost(formData, token);

    setContent("");
    setFile(null);
    onPostCreated();
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper", // 🔥 var(--card)
        border: "1px solid var(--input-border)",
        borderRadius: 3,
        padding: 2,
        marginBottom: 2,
      }}
    >
      {/* TEXTAREA */}
      <TextField
        multiline
        minRows={3}
        maxRows={6}
        placeholder="Ne düşünüyorsun?"
        value={content}
        onChange={e => setContent(e.target.value)}
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

      {/* GİZLİ FILE INPUT */}
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={e => setFile(e.target.files[0])}
      />

      {/* MEDYA BUTONU */}
      <Button
        variant="contained"
        size="small"
        startIcon={<AddPhotoAlternateIcon />}
        sx={{
          mt: 1,
          textTransform: "none",
          borderRadius: 2,
        }}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        Medya Ekle
      </Button>

      {/* MEDYA MENÜ */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => openFile("image/*")}>🖼 Fotoğraf</MenuItem>
        <MenuItem onClick={() => openFile("video/*")}>🎥 Video</MenuItem>
      </Menu>

      {/* DOSYA ADI */}
      {file && (
        <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
          {file.name}
        </Typography>
      )}

      {/* PAYLAŞ */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button
          variant="contained"
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
          onClick={handlePost}
        >
          Paylaş
        </Button>
      </Box>
    </Box>
  );
}
