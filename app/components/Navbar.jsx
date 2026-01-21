"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Switch from '@mui/material/Switch';
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user } = useUser();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    if (!mounted) return null;

    return (
        <AppBar
            position="sticky"
            elevation={1}
            sx={{
                backgroundColor: "background.paper",
                color: "text.primary",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* LOGO */}
                <Typography variant="h6" fontWeight="bold">
                    <img
                        src="/hasanbook2.png"
                        alt="HasanBook Logo"
                        style={{ height: 56, cursor: "pointer" }}
                        onClick={() => router.push("/")}
                    />
                </Typography>

                {/* ACTIONS */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {/* HOME */}
                    <Tooltip title="Ana Sayfa">
                        <IconButton
                            onClick={() => router.push("/")}
                            sx={{ color: "text.primary" }}
                        >
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                    <IconButton onClick={() => setSidebarOpen(prev => !prev)}>
                        <MenuIcon />
                    </IconButton>
                    {/* LOGOUT */}
                    <Tooltip title="Çıkış Yap">
                        <IconButton
                            onClick={logout}
                            sx={{ color: "text.primary" }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>

                    {/* THEME TOGGLE */}
                    <Tooltip title="Tema Değiştir">

                    </Tooltip>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        
                        <Switch
                            size="small"
                            checked={theme === "dark"}
                            onChange={toggleTheme}
                        />
                    </Box>
                    {/* AVATAR */}
                    <Avatar
                        sx={{ width: 36, height: 36, ml: 1 }}
                        src={
                            user?.avatar
                                ? `http://localhost:3001/uploads/${user.avatar}`
                                : "http://localhost:3001/avatars/default.jpg"
                        }
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
