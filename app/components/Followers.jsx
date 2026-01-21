"use client";

import { useEffect,useState  } from "react";
import axios from "axios";

export default function FollowerNumber({profileUserId, myUserId, followers, onChange}){

    const [number,setNumber] = useState("");


    const isMe = profileUserId === myUserId;

    useEffect(()=>{

        fetchFollowers();


    },[]);

    const fetchFollowers = async () => {

        try{
            const data = axios.get()




        }catch(error){
            console.log(error);
        }



    }



    if(isMe) return null; // olmayabilir


    return(

        <div>












        </div>

    )


}