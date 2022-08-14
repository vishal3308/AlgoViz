import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Box } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from '@mui/icons-material/Mail';
import Tooltip from '@mui/material/Tooltip';
export default function Navbar() {
    const Auth = localStorage.getItem('AlgoViz_token');
    const Profile_image = localStorage.getItem('AlgoViz_avatar');
    const Name = localStorage.getItem('AlgoViz_name');
    const Email = localStorage.getItem('AlgoViz_email');

    // =====================Desktop Profile toggle====
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //   ================================Logout Function===========
    let navigate = useNavigate()
    function logout() {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <Box className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <Link to='/' className="navbar-brand">Algorithm Visualizer</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to='/pathfinder' className="nav-link">Path Finder</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/sort' className="nav-link">Sorting Algorithms</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/recursivesort' className="nav-link">Recursive Sorting</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/nqueen' className="nav-link">N Queen</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/convexhull' className="nav-link">Convex Hull</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/binarysearch' className="nav-link">Binary Search</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/about' className="nav-link">About US</NavLink>
                    </li>
                </ul>
                {Auth ?
                    ""
                    :
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to='/login' className="nav-link">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/signup' className="nav-link">Sign Up</NavLink>
                        </li>
                    </ul>
                }

            </div>
            {Auth && 
            <>
            <Tooltip title="Account settings">
                <IconButton
                    className='profile'
                    onClick={handleClick}
                    size="medium"
                    sx={{ mr: 1 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }} alt="Hi" src={Profile_image} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar alt="User" src={Profile_image} />{Name}
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <MailIcon fontSize="medium" />
                    </ListItemIcon>
                    {Email}
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
            }
        </Box>
    );
}
