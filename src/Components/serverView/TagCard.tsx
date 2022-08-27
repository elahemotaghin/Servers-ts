import React from "react";
import IServer from '../../interfaces/Server';

import CreateNewTag from "./CreateNewTag";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type props ={
    server: IServer,
}
const TagCard = ({server}: props) => {
    const [tags, setTags] = React.useState(server.tags);
    const [newTag, setNewTag] = React.useState('');

    const addTag = () =>{
        if(!server.tags.includes(newTag)){
            let newTags: any = server.tags.push(newTag);
            setTags(newTags);
        }

    }

    const onChipDelete = (chipLabel:string) =>{
        server.tags = server.tags.filter((chip)=>{
            return chip != chipLabel;
        });
        setTags(server.tags);
    }

    return(
        <Card>
            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <CardHeader title='برچسب ها' className='usageCardHeader'/>
            </Box>
            <CardContent>
                <Box>
                    {server.tags.map((tag, index)=>{
                        return(<Chip
                            key={index}
                            label={tag}
                            size="small"
                            color="primary"
                            onDelete={()=>onChipDelete(tag)}
                            />)
                    })}
                </Box>
                <Box sx={{display: 'flex', justifyContent:'flex-end'}}>
                    <CreateNewTag setNewTag={setNewTag}/>
                    <Button onClick={addTag} variant="contained" size="small" id="addBtn" color='secondary'>
                        <AddIcon/>
                            افزودن
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
export default TagCard;