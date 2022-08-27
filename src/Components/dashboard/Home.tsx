import * as React from 'react';

import ResourceCard from './ResourceCard';
import {Chart} from './Chart';
import HistoryAndNotification from './HistoryAndNotification';

import Box from '@mui/material/Box';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import StorageIcon from '@mui/icons-material/Storage';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import SourceIcon from '@mui/icons-material/Source';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

export interface IheaderCard{
    title: string,
    count: number,
    icon: any,
    countUnit: string,
    detail: string,
    color?: string
}

const headerCards = [
    {
        title: 'تعداد برنامه ها',
        icon: <ManageHistoryIcon fontSize='large' color='primary' sx={{margin: 2}}/>,
        count: 0,
        countUnit: 'عدد',
        detail: '0 برنامه'
    },
    {
        title: 'میزان ظرفیت مصرفی',
        icon: <DataUsageIcon fontSize='large' color='primary' sx={{margin: 2}}/>,
        count: 2,
        countUnit: 'گیگ',
        detail: '0 گیگ'
    },
    {
        title: 'تعداد هسته ها',
        icon: <StorageIcon fontSize='large' color='primary' sx={{margin: 2}}/>,
        count: 5,
        countUnit: 'هسته',
        detail: '0 هسته'
    },
    {
        title: 'میزان رم',
        icon: <SourceIcon fontSize='large' color='primary' sx={{margin: 2}}/>,
        count: 1,
        countUnit: 'گیگ',
        detail: '0 گیگ'
    }
]
const sideCards = [
    {
        title: 'ظرفیت داکر رجیستری سکو',
        icon: <SettingsSystemDaydreamIcon fontSize='large' color='primary' sx={{margin: 2, color: '#fff'}}/>,
        count: 0,
        countUnit: 'گیگ',
        detail: '0 گیگ',
        color: 'primary.main'
    },
    {
        title: 'ظرفیت داکر رجیستری سکو',
        icon: <SettingsSystemDaydreamIcon fontSize='large' color='primary' sx={{margin: 2}}/>,
        count: 0,
        countUnit: 'گیگ',
        detail: '0 گیگ'
    }
]

const historyWidth:number = 230;

const Home = () =>{
    return(
        <Box>
            <Box sx={{backgroundColor: 'defaultBack.light', paddingTop: 3, paddingBottom: 3, width:`calc(100% - ${historyWidth}px)`, height: '100%'}}>
                <Box sx={{display: 'flex'}}>
                    {headerCards.map((item, index) => (
                            <ResourceCard key={index} content={item}/>
                        ))}
                </Box>
                <Box sx={{display: 'flex'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%', padding: 2}}>
                        {sideCards.map((item, index) => (
                                <ResourceCard key={index} content={item}/>
                            ))}
                    </Box>
                    <Box sx={{width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3,
                     backgroundColor:'#fff', borderRadius: '16px', margin:2}}>
                        <Chart/>
                    </Box>
                </Box>
            </Box>
            <Box sx={{width:historyWidth, height:'100%'}}>
                <HistoryAndNotification width={historyWidth}/>
            </Box>
        </Box>
    );
}
export default Home;