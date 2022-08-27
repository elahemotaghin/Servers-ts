import React from "react";
import { PieChart } from 'react-minimal-pie-chart';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

interface IContent {
    title: string;
    icon: any;
    usage: number;

}

type props ={
    content: IContent,
}

const ResourcesageCard = ({content}:props) => {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef(0);
    React.useEffect(() => {
        return () => {
        clearTimeout(timer.current);
        };
    }, []);

    const cardOnClick = () =>{
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
              setSuccess(true);
              setLoading(false);
            }, 2000);
        }
    }

    return(
        <Grid item md={5} margin={1}>
        <Card className='usageCard' onClick={cardOnClick} sx={{opacity: loading? 0.5 : 1}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                {content?.icon}
                <CardHeader title={content.title} className='usageCardHeader'/>
            </Box>
            <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                <Box sx={{margin: 2}}>
                <PieChart
                    data={[
                        { title: 'One', value: content.usage, color: '#F8AFA6' },
                    ]}
                    lineWidth={40}
                    totalValue= {100}
                    center={[50, 50]}
                    viewBoxSize={[100, 100]}
                    labelPosition={0}
                    label={()=>content.usage+'%'}
                    background='#cccccc'
                    labelStyle={{color:'#fff'}}
                    startAngle={0}
                />
                </Box>
            </CardContent>
            {loading && (
                <LinearProgress color="secondary" />
                )}
        </Card>
        </Grid>
    );
}
export default ResourcesageCard;