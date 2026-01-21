"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginApi } from "../api";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

   useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 


  const login = async () => {
    try {
      const res = await loginApi(email, password);

      console.log("LOGIN RESPONSE:", res);

      if (res.token) {
        localStorage.setItem("token", res.token);
        router.push("/"); // 🔥 FEED
      } else {
        alert(res.message || "Login başarısız");
      }
    } catch (err) {
      console.error(err);
      alert("Backend'e bağlanılamıyor");
    }
  };



  return (
    <>
    <div className="center">
      <div className="card">
        <h2>Login</h2>

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />

        <button onClick={login}>Giriş Yap</button>

        <span style={{ marginTop: 10 }}>
          Hesabın yok mu?{" "}
          <a href="/register" style={{ color: "blue", cursor: "pointer" }}>
            Kayıt Ol
          </a>
        </span>



      </div>
    </div>
    </>
  );
}
