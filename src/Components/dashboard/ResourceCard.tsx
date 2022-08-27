import React from "react";
import {IheaderCard} from './Home';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LockIcon from '@mui/icons-material/Lock';

type props = {
    content: IheaderCard,
}

const ResourceCard = ({content}: props) =>{
    return(
        <Card sx={{backgroundColor: content.color, color: content?.color ? '#fff' : ''}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                {content?.icon}
                <IconButton sx={{color: content?.color ? '#fff' : ''}}><MoreVertIcon/></IconButton>
            </Box>
            <CardHeader title={content.title} />
            <CardContent sx={{paddingBottom:'0px !important'}}>
                <Typography padding={1}>{content.count} {content.countUnit}</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <LockIcon fontSize="small" sx={{margin: "0px 4px", color: content?.color ? '#fff' : 'gray.main'}}/>
                    <p>{content?.detail}</p>
                </Box>
            </CardContent>
        </Card>
    );
}
export default ResourceCard;