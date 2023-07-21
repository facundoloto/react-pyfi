/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getAllPostByUser, getUserById } from "../../api/fetchApi";
import { useQuery } from "@tanstack/react-query";
import { BounceLoader } from "react-spinners";
import styleHeader from './profile.module.css';
import "./profile.module.css";

export default function Header({ id }) {
  const { isLoading, data: user, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  else if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <header>

      <div className={styleHeader.profileUserSetting}>
        <div className={styleHeader.profileImage}>
          <img src={user.image_user} alt={user.name} />
        </div>

        <div className={styleHeader.infoUser}>

          <h1 className={styleHeader.profileUserName}>{user.name}</h1>
          {/* <button className={styleHeader.profileBtn}>Edit Profile</button> */}

          {/* <div className={styleHeader.profileStats}>
              <ul>
                <li><span className="profile-stat-count">{posts.lenght}</span> posts</li>
                <li><span className="profile-stat-count">188</span> followers</li>
                <li><span className="profile-stat-count">206</span> following</li>
              </ul>
            </div> */}

        </div>
      </div>

    </header>
  );
}