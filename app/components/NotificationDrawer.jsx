// "use client";

// import {
//     Drawer,
//     Box,
//     Typography,
//     List,
//     ListItem,
//     ListItemAvatar,
//     Avatar,
//     ListItemText
// } from "@mui/material";


// export default function NotificationDrawer({open, onClose, notifications }) {

//     return (

//         <Drawer anchor="right" open={open} onClose={onClose}>

//             <Box sx={{ width: 320, p: 2 }}>
//                 <Typography variant="h6" gutterBottom>
//                     Bildirimler
//                 </Typography>
//                 <List>
//                     {notifications.map((n) => (
//                         <ListItem key={n._id} divider>

//                             <ListItemAvatar>
//                                 <Avatar src={n.fromUser?.avatar} />
//                             </ListItemAvatar>
//                             <ListItemText
//                                 primary={`${n.fromUser?.username} ${n.type === "like"
//                                         ? "postunu beğendi"
//                                         : n.type === "comment"
//                                             ? "yorum yaptı"
//                                             : "seni takip etti"
//                                     }`}
//                                 secondary={new Date(n.createdAt).toLocaleString()}
//                             />

//                         </ListItem>

//                     ))}





//                 </List>


//             </Box>



//         </Drawer>



//     );



// }