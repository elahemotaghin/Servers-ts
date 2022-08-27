import React, { useEffect } from 'react';
//impoort hooks
import {useParams} from "react-router-dom";
import useGetAppById from '../../services/Applications/useGetAppById';
import useCreateEnviroment from '../../services/Enviroments/useCreateEnviroment';
import useDeleteEnviroment from '../../services/Enviroments/useDeleteEnviroment';
import useCreateParameter from '../../services/Parameters/useCreateParameter';
import useGetEnviromentParameters from '../../services/Parameters/useGetEviromentParameters' ;
import useDeleteParameter from '../../services/Parameters/useDeleteParameter';
import IEnviroment from 'interfaces/Environment';
import AddEnvDialog from './Enviroments/AddEnvDialog';
import EnvDetailDialog from './Enviroments/EnvDetailDialog';
import DeleteDialog from './DeleteDialog';
import AddParameterDialog from './Enviroments/AddParameterDialog';

//import material components
import {Box, Typography, Button, Menu, MenuItem, IconButton, Tooltip} from '@mui/material';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, Grid} from '@mui/material';
import {Add} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {createTheme } from '@mui/material/styles';
import { ThemeProvider} from '@mui/material/styles';

type tableCellProps = {
    enviroment: IEnviroment,
    onShowEnvDetail: (e: IEnviroment) => void,
    onDeleteButtonClicked: (e: IEnviroment) => void
}

const tableTheme = createTheme({
    palette: {
        primary:{
            main: '#2F6D80',
        },
        secondary:{
            main: '#F79489',
        },
    },
    components:{
        MuiTableCell:{
            styleOverrides:{
                root:{
                    '&:first-child': {
                        fontWeight: '700',
                        position: 'sticky',
                    },
                    minWidth: '170px'
                },
                head:{
                    fontWeight: 700,
                    minWidth: '170px'
                }
            }
        }

    }
})

const IsolatedTableCell = ({enviroment, onShowEnvDetail, onDeleteButtonClicked}:tableCellProps) => {
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchor);

    return(
    <>
      <TableCell key={enviroment.id} onClick={(e)=>setAnchor(e.currentTarget)} align='center'>
        {enviroment.name}
      </TableCell>
      <Menu
        anchorEl={anchor}
        keepMounted
        open={open}
        onClose={() => setAnchor(null)}
      >
        <MenuItem onClick={() => {setAnchor(null); onShowEnvDetail(enviroment)}}>نمایش اطلاعات</MenuItem>
        <MenuItem onClick={() => {setAnchor(null);}}>ساخت نمونه</MenuItem>
        <MenuItem onClick={() => {setAnchor(null); onDeleteButtonClicked(enviroment)}}>حذف محیط</MenuItem>
      </Menu>
  
    </>
    )
}


