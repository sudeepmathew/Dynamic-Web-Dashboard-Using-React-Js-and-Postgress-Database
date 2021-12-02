import classes from './Sidebar.module.css'
import React from 'react'
import { Link } from "react-router-dom";

import {LineStyle} from "@material-ui/icons";


function Sidebar() {
    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebar__wrapper}>
                <div className={classes.sider__menu}>
                    {/* <h3 className={classes.sidebar__title}>
                        Dashboard
                    </h3> */}
                    <ul className={classes.sidebar__list}>
                        <Link to="/" className={classes.link}>
                            <li className={classes.sidebar__list_item}>
                                <LineStyle className={classes.sidebar__icon} />
                                Home
                            </li>
                        </Link>
                        <Link to="/vitals" className={classes.link}>
                            <li className={classes.sidebar__list_item}>
                                <LineStyle className={classes.sidebar__icon} />
                                Vitals
                            </li>
                        </Link>
                        <Link to="/labs" className={classes.link}>
                            <li className={classes.sidebar__list_item}>
                                <LineStyle className={classes.sidebar__icon} />
                                Labs
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
