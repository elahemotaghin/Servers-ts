import React, { useEffect } from "react";
import './assets/style/style.css'
import IServer from "interfaces/Server";
import ServerTable from "./ServerTable";
import AddDialog from "./AddDialog";
import { serverStatusToPersion } from "./ServerTable";
import { useGetServers } from "../../services/Servers/get";
import useCreateSerevr from "../../services/Servers/useCreateSerever";
import useDeleteServer from "../../services/Servers/useDeleteServer";
import useGetAllservers from "../../services/Servers/useGetAllServers";

import { Button, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import CircularProgress from "@mui/material/CircularProgress";

const ServersRoot = () => {
    const [filter, setFilter] = React.useState('none');
    const [selectedItem, setSelectedItem] = React.useState('');
    let selectItems = [];
    const [anchorFilter, setAnchorFilter] = React.useState(null);
    const [filterChips, setFilterChips] = React.useState<string[]>([]);
    const [openAddDialog, setAddDialog] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [resultServers, setResultServers] = React.useState<IServer[]>([]);
    const deleteServerHook = useDeleteServer();
    const createServerHook = useCreateSerevr();
    // const { data: servers = [], isLoading, refetch } = useGetAllservers();
    let servers: IServer[] = []; 

    const getAllServersHook = useGetServers("http://localhost:3001/servers")
    if(getAllServersHook.data){
        servers = getAllServersHook.data;
    }

    useEffect(() => {
        setResultServers(servers);
    }, [servers])

    const filterToPersion = () => {
        if (filter === 'none')
            return 'فيلتر'
        else if (filter === 'status')
            return 'وضعيت'
        else
            return 'ديتاسنتر'
    }

    const findStatus = () => {
        const status: string[] = [];
        for (const server of servers) {
            let value = serverStatusToPersion(server.status)
            if (!status.includes(value))
                status.push(value)
        }
        return status
    }
    const statusItems = findStatus();

    const findDataCenters = () => {
        const dataCenter: string[] = [];
        for (const server of servers) {
            if (!dataCenter.includes(server.dataCenter))
                dataCenter.push(server.dataCenter)
        }
        return dataCenter
    }
    const dataCenterItems = findDataCenters();

    const handleOpenFilterMenu = (event: any) => {
        setAnchorFilter(event.currentTarget);
    };

    const handleCloseFilterMenu = (value: string) => {
        setSelectedItem('');
        // setResultServers(servers);
        setFilter(value);
        setAnchorFilter(null);
        if (value == 'none') {
            setFilterChips([]);
            setResultServers(servers);
            search(searchValue, servers, []);
        }
    };

    const onSearchInputChange = (event: any) => {
        if (searchValue.length > event.target.value.length) {
            setSearchValue(event.target.value);
            setResultServers(servers);
            search(event.target.value, servers, filterChips);
        }
        else {
            setSearchValue(event.target.value);
            search(event.target.value, resultServers, filterChips);
        }
    }

    const search = (value: any, searchServer: IServer[], chips: string[]) => {
        if (value.length >= 3) {
            let newServers = searchServer.filter((server) => {
                return server.name.includes(value);
            });
            setResultServers(newServers);
        }
        else {
            setResultServers(searchServer);
        }
        for (const filterChip of chips) {
            if (statusItems.includes(filterChip)) {
                searchServer = searchServer.filter((server) => {
                    return serverStatusToPersion(server.status) == filterChip;
                });
                setResultServers(searchServer);
            }
            else if (dataCenterItems.includes(filterChip)) {
                searchServer = searchServer.filter((server) => {
                    return server.dataCenter.includes(filterChip);
                });
                setResultServers(searchServer);
            }
            else {
                searchServer = searchServer.filter((server) => {
                    return server.tags.includes(filterChip);
                });
                setResultServers(searchServer);
            }
        }
    }

    const addFilter = (event: any) => {
        let newFilterChips = filterChips;
        newFilterChips.push(event.target.value);
        setFilterChips(newFilterChips);
        setSelectedItem(event.target.value);
        search(searchValue, resultServers, filterChips);
    }

    const handleTagChip = (tagName: string) => {
        let newFilterChips = filterChips;
        newFilterChips.push(tagName);
        setFilterChips(newFilterChips);
        search(searchValue, resultServers, filterChips)
    }

    const handleDeleteChip = (chip: string) => {
        let newChips = filterChips.filter((filterChip) => {
            return filterChip != chip;
        });
        setSelectedItem('');
        setFilterChips(newChips);
        setResultServers(servers);
        search(searchValue, servers, newChips);
    }

    const handleAddServer = (server: IServer) => {
        createServerHook.mutate({
            name: server.name,
            detail: server?.detail,
            status: server.status,
            tags: [],
            dataCenter: server.dataCenter,
            enable: server.enable
        });
        console.log(server)
        setAddDialog(false);
    }

    const onDelete = (id: any) => {
        deleteServerHook.mutate({
            id: id,
        });
    }
    return (
        <Box padding={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h1'>ليست سرور ها</Typography>
                    <TextField
                        onChange={onSearchInputChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        value={searchValue}
                        variant="filled"
                        placeholder="جستجو..."
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
                    <Select
                        value={selectedItem}
                        onChange={addFilter}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ marginLeft: 2, display: (filter !== 'none') ? 'Block' : 'none' }}
                        size="small"
                    >
                        <MenuItem value=''>{filter === 'status' ? 'انتخاب وضعيت' : 'انتخاب ديتاسنتر'}</MenuItem>
                        {filter === 'dataCenter' ? selectItems = dataCenterItems : selectItems = statusItems}
                        {selectItems.map((item, index) => {
                            return <MenuItem key={index} value={item}>{item}</MenuItem>;
                        })}
                    </Select>
                    <Button size="small" variant='outlined' id='filterBtn' sx={{ marginLeft: 2 }}
                        aria-controls="filter-menu"
                        aria-haspopup="true"
                        onClick={handleOpenFilterMenu}>
                        <FilterAltOutlinedIcon color="primary" />
                        {filterToPersion()}
                    </Button>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorFilter}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorFilter)}
                        onClose={handleCloseFilterMenu}
                    >
                        <MenuItem key={1} onClick={() => { handleCloseFilterMenu('none') }}>
                            بدون فيلتر
                        </MenuItem>
                        <MenuItem key={2} onClick={() => { handleCloseFilterMenu('status') }}>
                            وضعیت
                        </MenuItem>
                        <MenuItem key={3} onClick={() => { handleCloseFilterMenu('dataCenter') }}>
                            ديتاسنتر
                        </MenuItem>
                    </Menu>
                    <Button variant="contained" size="small" id="addBtn" onClick={() => setAddDialog(true)}>
                        <AddIcon />
                        افزودن
                    </Button>
                </Box>
            </Box>
            <Box marginTop={3}>
                {filterChips.map((chip, index) => {
                    return (<Chip
                        key={index}
                        label={chip}
                        size="small"
                        color="primary"
                        variant="outlined"
                        onDelete={() => handleDeleteChip(chip)}
                    />);
                })}
            </Box>
            <Box marginTop={3}>
                {getAllServersHook.isLoading?
                <Box sx={{display:'flex', justifyContent:'center', alignItems: 'center', height: '50vh'}}><CircularProgress/></Box>:
                <ServerTable propsServers={resultServers} onDelete={onDelete} addTagChip={($event: string) => { handleTagChip($event) }} />}
            </Box>
            {openAddDialog ?
                <AddDialog handleAddServer={($event: IServer) => { handleAddServer($event) }} handleClose={() => { setAddDialog(false); }} statusList={findStatus()} dataCenterList={findDataCenters()} />
                : null}
        </Box>
    );
}
export default ServersRoot;