import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Video from "./Video";
import "./Posts.css";
import Avatar from "@mui/material/Avatar";
import Like from "./Like";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Dialog from "@mui/material/Dialog";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Like2 from "./Like2";
import AddComment from "./AddComment";
import Comments from "./Comments";
import Volume from "./Volume";

function Posts({ userData }) {
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };
  useEffect(() => {
    async function fetchData() {
      let parr = [];
      const unsub = database.posts
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          parr = [];
          querySnapshot.forEach((doc) => {
            let data = { ...doc.data(), postId: doc.id };
            parr.push(data);
          });
          setPosts(parr);
        });
    }
    fetchData();
  }, []);
  const callback = (entries) => {
    entries.forEach((entry) => {
      let ele = entry.target.childNodes[0];
      // console.log(ele)
      ele.play().then(() => {
        if (!ele.paused && !entry.isIntersecting) {
          ele.pause();
        }
      });
    });
  };
  let observer = new IntersectionObserver(callback, { threshold: 0.6 });
  useEffect(() => {
    const elements = document.querySelectorAll(".videos");
    elements.forEach((element) => {
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
    };
  }, [posts]);
  return (
    <div>
      {posts == null || userData == null ? (
        <CircularProgress />
      ) : (
        <div className="video-container ">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              {/* {console.log(post)} */}
              <div className="videos h-full">
                <Video src={post.pUrl} id={post.pId} Id={index} />
                <div className=" absolute bottom-5 box w-full h-1/6 pl-1 ">
                  <div
                    className="  w-full h-1/2 flex items-center"
                    style={{ display: "flex" }}
                  >
                    <Avatar src={post.uProfile} />
                    <h6 className="font-bold text-white ml-2">{post.uName}</h6>
                  </div>
                  <div className="w-full h-1/2 flex space-x-4 ml-2">
                    <Like userData={userData} postData={post} />
                    <ChatBubbleIcon
                      className="chat-styling"
                      onClick={() => handleClickOpen(post.pId)}
                    />
                    <Volume Id={index}></Volume>
                  </div>
                </div>
                <Dialog
                  open={open == post.pId}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth={true}
                  maxWidth="md"
                //   style={{height:"50%   "}}
                >
                  <div className="modal-container   ">
                    <div className="video-modal h-1/2 w-full">
                      <video autoPlay={true} muted="muted" controls>
                        <source src={post.pUrl} />
                      </video>
                    </div>
                    <div className="comment-modal h-1/2 w-full">
                      <Card className="card1" style={{ padding: "1rem",overflowY:"scroll" }}>
                        <Comments postData={post} />
                      </Card>
                      <Card variant="outlined" className="card2">
                        <Typography style={{ padding: "0.4rem" }}>
                          {post.likes.length == 0
                            ? "Liked by nobody"
                            : `Liked by ${post.likes.length} users`}
                        </Typography>
                        <div style={{ display: "flex" }}>
                          <Like2
                            postData={post}
                            userData={userData}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                          <AddComment
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            userData={userData}
                            postData={post}
                          />
                        </div>
                      </Card>
                    </div>
                  </div>
                </Dialog>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
