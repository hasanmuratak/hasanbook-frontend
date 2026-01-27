"use client";

import Navbar from "./Navbar";
import MuiProvider from "../providers/MuiProvider";
import { UserProvider } from "../context/UserContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <MuiProvider>
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
      </MuiProvider>
    </ThemeProvider>
  );
}
