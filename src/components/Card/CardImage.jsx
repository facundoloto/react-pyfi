import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { timeAgo } from './date';
import "./post.css";

function CardImage({ data }) {

  const time = timeAgo(data.createdAt);

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerAuthor">
          <Avatar style={{ marginRight: "10px" }} src={data.users.image_user}>
            {
              data.users.name.toUpperCase()
            }
          </Avatar>{" "}
          <Link to={"/profile/" + data.users.id} relative="path">{data.users.name}</Link>•<span>{time}</span>
        </div>

      </div>
      <div className="post__image">
        <img src={data.image_post} alt="Post Image" />
      </div>
      <div className="post__footer">
        <div className="post__description">
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CardImage;