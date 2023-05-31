import React, { lazy } from 'react'
import styleMenu from "./menu.module.css";
import styleColor from "./../var.module.css";
import 'semantic-ui-css/semantic.min.css'

const Buttons = lazy(()=> import('./../Buttons/Buttons'))

export default function DesktopMenu() {


    return (
      
       
            <div className = {styleMenu.menuContainer}>
                 <div className={styleColor.menuDesktopBg } >
               <Buttons/>
            </div>
            
        </div>

    )
}