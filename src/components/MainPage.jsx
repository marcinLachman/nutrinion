import { useContext } from 'react';
import { AppContext } from '../store/AppContext';
import { useNavigate  } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import urlImage from '../static/img/food.jpg';
import urlNoImage from '../static/img/niImage.svg';
import urlImageNutriA from '../static/img/nutriscore-a.svg';
import urlImageNutriB from '../static/img/nutriscore-b.svg';
import urlImageNutriC from '../static/img/nutriscore-c.svg';
import urlImageNutriD from '../static/img/nutriscore-d.svg';
import urlImageNutriE from '../static/img/nutriscore-e.svg';
import urlImageNutriUnknow from '../static/img/nutriscore-unknown.svg';

const MainPage = () => {
  const { data, loading, error, setBarcode } = useContext(AppContext);

  const navigate = useNavigate();

  const handleClick = (code) => {
    navigate('/productDetail');
    setBarcode(code);
  };

  const displayProducts = data.map(product => (

    <Grid item sm={4} xs={12} key={product.id}>
      <Button variant="text" onClick={() => handleClick(product.code)}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 240 }}
            image={!product.image_url ? urlNoImage : product.image_url}
            title="image products"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" fontWeight={700}>
              {product.product_name}
            </Typography>
            
              <ul>
                <li>
                  { !product.quantity ? <Typography variant="body1" component="p">Quantity: No data</Typography>
                  : 
                  <Typography variant="body1" component="p">Quantity: {product.quantity}</Typography>}
                </li>
                <Divider sx={{
                  marginTop:'1rem'
                }} />
                <li>
                  { !product.packaging ? <Typography variant="body1" component="p">Quantity: No data</Typography>
                  : 
                  <Typography variant="body1" component="p">Packaging: {product.packaging}</Typography>}
                </li>
                <Divider sx={{
                  marginTop:'1rem'
                }} />
                <li>
                  { !product.labels ? <Typography variant="body1" component="p">Labels: No data</Typography>
                  : 
                  <Typography variant="body1" component="p">Labels: {product.labels}</Typography>}
                </li>
                <Divider sx={{
                  marginTop:'1rem'
                }} />
              </ul>
              
          </CardContent>
          <CardActions sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>

            <Paper elevation={7}>
              {product.nutriscore_grade === 'a' ? (
              <Avatar variant="square" alt="The nutriscore image" src={urlImageNutriA} sx={{
                width: '80%',
                height: '60%',
              }} />) : ''}
              {product.nutriscore_grade === 'b' ? (
              <Avatar variant="square" alt="The nutriscore image" src={urlImageNutriB} sx={{
                width: '80%',
                height: '60%',
              }} />) : ''}
              {product.nutriscore_grade === 'c' ? (
              <Avatar variant="square" alt="The nutriscore image" src={urlImageNutriC} sx={{
                width: '80%',
                height: '60%',
              }} />) : ''}
              {product.nutriscore_grade === 'd' ? (
              <Avatar variant="square" alt="The nutriscore image" src={urlImageNutriD} sx={{
                width: '80%',
                height: '60%',
              }} />) : ''}
              {product.nutriscore_grade === 'e' ? (
              <Avatar variant="square" alt="The nutriscore image" src={urlImageNutriE} sx={{
                width: '80%',
                height: '60%',
              }} />) : ''}
              {!product.nutriscore_grade ? (
              <Avatar variant="square" alt="The image" src={urlImageNutriUnknow} sx={{
                width: '80%',
                height: '60%',
              }} />) : ''}
            </Paper>
            
          </CardActions>
        </Card>
      </Button>
    </Grid>

  ));

  return (
    <Box mt={3} mb={8}>
      <Avatar variant={"rounded"} alt="The image" src={urlImage} style={{
        width: '100%',
        height: 200,
      }} />

      <Grid container spacing={3} mt={2}>
        {loading ? <Typography variant="h5" component="div">Loading...</Typography> : ''}
        {error ? <Typography variant="h5" component="div">Connection problem...</Typography> : ''}
        {displayProducts}
      </Grid>

    </Box>
  )
}

export default MainPage;