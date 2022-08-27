import React from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const users = [
    {
        username: 'الهه متقین',
        accessibility: ['view only']
    },
    {
        username: 'محمد سعید کاظمی',
        accessibility: ['edit']
    },
    {
        username: 'الهه متقین',
    },
    {
        username: 'محمد سعید کاظمی',
        accessibility: ['view only', 'none']
    },
]

const AccessibilityView = () =>{
    return(
        <Box sx={{margin:0, height: '100%', width: '100%', padding: 3}}>
            <Grid container spacing={1} md={12} sx={{height:'100%'}}>
                <Grid item md={4}>
                <Card>
                    <CardContent>
                    <List sx={{padding:2}}>
                        {users.map((user, index) => {
                            return (
                            <>
                            <ListItem
                                key={index}
                                sx={{padding: 2, flexDirection: 'column', alignItems:"flex-start"}}
                            >
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <ListItemAvatar>
                                        <Avatar
                                        alt={`پروفایل ${user.username}`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText sx={{textAlign:'right'}}>{user.username}</ListItemText>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'100%', marginTop: 1}}>
                                    <Box display='flex'>
                                        {user?.accessibility?.map((tag, index)=>{
                                            return (
                                            <Chip
                                            key={index}
                                            label={tag}
                                            size="small"
                                            color="secondary"
                                            sx={{marginTop:1}}
                                            variant='outlined'
                                            />);
                                        })}
                                    </Box>
                                    <Box>
                                        <IconButton sx={{padding:0}}>
                                            <NotificationsNoneIcon fontSize="small" color="secondary"/>
                                            {/*{//color="gray"}*/}
                                        </IconButton>
                                        <IconButton sx={{padding:0}}>
                                            <DeleteIcon fontSize="small" color="secondary"/>
                                            {/*{//color="gray"}*/}
                                        </IconButton>
                                    </Box>
                                </Box>
                            </ListItem>
                            {index + 1 != users.length? <Divider light/> : ''}
                            </>
                            );
                        })}
                    </List>
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
        </Box>
        );   
}

export default AccessibilityView;