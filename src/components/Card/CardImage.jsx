import React, { useState } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import './card.css';
import 'semantic-ui-css/semantic.min.css'

export default function CardImage({ data }) {

const routesApi = import.meta.env.VITE_URL_API;
const timeAgo = moment(data.createdAt).startOf('day').fromNow().toUpperCase();

  return (
    <div class="Instagram-card">
      <div class="Instagram-card-header">
      <img src={data.users.image_user} class="Instagram-card-user-image"/>
       
        <a class="Instagram-card-user-name" href={routesApi+"/user/"+data.users.id}><label>{data.users.name}</label> </a>
        <div class="Instagram-card-time">{timeAgo}</div>
      </div>

      <div class="Instagram-card-image">
        <img src={data.image_post} />
      </div>

      <div class="Instagram-card-content">
        {/* <Icon name="heart" style={{ color: "#ff0000" }} >{data.likes}</Icon> */}
        <p>{data.description}</p>
      </div>

    </div>
  )
};

