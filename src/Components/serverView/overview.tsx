import React from "react";
import ResourcesageCard from "./ResourceUsageCard";
import Iserver from '../../interfaces/Server'
import { MainChart } from "./MainChart";
import TagCard from "./TagCard";
import {serverStatusToPersion} from '../servers/ServerTable';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StorageIcon from '@mui/icons-material/Storage';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import SourceIcon from '@mui/icons-material/Source';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { CardContent } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const usageCards = [
    {
        title: 'رم',
        icon: <SourceIcon color="secondary" fontSize="small" sx={{margin: 2}}/>,
        usage: 75,
                
    },
    {
        title: 'دیسک',
        icon: <StorageIcon color="secondary" fontSize="small" sx={{margin: 2}}/>,
        usage: 32,
                
    },
    {
        title: 'برنامه',
        icon: <SettingsSystemDaydreamIcon color="secondary" fontSize="small" sx={{margin: 2}}/>,
        usage: 95,
                
    },
    {
        title: 'هسته',
        icon: <ManageHistoryIcon color="secondary" fontSize="small" sx={{margin: 2}}/>,
        usage: 63,
                
    },

];
type props = {
    server: Iserver,
}

const Overview = ({server}:props) => {
    return(
        <Box sx={{margin:0, height: '100%', width: '100%', padding: 2}}>
            <Grid container spacing={1}>
                <Grid container md={5}>
                    {usageCards.map((item, index) =>(
                        <ResourcesageCard key={index} content={item}/> 
                        ))}
                </Grid>
                <Grid item md={6}>
                    <Grid item md={12}>
                        <Card sx={{padding:2}}>
                            <CardContent><MainChart/></CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={12}>
                        <Card >
                            <CardHeader title='اطلاعات سرور' sx={{color:'primary.main'}}/>
                            <CardContent sx={{margin:2}}>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell align="center">شناسه</TableCell>
                                    <TableCell align="center">وضعیت</TableCell>
                                    <TableCell align="center">ديتاسنتر</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                <TableRow sx={{borderBottom: 'none'}}>
                                    <TableCell align="center" sx={{borderBottom: 'none', fontWeight: '400!important'}}>{server.id}</TableCell>
                                    <TableCell align="center" sx={{borderBottom: 'none'}}>{serverStatusToPersion(server.status)}</TableCell>
                                    <TableCell align="center" sx={{borderBottom: 'none'}}>{server.dataCenter}</TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={12}>
                        <TagCard server = {server}/>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
export default Overview;