const AppView = () => {
    let { appId } = useParams();
    //hooks
    const getAppHook = useGetAppById(appId!); 
    const createEnviromentHook = useCreateEnviroment();
    const deleteEnviromentHook = useDeleteEnviroment();
    const createParameterHook = useCreateParameter();
    const deleteParameterHook = useDeleteParameter()
    
    let environments: IEnviroment[] = [];
    if(getAppHook.data && getAppHook.data?.environments){
        environments = getAppHook.data.environments;
    }
    const getEnviromentParametersHook = useGetEnviromentParameters(appId!, environments);
    
    //states
    const [openAddEnvDialog, setOpenAddEnvDialog] = React.useState(false);
    const [openAddParamDialog, setOpenAddParamDialog] = React.useState(false);
    const [openShowEnvDialog, setOpenShowEnvDialog] = React.useState(false);
    const [openDeleteEnvDialog, setOpenDeleteEnvDialog] = React.useState(false);
    const [openParamDelete, setOpenParamDelete] = React.useState(false);
    const [selectedEnv, setSelectedEnv] = React.useState<IEnviroment>();
    const [selectedParam, setSelectedParam] = React.useState<string>();

    //create parameters table
    const getRows = () => {
        let params: string[] = [];
        getEnviromentParametersHook.map((environmentParams)=>{
            for(const param in environmentParams.data){
                if(params.indexOf(param) === -1)
                    params.push(param)
            }
        })
        return params;
    }

    //enviroments functions
    const onEnviromentCreate = async(name:string) =>{
        try{
            await createEnviromentHook.mutateAsync({
                name: name,
                id: appId!
            })
            await getAppHook.refetch()
        }
        catch{}
    }

    const onShowEnvDetail = (enviroment: IEnviroment) => {
        setSelectedEnv(enviroment);
        setOpenShowEnvDialog(true);
    }
    
    const onEnvDeleteButtonClicked = (enviroment: IEnviroment) =>{
        setSelectedEnv(enviroment);
        setOpenDeleteEnvDialog(true);
    }

    const onEnviromentDelete = async (envId: number|string) => {
        try{
            await deleteEnviromentHook.mutateAsync({
                appId: appId!,
                envId: envId
            })
            await getAppHook.refetch()
        }
        catch{}
    }

    const handleCloseDeleteDialog = (operation:string) =>{
        if(operation === 'delete'){
            onEnviromentDelete(selectedEnv?.id!);
        }
        setOpenDeleteEnvDialog(false);
    }

    //params
    const onParamCreate = async(key: string, value: string, global: boolean, appId: string, envId: number) =>{
        try{
            await createParameterHook.mutateAsync({
                key: key,
                value: value,
                global: global,
                appId: appId,
                envId: envId
            })
            await getAppHook.refetch()
            getEnviromentParametersHook.forEach((item)=>{
                item.refetch()
            })
        }
        catch{}
    }

    const onParamDeleteBtnClicked = (name: string) => {
        setOpenParamDelete(true);
        setSelectedParam(name);
    }

    const onParamDelete = async(paramName: string) => {
        try{
            await deleteParameterHook.mutateAsync({
                name: paramName,
                appId: appId!,
            })
            await getAppHook.refetch();
            await getEnviromentParametersHook.forEach(hook=> hook.refetch())
        }
        catch{}
    }

    let tableRows = getRows();
    return (
        <>
            <Box padding={5}>
                <Box className='application-root-header-box'>
                    <Box>
                        <Typography variant='h1' color="primary.dark">برنامه {getAppHook.data?.name}</Typography>
                    </Box>
                    <Box>
                        <Button variant='contained' size="small" id="addBtn"sx={{mx:1}} onClick={()=>setOpenAddParamDialog(true)}>
                            <Add fontSize='small'/>
                            افزودن پارامتر
                        </Button>
                        <Button variant='contained' size="small" id="addBtn"  sx={{mx:1}} onClick={()=>setOpenAddEnvDialog(true)}>
                            <Add fontSize='small'/>
                            افزودن محیط
                        </Button>
                    </Box>
                </Box>
                <Grid margin={5} container justifyContent='center'>
                    <Grid item md={10}>
                    <ThemeProvider theme={tableTheme}>
                    <TableContainer sx={{maxWidth:'700px', maxHeight: 400, direction: 'ltr'}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left' className='sticky-table-cell head-cell'>parameters</TableCell>
                                {getAppHook?.data?.environments!.map((environment, index)=>{
                                    return(
                                        <IsolatedTableCell 
                                        key={index} 
                                        enviroment={environment} 
                                        onShowEnvDetail={onShowEnvDetail} 
                                        onDeleteButtonClicked={onEnvDeleteButtonClicked}/>
                                    )
                                })
                                }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tableRows.map((row)=>{
                                        return(
                                            <TableRow hover>
                                                <TableCell align='left' className='sticky-table-cell'>
                                                    <Box sx={{display: 'flex', minWidth: '170px', justifyContent: 'space-between', alignItems: 'center'}}>
                                                        {row}
                                                        <Box sx={{display: 'flex'}}>
                                                            <Tooltip title='Delete parameter'>
                                                                <IconButton onClick={()=>onParamDeleteBtnClicked(row)}>
                                                                    <DeleteIcon fontSize='small' sx={{color:'#53818f'}}/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title='Edit parameter'>
                                                                <IconButton><EditIcon fontSize='small' sx={{color:'#53818f'}}/></IconButton>                                                       
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                {
                                                    getEnviromentParametersHook.map(params=>{
                                                        return(
                                                            <TableCell align='center' sx={{wordWrap: 'break-word'}}>
                                                                {params?.data? params?.data[row] : null}
                                                            </TableCell>
                                                        );
                                                    })
                                                }
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </ThemeProvider>
                    </Grid>
                </Grid>
            {openAddEnvDialog? <AddEnvDialog handleClose={()=>setOpenAddEnvDialog(false)} onEnvCreate={($name)=>onEnviromentCreate($name)}/> : null}
            {openShowEnvDialog? <EnvDetailDialog handleClose={()=>setOpenShowEnvDialog(false)} enviroment={selectedEnv!}/> : null}
            {openDeleteEnvDialog? 
            <DeleteDialog handleClose={($event:string)=>handleCloseDeleteDialog($event)} massage= {`آیا از حذف محیط با نام ${selectedEnv?.name} مطمئن هستید؟`}/>
            : null}
            {openAddParamDialog? 
            <AddParameterDialog
            enviroments={getAppHook.data?.environments!} 
            handleClose={()=>setOpenAddParamDialog(false)}
            onParameterCreate={(key, value, global, envId)=>{onParamCreate(key, value, global, appId!, envId)}}/> 
            : null}
            {openParamDelete? 
            <DeleteDialog handleClose={()=> setOpenParamDelete(false)} massage={`آیا از حذف پارامتر  ${selectedParam} در همه محیط ها مطمئن هستید؟`}/>
            : null}
            </Box>
        </>
    );
}
export default AppView;