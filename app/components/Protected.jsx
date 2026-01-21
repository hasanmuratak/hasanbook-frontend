export default function Protected({ children }) {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) return <p>Giriş yapman gerekiyor</p>;
  }

  return children;
}