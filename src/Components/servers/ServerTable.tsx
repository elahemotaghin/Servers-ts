import React, { useEffect, useState } from "react";
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
import SnackbarMassage from '../sharedComponents/SnakebarMassage';
import {useNavigate} from "react-router-dom";
import IServer from "interfaces/Server";

import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination} from '@mui/material';
import {IconButton, Snackbar, Tooltip, Chip, Menu, MenuItem} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import SortRoundedIcon from '@mui/icons-material/SortRounded';

//server status
export const serverStatusToPersion = (status:any) =>{
    if(status === 'active')
        return 'فعال';
    else if(status === 'starting')
        return 'راه اندازی';
    else if(status === 'stop')
        return 'خاموش';
    else if(status ==='running')
        return 'روشن';
    else if(status === 'disable')
        return 'غیر فعال';
    return 'نامشخص'
}
export const serverStatusColor = (status:any) =>{
    if(status === 'active')
        return 'success.main';
    else if(status === 'starting')
        return 'primary.light';
    else if(status === 'stop')
        return 'warning.main';
    else if(status === 'running')
        return 'primary.main';
    else if(status === 'disable')
        return 'error.main';
    return 'gray.main'
}


type props = {
    propsServers: IServer[],
    onDelete: any,
    addTagChip: any,
}
const ServerTable = ({propsServers, onDelete, addTagChip}:props) => {
    let navigate = useNavigate();
    let servers: IServer[] = propsServers;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [selectedServer, setSelectedServer] = React.useState(propsServers[0]);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [anchorIdSort, setAnchorIdSort] = React.useState<null | HTMLElement>(null);
    const [anchorNameSort, setAnchorNameSort] = React.useState<null | HTMLElement>(null);
    const [sortChips, setSortChips] = React.useState<string[]>([]);
    const [sortArray, setSortArray] = React.useState([]);
    const [hideIdColumn, setHideIdColumn] = React.useState(false);
    const [hideNameColumn, setHideNameColumn] = React.useState(false);
    const [serversState, setServersState] = useState<IServer[]>([])
    useEffect(() => {
        setServersState(servers as IServer[])
    }, [servers])
    
    //routing functions
    const routeToServer = (id:number, status:string) => {
        navigate(`../servers/${id}?status=${status}`, { replace: true });
    };

    const editClicked = (serverId:number) => {
        setOpenEditDialog(true);
        const server:IServer = servers.filter( (server) => {
            return server.id === serverId;
        })[0]
        setSelectedServer(server);
    }

    const deleteClicked = (serverId:number) => {
        setOpenDeleteDialog(true);
        const server:IServer = servers.filter( (server) => {
            return server.id === serverId;
        })[0]
        setSelectedServer(server);
    }

    //sort functions
    const handleCloseSortrMenu = (value:string, field:string, type:string) => {
        if(field === 'id')
            setAnchorIdSort(null);
        else
            setAnchorNameSort(null);
        if(value === 'sort'){
            let newSortArray:any = sortArray;
            newSortArray.push([field, type]);
            setSortArray(newSortArray);
            sort(field, type);
        }
        else if(value === 'hide'){
            if(field === 'id'){
                let newSortChip = sortChips;
                newSortChip.push(' پنهان سازی شناسه ها');
                setSortChips(newSortChip);
                setHideIdColumn(true);
            }
            else if(field === 'name'){
                let newSortChip = sortChips;
                newSortChip.push(' پنهان سازی نام ها');
                setSortChips(newSortChip);
                setHideNameColumn(true);
            }
        }

    };

    const sort = (field:string, type:string) => {
        if(type === 'asc'){
            let newSortChip = sortChips;
            if(field === 'name'){
                if(newSortChip.includes('فیلتر بر اساس نام نزولی')){
                    let index = newSortChip.indexOf('فیلتر بر اساس نام نزولی')
                    newSortChip.splice(index, index+1);
                }
                newSortChip.push('فیلتر بر اساس نام صعودی');
            }
            else if(field === 'id'){
                if(newSortChip.includes('فیلتر بر اساس شناسه نزولی')){
                    let index = newSortChip.indexOf('فیلتر بر اساس شناسه نزولی')
                    newSortChip.splice(index, index+1);
                }
                newSortChip.push('فیلتر بر اساس شناسه صعودی');
            }
            setSortChips(newSortChip);
            servers.sort((a:any, b:any) => (a[field] > b[field]) ? 1 : -1)
        }
        else{
            let newSortChip = sortChips;
            if(field === 'name'){
                if(newSortChip.includes('فیلتر بر اساس نام صعودی')){
                    let index = newSortChip.indexOf('فیلتر بر اساس نام صعودی')
                    newSortChip.splice(index, index+1);
                }
                newSortChip.push('فیلتر بر اساس نام نزولی');
            }
            else if(field === 'id'){
                if(newSortChip.includes('فیلتر بر اساس شناسه صعودی')){
                    let index = newSortChip.indexOf('فیلتر بر اساس شناسه صعودی')
                    newSortChip.splice(index, index+1);
                }
                newSortChip.push('فیلتر بر اساس شناسه نزولی');
            }
            setSortChips(newSortChip);
            servers.sort((a:any, b:any) => (a[field] < b[field]) ? 1 : -1)
        }
    }

    const handleDeleteChip = (chip:string) =>{
        let newChips = sortChips.filter((sortChip)=>{
            return sortChip != chip;
        });
        setSortChips(newChips);
        if(chip.includes('پنهان')){
            if(chip.includes('نام')){
                setHideNameColumn(false);
            }
            else
                setHideIdColumn(false);
        }
        servers = servers;
    }

    //table paging function
    const handleChangePage = (event:any, newPage:number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event:any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSnack = (event:string) => {
        setOpenDeleteDialog(false);
        if(typeof(event) == 'number'){
            setOpenSnack(true);
            onDelete(event)
        }
    }
    
    const handleCloseSnack = (event:any) => {
        setOpenSnack(false);
    };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnack}
            sx={{margin: '0px 15px'}}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    return(
        <>
        {sortChips.map((chip, index)=>{
            return (<Chip
                key={index}
                label={chip}
                size="small"
                color="primary"
                variant="outlined"
                onDelete={()=>handleDeleteChip(chip)}
                />);
        })}
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right" sx={{display: hideNameColumn? 'none' : ''}}>
                            نام سرور
                            <IconButton
                            aria-controls="sort-menu"
                            aria-haspopup="true"
                            onClick={(event) => {setAnchorNameSort(event.currentTarget);}} >
                                <SortRoundedIcon />
                            </IconButton>
                        </TableCell>
                        <Menu
                        anchorEl={anchorNameSort}
                        keepMounted
                        open={Boolean(anchorNameSort)}
                        onClose={() => {handleCloseSortrMenu('', 'name', '')}}
                        >
                            <MenuItem key={1} onClick={()=>{handleCloseSortrMenu('sort', 'name' , 'asc')}}>
                                مرتب سازی صعودی <NorthIcon fontSize="small" color="primary" sx = {{margin: 1}}/>
                            </MenuItem>
                            <MenuItem key={2} onClick={()=>{handleCloseSortrMenu('sort', 'name', 'dsc')}}>
                                مرتب سازی نزولی <SouthIcon fontSize="small" color="primary" sx = {{margin: 1}}/>
                            </MenuItem>
                            <MenuItem key={3} onClick={()=>{handleCloseSortrMenu('hide', 'name', '')}}>
                                پنهان کردن <VisibilityOff fontSize="small" color="primary" sx = {{margin: 1}}/>
                            </MenuItem>
                        </Menu>
                        <TableCell align="right">مشخصات</TableCell>
                        <TableCell align="center" sx={{display: hideIdColumn? 'none' : ''}}>
                            شناسه
                            <IconButton
                            aria-controls="sort-menu"
                            aria-haspopup="true"
                            onClick={(event) => {setAnchorIdSort(event.currentTarget);}} >
                                <SortRoundedIcon />
                            </IconButton>
                        </TableCell>
                        <Menu
                        anchorEl={anchorIdSort}
                        keepMounted
                        open={Boolean(anchorIdSort)}
                        onClose={() => {handleCloseSortrMenu('', 'id', '')}}
                        >
                            <MenuItem key={1} onClick={()=>{handleCloseSortrMenu('sort', 'id' , 'asc')}}>
                                مرتب سازی صعودی <NorthIcon fontSize="small" color="primary" sx = {{margin: 1}}/>
                            </MenuItem>
                            <MenuItem key={2} onClick={()=>{handleCloseSortrMenu('sort', 'id', 'dsc')}}>
                                مرتب سازی نزولی <SouthIcon fontSize="small" color="primary" sx = {{margin: 1}}/>
                            </MenuItem>
                            <MenuItem key={3} onClick={()=>{handleCloseSortrMenu('hide', 'id', '')}}>
                                پنهان کردن <VisibilityOff fontSize="small" color="primary" sx = {{margin: 1}}/>
                            </MenuItem>
                        </Menu>
                        <TableCell align="right">ديتاسنتر</TableCell>
                        <TableCell align="right">وضعیت</TableCell>
                        <TableCell align="center">برچسب</TableCell>
                        <TableCell align="center">عمليات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {serversState
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((server) => {
                            return (
                                <TableRow
                                key={server.id}
                                hover>
                                    <TableCell className="ChildSelector" scope="row" align="right"
                                    onClick={event => routeToServer(server.id, server.status)}
                                    sx={{display: hideNameColumn? 'none' : ''}}>
                                        {server.name}
                                    </TableCell>
                                    <TableCell align="right" onClick={event => routeToServer(server.id, server.status)}>
                                        {server?.detail.substr(0, 50)}...
                                    </TableCell>
                                    <TableCell align="center" onClick={event => routeToServer(server.id, server.status)}
                                    sx={{display: hideIdColumn? 'none' : ''}}>
                                        {server.id}
                                    </TableCell>
                                    <TableCell align="center" onClick={event => routeToServer(server.id, server.status)}>
                                        {server.dataCenter}
                                    </TableCell>
                                    <TableCell align='center' 
                                        sx={{ color: serverStatusColor(server.status)}}
                                        onClick={event => routeToServer(server.id, server.status)}>
                                        <Box sx={{display:'flex', alignItems:'center'}}>
                                            <Box className="statusIcon" component={'span'}></Box>
                                            {serverStatusToPersion(server.status)}
                                        </Box>
                                    </TableCell>        
                                    <TableCell align="right">
                                        {server.tags.map((tag, index)=>{
                                            return (<Chip
                                                label={tag}
                                                size="small"
                                                color="primary"
                                                onClick = {()=>{addTagChip(tag)}}
                                                />);
                                        })}
                                    </TableCell>                        
                                    <TableCell align="left">
                                        <Box sx={{display: 'flex'}}>
                                            <IconButton onClick={() => editClicked(server.id)}>
                                                <EditIcon color="primary" fontSize='small'/>
                                            </IconButton>
                                            <IconButton onClick={() => deleteClicked(server.id)}>
                                                <DeleteIcon fontSize='small'/>
                                            </IconButton>
                                            <Tooltip title="اطلاعات بیشتر">
                                                <IconButton>
                                                    <MoreVertIcon fontSize='small'/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{display: 'flex', alignItems: 'center'}} color='text.secondary'>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={servers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {servers.length} / {(page * rowsPerPage + rowsPerPage) > servers.length ? servers.length : page * rowsPerPage + rowsPerPage} - {page * rowsPerPage+1}
        </Box>
        <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        message="حذف با موفقیت انجام شد."
        action={action}
        />
        {openDeleteDialog ? <DeleteDialog server={selectedServer} handleClose={($event:string) => {handleSnack($event)}}/> : null} 
        {openEditDialog ? <EditDialog server={selectedServer} handleClose={() =>{ setOpenEditDialog(false)}}/> : null}
        </>
    );
    
};
export default ServerTable;