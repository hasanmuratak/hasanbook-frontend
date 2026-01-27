"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { jwtDecode } from "jwt-decode";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "../context/ThemeContext";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import ContrastTwoToneIcon from '@mui/icons-material/ContrastTwoTone';
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

export default function Sidebar({ open }) {
  const { theme, toggleTheme } = useTheme();
  const token = typeof window !== 'undefined' ? sessionStorage.getItem("token") : null;
  const currentUserId = token ? jwtDecode(token).id : null;

  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("lg"));
  //xs  → telefon
  //sm  → küçük tablet
  //md  → laptop sınırı
  //lg  → büyük ekran

  const router = useRouter();


  if (!open) return null;



  return (
    <Box
      sx={{
        width: isMobile ? 72 : 220,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "fixed",
        height: "100vh",
        boxSizing: "border-box",
        backgroundColor: "var(--card)",
        borderRight: "1px solid var(--input-border)",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
      }}
    >
      {/* LOGO */}
      <Typography variant="h6" fontWeight="bold">

      </Typography>

      {/* NAV ITEMS */}
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            gap: isMobile ? 0 : 1,
          }}
        >
          <HomeIcon />
          {!isMobile && <Typography fontWeight={600}>Ana Sayfa</Typography>}
        </Box>
      </Link>

      <Link href={`/profile/${currentUserId}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            gap: isMobile ? 0 : 1,
          }}
        >
          <PersonIcon />
          {!isMobile && <Typography fontWeight={600} >Profil</Typography>}
        </Box>
      </Link>

              {/* MESAJLAR */}
      <Link
        href="/messages"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Box
          onClick={() => router.push("/messages")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            gap: isMobile ? 0 : 1,
            cursor: "pointer",
          }}
        >
          <MailOutlineIcon />
          {!isMobile && <Typography fontWeight={600}>Mesajlar</Typography>}
        </Box>
      </Link>


      <Link href="/notifications" style={{ textDecoration: "none", color: "inherit" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            gap: isMobile ? 0 : 1,

          }}
        >
          <NotificationsIcon />
          {!isMobile && <Typography fontWeight={600}>Bildirim</Typography>}
        </Box>
      </Link>









    </Box>




  );
}
