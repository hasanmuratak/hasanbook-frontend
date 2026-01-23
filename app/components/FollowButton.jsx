"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function FollowButton({
    profileUserId, myUserId, followers, onChange
}) {
    const isMe = profileUserId === myUserId;
    const [isfollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const result = followers?.some(
            (f) =>
                (f._id && f._id.toString() === myUserId) ||
                f.toString() === myUserId
        );
        setIsFollowing(result);
    }, [followers, myUserId]);



    const handlefollow = async () => {
        try {
            if (isfollowing) {
                await axios.post(`http://localhost:3001/users/${profileUserId}/unfollow`, {

                }, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                setIsFollowing(false);
            } else {
                await axios.post(`http://localhost:3001/users/${profileUserId}/follow`, {

                }, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                });
                setIsFollowing(true);
            };
            onChange && onChange();
        } catch (error) {
            console.log("Hata bulundu", error);
        }
    }
    if (isMe) return null;

    return (
        <button
            onClick={handlefollow}
            className={`px-4 py-1 ml-1 mt-2 rounded text-sm transition cursor-pointer
        ${isfollowing ? "bg-gray-200 text-black" : "bg-blue-500 text-white"}
      `}
        >
            {isfollowing ? "Unfollow" : "Follow"}
        </button>
    );

}