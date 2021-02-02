import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from '../config/axios';
import LocalStorageService from "../_services/localStorage";
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickLogout = () => {
        axios.get("/auth/logout", { withCredentials: true })
            .then(res => {
                setAnchorEl(null);
                LocalStorageService.removeAuthStatus();
                props.setIsLogin(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div style={{ textAlign: "end", backgroundColor: "greenyellow", marginBottom: "20px", border: "1px solid black" }}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Link style={{ textDecoration: "none", color: "black" }} to="/profile">Profile</Link></MenuItem>
                <MenuItem onClick={onClickLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
