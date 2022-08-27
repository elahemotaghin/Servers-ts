import React from "react";
import {Link, useLocation} from 'react-router-dom';

import AdbIcon from '@mui/icons-material/Adb';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home'
import PolicyIcon from '@mui/icons-material/Policy';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

type props = {
    drawerWidth: number,
}

const SideBar = ({drawerWidth}:props) =>{
    let location = useLocation();

    const menu = [
        {name: 'داشبورد',
         icon: <HomeIcon fontSize="small" className={location.pathname == '/' ? 'active-link-icon' : 'link-icon'}/>,
         href: '/'
        },
        {name: 'سرورهای اختصاصی',
         icon: <DisplaySettingsIcon fontSize="small" className={location.pathname == '/servers' ? 'active-link-icon' : 'link-icon'}/>,
        color: 'primary.main',
        border: '3px solid',
        href: '/servers'},
        {name: 'ماشین های ابری', 
        icon: <WbCloudyIcon fontSize="small" className="link-icon"/>,
        href: '#'},
        {name: 'برنامه ها', 
        icon: <PolicyIcon fontSize="small" className={location.pathname == '/applications' ? 'active-link-icon' : 'link-icon'}/>,
        href: '/applications'}
    ]

    return(
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="permanent"
            anchor="right"
        >
            <Box sx={{ display: { display: 'flex', justifyContent: 'center', alignItems: 'center'}, pt: 2 }} >
                <AdbIcon fontSize= 'large' color='primary'/>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    ml: 2,
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    پلتفرم ابری سکو
                </Typography>
            </Box>
            <Toolbar variant="dense"/>
            <List >
            {menu.map((item) => (
                <ListItem key={item.name}
                className={location.pathname==item.href? 'active-list-item': ''}
                >
                    <ListItemButton component={Link} to={item.href} selected={item.href === window.location.pathname}
                     sx={{backgroundColor:'#fff !important'}}>
                        {item.icon}
                        <ListItemText primary={item.name} sx={{display: 'flex', marginRight: 2}}
                         className={location.pathname==item.href? 'active-link-text': ''}/>
                    </ListItemButton>
                </ListItem>
            ))}
            </List>
      </Drawer>
    );
}
export default SideBar;