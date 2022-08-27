import React from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import {createTheme } from '@mui/material/styles';
import { ThemeProvider} from '@mui/material/styles';

const ramMarks = [
    {
      value: 0,
      label: '0GB'
    },
    {
      value: 30,
      label: '30GB',
    }
]

const cpuMarks = [
    {
      value: 0,
      label: '0'
    },
    {
      value: 10,
      label: '10',
    }
]

const versionMarks = [
    {
      value: 0,
      label: '0.0'
    },
    {
      value: 5,
      label: '5.0',
    }
]
const sliderTheme = createTheme({
    direction: 'ltr',
    palette: {
        secondary:{
            light: '#F8AFA6',
            main: '#F79489',
            dark: '#E98973',
            contrastText: '#F79489',
        },
    },
    components:{
        MuiSlider:{
            styleOverrides:{
                thumb:{
                    boxShadow: '.8px 3px 8px #F8AFA6'
                }
            }
        }
    }
})

interface Imark {
    value: number;
    label: string;
}

type sliderProps = {
    value: any,
    setValue: any,
    min:number,
    max:number,
    marks:Imark[],
}

const CustomSlider = ({value, setValue, min, max, marks}:sliderProps)=>{
    return(
        <ThemeProvider theme={sliderTheme}>
            <Slider
                isRtl={true}
                size="small"
                defaultValue={value}
                aria-label="Small"
                valueLabelDisplay="auto"
                color='secondary'
                min={min}
                max={max}
                marks={marks}
                onChange={(e: any) =>{setValue(e.target.value)}}
            />
        </ThemeProvider>
    );
}
type customListItemProp={
    value: any,
    setValue: any,
    min: number,
    max: number,
    unit: string,
    title: string,
    marks: Imark[],
}

const CustomListItem = ({value, setValue, min, max, unit, title, marks}:customListItemProp) =>{
    return(
        <ListItem sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{width: '100%', display: 'flex', justifyContent:'space-between'}}>
                <Typography variant="h6" color='primary'>{title}</Typography>
                <Chip label={value+' '+unit} color='primary' sx={{minWidth: '70px'}}/>
            </Box>
            <Box width='90%' sx={{paddingTop:1}}>
                <CustomSlider min={min} max={max} value={value} setValue={setValue} marks={marks}/>
            </Box>
        </ListItem>
    );
}

const ResourceView = () =>{
    const [ram, setRam] = React.useState(12);
    const [cpu, setCPU] = React.useState(7);
    const [valum, setValum] = React.useState(17);
    const [version, setVersion] = React.useState([2,4]);

    return(
        <Box sx={{margin:0, height: '100%', width: '100%', padding: 3}}>
            <Grid container spacing={1} md={12} sx={{height:'100%'}}>
                <Grid item md={4}>
                <Card>
                    <CardContent>
                    <List sx={{padding:2}}>
                        <CustomListItem title='رم' unit='گیگ' min={0} max={30} value={ram} setValue={setRam} marks={ramMarks}/>
                        <Divider light />
                        <CustomListItem title='هسته' unit='عدد' min={0} max={10} value={cpu} setValue={setCPU} marks={cpuMarks}/>
                        <Divider light />
                        <CustomListItem title='حجم' unit='گیگ' min={0} max={30} value={valum} setValue={setValum} marks={ramMarks}/>
                        <Divider light />
                        <CustomListItem title='نسخه' unit='' min={0} max={5} value={version} setValue={setVersion} marks={versionMarks}/>
                    </List>
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ResourceView;