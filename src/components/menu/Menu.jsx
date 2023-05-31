import { lazy } from "react";
import './var.module.css';

const DesktopMenu = lazy(() => import("./DesktopNavbar/DesktopMenu"));
const MobileNav = lazy(() => import("./MobileNavbar/MobileNavbar"));

export default function Navbar() {

    return (
                    <>
                        <DesktopMenu />
                        <MobileNav />
                    </>
    );
}