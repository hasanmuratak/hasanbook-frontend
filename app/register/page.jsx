"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../index.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password,username })
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Kayıt başarısız");
        return;
      }

      // 🔥 AUTO LOGIN
      localStorage.setItem("token", data.token);
      setEmail("");
      setPassword("");
      router.push("/"); // FEED

    } catch (err) {
      console.error(err);
      alert("Backend'e bağlanılamıyor");
    }
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Kayıt Ol</h2>
          <input
          type="text"
          placeholder="Kullanıcı adı giriniz"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Kayıt Ol</button>
      </div>
    </div>
  );
}
