import classes from './Header.module.css'
import React from 'react'

import {  Settings } from "@material-ui/icons";

function Header() {
    return (
        <div className={classes.header}>
            <div className={classes.header__wrapper}>
                <div className={classes.header__left}>
                    <span className={classes.logo}>Patient Data Analytics</span>
                </div>
                <div className={classes.header__wright}>
                    <div className={classes.topbarIconContainer}>
                        <Settings />
                    </div>
                    <img 
                    src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className={classes.avatar}/>
                </div>  
            </div>
        </div>
    )
}

export default Header
