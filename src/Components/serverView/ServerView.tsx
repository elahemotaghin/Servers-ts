import React, { useEffect } from "react";
import IServer from "interfaces/Server";
import Overview from "./overview";
import {useLocation, useParams} from "react-router-dom";
import './assets/style/style.css'
import {serverStatusToPersion, serverStatusColor} from '../servers/ServerTable'
import ResourceView from './ResourceView';
import AccessibilityView from './AccessibilityView'
import { useGetServerById } from "services/Servers/get";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Typography} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import userGetServerById from "../../services/Servers/useGetServerById"

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ServerView = () => {
    let { serverId } = useParams();
    const [value, setValue] = React.useState('1');
    let query = useQuery();
    const [server, setServer] = React.useState<IServer>();
    // const {data, isLoading} = userGetServerById(serverId!)

    let url = 'http://localhost:3001/servers/'+serverId
    const {data, isLoading} = useGetServerById(url);

    useEffect(()=>{
        setServer(data);
    }, [data])

    const handleChange = (event: any, newValue:string) => {
        setValue(newValue);
    };

    let status = query.get('status');
    if(isLoading){
        return(
            <LinearProgress/>
        )
    }
    if(server){
    return(
        <Box sx={{ width: '100%', typography: 'body1', height: '100%'}}>
            <Box sx={{backgroundColor: 'defaultBack.light', padding: 3, display: 'flex', alignItems: 'center'}}>
                <Typography variant='h1' color={'primary'}>{server.name}</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', marginRight:2, backgroundColor:'#fff', padding:'4px', borderRadius: '16px'}}>
                    <Box className="statusIcon" color={serverStatusColor(status)} component={'span'}></Box>
                    <Typography color={serverStatusColor(status)} variant='body2'>{serverStatusToPersion(status)}</Typography>
                </Box>
            </Box>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="نمای کلی" value="1"/>
                        <Tab label="منابع" value="2" />
                        <Tab label="دسترسی ها" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{height: '100%', backgroundColor: 'defaultBack.light'}}>
                    <Overview server={server}/>
                </TabPanel>
                <TabPanel value="2" sx={{height: '100%', backgroundColor: 'defaultBack.light'}}>
                    <ResourceView/>
                </TabPanel>
                <TabPanel value="3" sx={{height: '100%', backgroundColor: 'defaultBack.light'}}>
                    <AccessibilityView/>
                </TabPanel>
            </TabContext>
        </Box>
    );
    }
    else{
        return(
            <>
            </>
        )
    }
}

 export default ServerView;