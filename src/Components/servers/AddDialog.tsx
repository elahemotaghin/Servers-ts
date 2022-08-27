import React from "react";
import IServer from "interfaces/Server";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const statusToEn = (status:string) =>{
    if(status === 'فعال')
        return 'active';
    else if(status === 'راه اندازی')
        return 'starting';
    else if(status === 'خاموش')
        return 'stop';
    else if(status === 'روشن')
        return 'running';
    else if(status === 'غیر فعال')
        return 'disable';
    return 'unknwon'
}

type props = {
    handleClose: any,
    handleAddServer: any,
    statusList: string[],
    dataCenterList: string[]
}

const AddDialog = ({handleAddServer, handleClose, statusList, dataCenterList}:props) =>{
    const isNameValid = true;
    const [helperText, setHelperText] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [dataCenter, setDataCenter] = React.useState('');
    const [serverName, setServerName] = React.useState('');
    const [serverDetail, setServerDetail] = React.useState('');

    const nameFiledOnChange = (event:any) => {
        const input = event.target.value;
        if(input.length == 0){
            setHelperText('این فیلد ضروری است.');
            setServerName('');
        }
        else if(input[0].toUpperCase()!==input[0]){
            setHelperText('نام باید با حرف بزرگ شروع شود.');
            setServerName('');
        }
        else if(!/^[A-Za-z0-9 ]*$/.test(input)){
            setHelperText('نام باید فقط شامل حروف و اعداد باشد.');
            setServerName('');
        }
        else if(input.length<5){
            setHelperText('نام نباید کمتر از 5 کاراکتر باشد.');
            setServerName('');
        }
        else if(input.length>32){
            setHelperText('نام نباید بیشتر از 32 کاراکتر باشد.');
            setServerName('');
        }
        else{
            setHelperText('');
            setServerName(input);
        }
    }

    const onSubmit = () => {
        const temp: IServer = {
            name: serverName,
            dataCenter: dataCenter,
            detail: serverDetail,
            enable: false,
            id: 0,
            status: statusToEn(status),
            tags: []
        }
        handleAddServer(temp)
    }

    return(
        <Dialog open={true} onClose={handleClose}>
        <DialogTitle>ایجاد سرور</DialogTitle>
        <DialogContent>
            <DialogContentText>
                سرور مورد نظر خود را ایجاد كنيد.
            </DialogContentText>
            <Box component="form" sx={{'& > :not(style)': { m: 1 }, width:'500px'}}>
                <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                    <Box component={'div'} sx={{mt:2, width: '50%'}} >
                        <InputLabel htmlFor="server-name-field" sx={{color: '#000'}}>نام:</InputLabel>
                        <TextField 
                        id="server-name-field" 
                        variant="standard" 
                        sx={{width:'100%'}} 
                        onChange={nameFiledOnChange}
                        helperText={helperText}/>
                    </Box>
                    <Box component={'div'} sx={{mr:3 , mt:2, width: '50%'}} >
                        <InputLabel htmlFor="server-name-field" sx={{color: '#000'}}>نام نمایشی:</InputLabel>
                        <TextField 
                        id="server-name-field" 
                        variant="standard" 
                        sx={{width:'100%'}} />
                    </Box>
                </Box>
                <Box sx={{display:'flex', justifyContent: 'space-around'}}>
                    <Box component={'div'} sx={{mt:2, width:'50%'}}>
                        <InputLabel htmlFor="server-dataCenter-field" sx={{color: '#000'}}>دیتاسنتر: </InputLabel>
                        <Select
                            value={dataCenter}
                            onChange={(event)=>{setDataCenter(event.target.value);}}
                            variant='standard'
                            sx={{ mt: 1, width:'100%' }}
                        >
                            {dataCenterList.map((item, index)=>{
                                return(
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                )
                            })}
                        </Select>
                    </Box>
                    <Box component={'div'} sx={{mr:3, mt:2, width: '50%'}}>
                        <InputLabel htmlFor="server-enable-field" sx={{color: '#000'}}>وضعیت: </InputLabel>
                        <Select
                            value={status}
                            onChange={(event)=>{setStatus(event.target.value)}}
                            variant='standard'
                            sx={{ mt: 1, width:'100%' }}
                        >
                            {statusList.map((item, index)=>{
                                return(
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                )
                            })}
                        </Select>
                    </Box>
                </Box>
                <Box sx={{display:'flex', justifyContent: 'space-around'}}>
                    <Box component={'div'} sx={{ width: '100%', mt:2 }}>
                        <InputLabel htmlFor="server-detail-field" sx={{color: '#000'}}>مشخصات: </InputLabel>
                        <TextField id="server-detail-field"
                        variant="standard"
                        multiline
                        rows={4}
                        style={{ width: '100%' }}
                        onChange={(e)=>setServerDetail(e.target.value)}/>
                    </Box>
                </Box>
                
            </Box>
        </DialogContent>
        <DialogActions>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Button onClick={onSubmit} color='success' variant="contained" disableElevation>
                    تایید
                </Button>
            </Box>
            <Button onClick={handleClose} color='error' variant="outlined" disableElevation>بازگشت</Button>
        </DialogActions>
    </Dialog>
    );
}
export default AddDialog;