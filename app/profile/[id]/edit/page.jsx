"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { createPP,createWP } from "@/app/api"; // senin api dosyan neredeyse
import { useEffect } from "react";


export default function EditProfilePage() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [wp,setWp] = useState(null);
  const [token, setToken] = useState(null);
 
  useEffect(() => {
    const t = sessionStorage.getItem("token");
    setToken(t);
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const res = await createPP(file, id, token);
      console.log("UPLOAD RESPONSE:", res);
      alert("Profil fotoğrafı yüklendi");
    } catch (err) {
      console.log(err);
      alert("Yükleme hatası");
    }
  };

    const handleUploadWp = async () => {
    if (!wp) return;

    try {
      const res = await createWP(wp, id, token);
      console.log("UPLOAD RESPONSE:", res);
      alert("Kapak fotoğrafı yüklendi");
    } catch (err) {
      console.log(err);
      alert("Yükleme hatası");
    }
  };


 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 space-y-8">
      
      {/* Başlık */}
      <h1 className="text-3xl font-extrabold text-center text-slate-900 tracking-wide">
        Yap <span className="text-slate-400">·</span> Düzenle
      </h1>

      {/* Profil Foto */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-600">
          Profil Fotoğrafı
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
          className="cursor-pointer block w-full text-sm
                     file:mr-4 file:rounded-lg file:border-0
                     file:bg-slate-800 file:px-4 file:py-2
                     file:text-white hover:file:bg-slate-700
                     file:cursor-pointer"
        />

        <button
          onClick={handleUpload}
          className="cursor-pointer w-full py-2 rounded-lg bg-blue-600 text-white font-semibold
                     hover:bg-blue-700 transition"
        >
          Profil Fotoğrafını Yükle
        </button>
      </div>

      <hr className="border-slate-200" />

      {/* Kapak Foto */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-600">
          Kapak Fotoğrafı
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={e => setWp(e.target.files[0])}
          className="cursor-pointer block w-full text-sm
                     file:mr-4 file:rounded-lg file:border-0
                     file:bg-slate-800 file:px-4 file:py-2
                     file:text-white hover:file:bg-slate-700
                     file:cursor-pointer"
        />

        <button
          onClick={handleUploadWp}
          className="cursor-pointer w-full py-2 rounded-lg bg-emerald-600 text-white font-semibold
                     hover:bg-emerald-700 transition"
        >
          Kapak Fotoğrafını Yükle
        </button>
      </div>

    </div>
  </div>
);

}