import React from "react";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import RestoreIcon from '@mui/icons-material/Restore';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const historyItems = [
    {
        icon: <ManageHistoryIcon fontSize="small" color="primary"/>,
        title: 'برنامه',
        content: 'الهه متقین برنامه test elahe را اجرا کرد.',
        id: 'elahemotaghin@gmail.com',
        date: '1401.05.02'
    },
    {
        icon: <ManageHistoryIcon fontSize="small" color="primary"/>,
        title: 'برنامه',
        content: 'الهه متقین برنامه test elahe را اجرا کرد.',
        id: 'elahemotaghin@gmail.com',
        date: '1401.05.23'
    },
    {
        icon: <ManageHistoryIcon fontSize="small" color="primary"/>,
        title: 'برنامه',
        content: 'الهه متقین برنامه test elahe را اجرا کرد.',
        id: 'elahemotaghin@gmail.com',
        date: '1401.05.07'
    },
    {
        icon: <ManageHistoryIcon fontSize="small" color="primary"/>,
        title: 'برنامه',
        content: 'الهه متقین برنامه test elahe را اجرا کرد.',
        id: 'elahemotaghin@gmail.com',
        date: '1401.05.12'
    },

];
const notificationItems = [
    {
        icon: <NotificationsNoneIcon fontSize="small" color="primary"/>,
        content: 'ما در سرور هاي ابري وابستگي خود به سخت افزار را به كمترين حالت ممكن مي رسانيم.',
        id: 'elahemotaghin@gmail.com',
        date: '1401.05.02'
    },

];

type props = {
    width: number,
}

//props
const HistoryAndNotification = ({width}:props) =>{
    return (
        <>
        <Drawer
        sx={{
          width: width,
          '& .MuiDrawer-paper': {
            width: width,
            boxSizing: 'border-box',
            marginTop: '70px'
          },
          marginTop: '70px',
        }}
        variant="permanent"
        anchor="left"
      >
        <Accordion elevation={0}>
            <AccordionSummary
            aria-controls="history-content"
            id="history-header"
            >
                <RestoreIcon fontSize="small" color="primary"/>
                <Typography sx={{marginRight:2}}>تاریخچه</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                {historyItems.map((item, index) => (
                    <ListItem key={index}
                    sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'right', padding: 2, marginTop:2, borderRadius: '8px', backgroundColor:'defaultBack.light'}}>
                        <Box sx={{display: 'flex', width: '100%'}}>
                            {item.icon}
                            <ListItemText primary={item.title} sx={{display: 'flex', marginRight: 2}}/>
                        </Box>
                        <Typography variant="body2">{item.content}</Typography>
                        <Typography color='gray.dark'>{item.id}</Typography>
                        <Typography color='gray.dark' sx={{width: '100%'}}>{item.date}</Typography>
                    </ListItem>
                ))}
                </List>
            </AccordionDetails>
        </Accordion>
        <Accordion elevation={0}>
            <AccordionSummary
            aria-controls="notification-content"
            id="notification-header"
            >
            <NotificationsNoneIcon fontSize="small" color="primary"/>
            <Typography sx={{marginRight:2}}>اعلان ها</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <List>
                {notificationItems.map((item, index) => (
                    <ListItem key={index}
                    sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'right', padding: 2, marginTop:2, borderRadius: '8px', backgroundColor:'defaultBack.light'}}>
                        {item.icon}
                        <Typography variant="body2">{item.content}</Typography>
                        <Typography color='gray.dark'>{item.id}</Typography>
                        <Typography color='gray.dark' sx={{width: '100%'}}>{item.date}</Typography>
                    </ListItem>
                ))}
                </List>
            </AccordionDetails>
        </Accordion>
        <Toolbar />
        <Toolbar />
      </Drawer>
      </>
    );
}
export default HistoryAndNotification;