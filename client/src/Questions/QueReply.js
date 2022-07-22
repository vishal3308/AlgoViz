import { Box } from '@material-ui/core';
import React from 'react';
import Questionbox from './questionbox';

export default function QueReply(props) {
    
    return (
        <Box sx={{ backgroundColor: '#d3d3d4', fontFamily: "'PT Serif', serif",p:1,paddingLeft:"20px",m:1}}>
            <Questionbox pagename={props.pagename}/>
        </Box>
    )
}
