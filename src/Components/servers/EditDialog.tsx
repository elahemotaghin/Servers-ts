import * as React from "react";
import IServer from "interfaces/Server";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

type props = {
    handleClose: any,
    server: IServer
}

const EditDialog = ({handleClose, server}:props) => {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef(0);
    React.useEffect(() => {
        return () => {
        clearTimeout(timer.current);
        };
    }, []);

    const onSubmit = () =>{
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
              setSuccess(true);
              setLoading(false);
              handleClose();
            }, 2000);
        }
    }

    return(
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>ويرايش سرور</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    اطلاعات مورد نظر خود را ويرايش كنيد.
                </DialogContentText>
                <Box component="form" sx={{'& > :not(style)': { m: 1 }, width:'500px'}}>
                    <Box sx={{display:'flex', justifyContent: 'space-around'}}>
                        <Box component={'div'} sx={{mt:2, width:'50%'}}>
                            <InputLabel htmlFor="server-name-field" sx={{color: '#000'}}>نام:</InputLabel>
                            <TextField defaultValue={server.name} sx={{width: '100%'}} id="server-name-field"/>
                        </Box>
                        <Box component={'div'} sx={{mx:3 , mt:2, width:'50%'}}>
                            <InputLabel htmlFor="server-id-field" sx={{color: '#000'}}>شناسه: </InputLabel>
                            <TextField defaultValue={server.id} sx={{width: '100%'}} id="server-id-field"/>
                        </Box>
                    </Box>
                    <Box sx={{display:'flex', justifyContent: 'space-around'}}>
                        <Box component={'div'} sx={{mt:2, width:'50%'}}>
                            <InputLabel htmlFor="server-dataCenter-field" sx={{color: '#000'}}>دیتاسنتر: </InputLabel>
                            <TextField defaultValue={server.dataCenter} sx={{width: '100%'}} id="server-dataCenter-field"/>
                        </Box>
                        <Box component={'div'} sx={{mx:3, mt:2, width:'50%'}}>
                            <InputLabel htmlFor="server-enable-field" sx={{color: '#000'}}>وضعیت: </InputLabel>
                            <TextField defaultValue={server.enable? 'فعال' : 'غیر فعال'} sx={{width: '100%'}} id="server-enable-field"/>
                        </Box>
                    </Box>
                    <Box sx={{display:'flex', justifyContent: 'space-around'}}>
                        <Box component={'div'} sx={{ width: '100%', mt:2 }}>
                            <InputLabel htmlFor="server-detail-field" sx={{color: '#000'}}>مشخصات: </InputLabel>
                            <TextField defaultValue={server.detail} id="server-detail-field"
                            multiline
                            rows={4}
                            style={{ width: '100%' }}/>
                        </Box>
                    </Box>
                    
                </Box>
            </DialogContent>
            <DialogActions>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button onClick={onSubmit} color='success' variant="contained" disableElevation disabled={loading}>
                        تایید
                    </Button>
                    {loading && (
                    <CircularProgress
                        size={24}
                        color='success'
                        sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                        }}
                    />
                    )}
                </Box>
                <Button onClick={handleClose} color='error' variant="outlined" disableElevation>بازگشت</Button>
            </DialogActions>
        </Dialog>
    );
}
export default EditDialog;