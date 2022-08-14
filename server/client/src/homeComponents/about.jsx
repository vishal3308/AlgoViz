import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';

export default function About() {
  return (
    <Box sx={{textAlign:'center'}}>
        <h2 className='aboutusheading'>ABOUT US</h2>
    <Box
    sx={{alignItems:'center',
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap:'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    width:'100%'
    }}
    >
    <Card sx={{ maxWidth: 345,m:2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image="developer.jpg"
          alt="Sahil_Singh"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            SAHIL SINGH
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Computer Science Engineer <br />
            <em>Email : </em>shahilsingh@gmail.com <br />
            <em>Address : </em>Aazamgar, Uttar Pradesh, India 222101 <br />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345,m:2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image="developer.jpg"
          alt="Vishal_Maurya"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            VISHAL MAURYA
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Computer Science Engineer <br/>
          <em>Email : </em>vishalmaurya3308@gmail.com <br />
          <em>Address : </em>Jaunpur, Uttar Pradesh, India 222109 <br />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345,m:2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image="developer.jpg"
          alt="Amit_Soni"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            AMIT SONI
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Computer Science Engineer <br />
          <em>Email : </em>amitsoni@gmail.com <br />
          <em>Address : </em>Banaras, Uttar Pradesh, India 222101 <br />

          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Box>
    </Box>
  );
}
