import React, { useContext } from 'react'
import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import StoreIcon from '@mui/icons-material/Store';
import {Link} from "react-router-dom";
import { DarkModeContext } from '../../context/darkModeContext';

const Sidebar = () => {
    const {dispatch} = useContext(DarkModeContext);
    return (
        <div className='sidebar'>
            <div className='top'>
                <Link to="/" style={{ textDecoration :"none" }}>
                <span className='logo' >
                    logor
                </span></Link>
            </div>
            <hr />
            <div className='center'>
                <ul>
                    <p className='title'>MAIN</p>
                    <li>
                        <DashboardIcon className='icons' />
                        <span >Dashboard</span>
                    </li>
                    <p className='title'>LISTS</p>
                    <Link to="/users" style={{ textDecoration :"none" }}>
                    <li>
                        <PersonOutlineOutlinedIcon className='icons' />
                        <span >Users</span>
                    </li>
                    </Link>
                    <Link to="/products" style={{ textDecoration :"none" }}>
                    <li>
                        < StoreIcon className='icons' />
                        <span >Products</span>
                    </li>
                    </Link>
                    <li>
                        <CreditCardOutlinedIcon className='icons' />
                        <span >Orders</span>
                    </li>
                    <li>
                        <LocalShippingIcon className='icons' />
                        <span >Delivery</span>
                    </li>
                    <p className='title'>USEFUL</p>
                    <li>
                        <AssessmentIcon className='icons' />
                        <span >Stats</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className='icons' />
                        <span >Notification</span>
                    </li>
                    <p className='title'>SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className='icons' />
                        <span >System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className='icons' />
                        <span >Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className='icons' />
                        <span >Settings</span>
                    </li>
                    <p className='title'>USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className='icons' />
                        <span >Profile</span>
                    </li>
                    <li>
                        <ExitToAppOutlinedIcon className='icons' />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className='bottom'>
                <div className='coloroption' onClick={()=>dispatch({type:"LIGHT"})}>
                </div>
                <div className='coloroption'onClick={()=>dispatch({type:"DARK"})}>
                </div>
               
            </div>

        </div>
    )
}

export default Sidebar
