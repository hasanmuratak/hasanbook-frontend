// app/layout.js
import MuiProvider from "./providers/MuiProvider";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <ThemeProvider>
          <MuiProvider>
            <UserProvider>
              <Navbar />
              {children}
            </UserProvider>
          </MuiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
