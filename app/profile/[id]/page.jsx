"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import FollowButton from "../../components/FollowButton";
import { useTheme } from "../../context/ThemeContext";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import "./profile.css";

export default function ProfilePage() {
    const router = useRouter();
    const { id } = useParams();

    const { theme, toggleTheme } = useTheme();

    // 🔐 Giriş yapan kullanıcı ID
    const token =
        typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    const currentUserId = token ? jwtDecode(token).id : null;

    // 🧠 STABLE INITIAL STATE
    const [data, setData] = useState({
        user: {
            _id: "",
            username: "",
            email: "",
            avatar: "",
            wallpaper: "",
            followers: [],
            following: []
        },
        posts: []
    });


    const [ShowFollowers, setShowFollowers] = useState(false);
    const [ShowFollowing, setShowFollowing] = useState(false);

    // 🔄 PROFİLİ ÇEK
    const fetchProfile = () => {
        fetch(`http://localhost:3001/users/${id}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err));
    };
    // TAKİPÇİ SAYISINI ÇEK BAKİM



    // 🔁 Profil değişince çek
    useEffect(() => {
        fetchProfile();
    }, [id]);

    // 🔐 Auth kontrol
    useEffect(() => {
        if (!token) {
            router.push("/login");
            return;
        }

        try {
            jwtDecode(token);
        } catch {
            router.push("/login");
        }
    }, []);

    // ⏳ Yüklenme guard
    if (!data.user._id) return <p>Yükleniyor...</p>;

    return (
        <div className="arkaplan">
            {/* WALLPAPER */}
            <img
                className="wallpaper"
                src={
                    data.user.wallpaper
                        ? `http://localhost:3001/uploads/${data.user.wallpaper}`
                        : "/wallpapers/default.png"
                }
                onError={(e) => (e.currentTarget.src = "/wallpapers/default.png")}
                alt="Kapak"
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: 12 }}
            />

            {/* AVATAR + ACTIONS */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    marginTop: -90
                }}
            >
                <img
                    className="avatar"
                    src={
                        data.user.avatar
                            ? `http://localhost:3001/uploads/${data.user.avatar}`
                            : "/avatars/default.jpg"
                    }
                    onError={(e) => (e.currentTarget.src = "/avatars/default.jpg")}
                    alt="Avatar"
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: "20%",
                        border: "2px solid white",
                        marginTop: 20,
                        marginLeft: 0

                    }}
                />



                {/* FOLLOW */}

                <div className="profile-header">



                    <div className="profile-stats" >
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowFollowers(true)}
                        ><b>{data.user.followers.length}</b> Followers</span>
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowFollowing(true)}><b>{data.user.following.length}</b> Following</span>
                        <span><b>{data.posts.length}</b> Posts</span>

                    </div>
                    <FollowButton

                        profileUserId={data.user._id}
                        myUserId={currentUserId}
                        followers={data.user.followers}
                        onChange={fetchProfile}
                    />
                    <MailOutlineIcon
                        style={{ cursor: "pointer", marginLeft: 10 }}
                        onClick={async () => {
                            const res = await fetch("http://localhost:3001/chats", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`
                                },
                                body: JSON.stringify({ userId: data.user._id })
                            });

                            const chat = await res.json();
                            router.push(`/messages/${chat._id}`);
                        }}


                    />
                </div>

            </div>
            {/*FOLLOWERS SHOW CARD :D */}

            {ShowFollowers && (
                <div
                    className="followers-overlay"
                    onClick={() => setShowFollowers(false)}
                >
                    <div
                        className="followers-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="followers-title">Takipçiler</h3>

                        <div className="followers-list">
                            {data.user.followers.map((f) => (
                                <div
                                    key={f._id}
                                    className="followers-item"
                                    onClick={() => {
                                        setShowFollowers(false);
                                        router.push(`/profile/${f._id}`);
                                    }}
                                >
                                    <img
                                        src={
                                            f.avatar
                                                ? `http://localhost:3001/uploads/${f.avatar}`
                                                : "/avatars/default.jpg"
                                        }
                                        alt={f.username}
                                        className="followers-avatar"
                                    />
                                    <span className="followers-username">
                                        {f.username}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* FOLLOWING FACE CARDD :D */}

            {/*FOLLOWERS SHOW CARD :D */}

            {ShowFollowing && (
                <div
                    className="followers-overlay"
                    onClick={() => setShowFollowing(false)}
                >
                    <div
                        className="followers-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="followers-title">Takip Edilenler</h3>

                        <div className="followers-list">
                            {data.user.following.map((f) => (
                                <div
                                    key={f._id}
                                    className="followers-item"
                                    onClick={() => {
                                        setShowFollowing(false);
                                        router.push(`/profile/${f._id}`);
                                    }}
                                >
                                    <img
                                        src={
                                            f.avatar
                                                ? `http://localhost:3001/uploads/${f.avatar}`
                                                : "/avatars/default.jpg"
                                        }
                                        alt={f.username}
                                        className="followers-avatar"
                                    />
                                    <span className="followers-username">
                                        {f.username}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}




            {/* KENDİ PROFİLİ */}
            {currentUserId === data.user._id && (
                <Button
                    onClick={() => router.push(`/profile/${id}/edit`)}
                    variant="contained"
                >
                    Profili Düzenle <EditIcon sx={{ ml: 1, fontSize: 16 }} />
                </Button>
            )}
            {/* USER INFO */}
            <div style={{ marginTop: 16 }}>
                <p style={{ color: "#666", margin: 0 }}>
                    <b>{data.user.username}</b>
                </p>
                <p style={{ color: "#888", margin: 0 }}>{data.user.email}</p>
            </div>

            <hr style={{ margin: "20px 0" }} />

            {/* POSTS */}
            <h3>Postlar</h3>

            {data.posts.length === 0 && (
                <p style={{ color: "#888" }}>Henüz post yok.</p>
            )}

            {data.posts.map((post) => (
                <div
                    key={post._id}
                    style={{
                        border: "1px solid #ddd",
                        padding: 12,
                        marginBottom: 14,
                        borderRadius: 10
                    }}
                >
                    {post.media &&
                        (post.mediaType === "image" ? (
                            <img
                                src={`http://localhost:3001/uploads/${post.media}`}
                                alt=""
                                style={{ maxWidth: "100%", borderRadius: 8 }}
                            />
                        ) : (
                            <video
                                src={`http://localhost:3001/uploads/${post.media}`}
                                controls
                                style={{ maxWidth: "100%", borderRadius: 8 }}
                            />
                        ))}

                    <p style={{ marginTop: 10 }}>{post.content}</p>
                    <small style={{ color: "#888" }}>
                        {new Date(post.createdAt).toLocaleDateString()}
                    </small>
                </div>
            ))}
        </div>
    );
}