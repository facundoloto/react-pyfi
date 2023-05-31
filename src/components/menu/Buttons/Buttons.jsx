import React, { lazy, useState } from 'react'
import Image from 'react-bootstrap/Image'
import logo from "./../../../assets/logo.png";
import {Icon} from 'semantic-ui-react'
import styleColor from "./../var.module.css";
import styleButton from "./button.module.css";
import 'semantic-ui-css/semantic.min.css'
const Post = lazy(() => import("./../../post/post"));

export default function Buttons() {
    const [show, setShow] = useState(false);

    const [changeTheme, setChangeTheme] = useState({ icon: "moon outline", text: "Light", change: true });

    const onClickTheme = () => {
        console.log(changeTheme)
        changeTheme.change ? setChangeTheme({ icon: "moon", text: "Dark", change: false }) : setChangeTheme({ icon: "moon outline", text: "Light", change: true })
    }

    return (
        <>
            <aside class="menu" className={styleButton.listButtons} >
                <Image src={logo} alt="..." />
                <ul className="menu-list">
                    <li><button className={styleColor.buttonMenuBg}><Icon name='angle up'/><p>Recent</p></button></li>
                    <li><button className={styleColor.buttonMenuBg}><Icon name='angle down' /><p>Oldest</p></button></li>
                    <li><button className={styleColor.buttonMenuBg}><Icon name='heartbeat' /><p>Top</p></button></li>
                    <li><button className={styleColor.buttonMenuBg} onClick={() => setShow(!show)}><Icon name='plus'/><p>Create</p></button></li>
                    <li><button className={styleColor.buttonMenuBg} onClick={onClickTheme}><Icon name={changeTheme.icon} /><p>{changeTheme.text}</p></button></li>
                    <li><button className={styleColor.buttonMenuBg} ><Icon name='user circle' /><p>Profile</p></button></li>
                    <li><button className={styleColor.buttonMenuBg}><Icon name='power off' /><p>LogOut</p></button></li>
                </ul>
            </aside>
            <Post state={show} changeState={setShow}/>
        </>

    );

}



