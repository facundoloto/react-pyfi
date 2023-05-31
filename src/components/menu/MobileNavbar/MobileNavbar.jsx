import React, { lazy, useState } from 'react'
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Icon } from 'semantic-ui-react'
import styleMenu from "./Mobile.module.css";
import styleMenuDesktop from "./../var.module.css";
import "bootstrap/dist/css/bootstrap.css";
import 'semantic-ui-css/semantic.min.css'

const Post = lazy(() => import("./../../post/post"));

export default function MobileNavbar() {
    const [show, setShow] = useState(false);

    const [changeTheme, setChangeTheme] = useState({ icon: "moon outline", text: "Light", change: true });

    const onClickTheme = () => {
        changeTheme.change ? setChangeTheme({ icon: "moon", text: "Dark", change: false }) : setChangeTheme({ icon: "moon outline", text: "Light", change: true })
    }

    return (
        <div className={styleMenu.navOpen}>
            <Navbar collapseOnSelect expand="lg" fixed="bottom" variant="dark">
                <div className={styleMenu.inline}>
                    <div className={styleMenuDesktop.menuDesktopBg}>
                        <div className={styleMenuDesktop.buttonMobileBg}>
                            <button><Icon name='angle up' /></button>
                            <button><Icon name='angle down' /></button>
                            <button><Icon name='heartbeat' /></button>
                            <button className={styleMenuDesktop.buttonMenuBg} onClick={() => setShow(!show)}><Icon name='plus' /></button>
                            <button onClick={onClickTheme}><Icon name={changeTheme.icon} /></button>
                            <button><Icon name='user circle' /></button>
                            <button><Icon name='power off' /></button>
                        </div>
                    </div>
                </div>
            </Navbar>
            <Post state={show} changeState={setShow}/>
        </div>
    )
}


