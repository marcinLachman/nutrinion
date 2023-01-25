import { useContext, useEffect } from 'react';
import { AppContext } from '../store/AppContext';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GiPalmTree, GiChestnutLeaf, GiSquareBottle, GiPlainCircle } from "react-icons/gi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#62B6B7',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ProductDetail = () => {
  const { barcode, loading, error, getDataDetails, dataDetails  } = useContext(AppContext);

  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

  useEffect(() => {  
    getDataDetails(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const additives_tags_data = (!dataDetails.additives_tags ? '' : dataDetails.additives_tags);
  const additives_tags = additives_tags_data.toString().replaceAll('en:', '');

  const ingredients_analysis_tags_data_palm = (!dataDetails.ingredients_analysis_tags ? '' : dataDetails.ingredients_analysis_tags[0]);
  const ingredients_analysis_tags_data_vegan = (!dataDetails.ingredients_analysis_tags ? '' : dataDetails.ingredients_analysis_tags[1]);
  const ingredients_analysis_tags_data_vegetarian = (!dataDetails.ingredients_analysis_tags ? '' : dataDetails.ingredients_analysis_tags[2]);

  const ingredients_analysis_tags_palm = ingredients_analysis_tags_data_palm.toString().replaceAll('en:', '');
  const ingredients_analysis_tags_vegan = ingredients_analysis_tags_data_vegan.toString().replaceAll('en:', '');
  const ingredients_analysis_tags_vegetarian = ingredients_analysis_tags_data_vegetarian.toString().replaceAll('en:', '');

  const nutrient_levels_tags_data_fat = (!dataDetails.nutrient_levels_tags ? '' : dataDetails.nutrient_levels_tags[0]);
  const nutrient_levels_tags_data_saturated = (!dataDetails.nutrient_levels_tags ? '' : dataDetails.nutrient_levels_tags[1]);
  const nutrient_levels_tags_data_sugars = (!dataDetails.nutrient_levels_tags ? '' : dataDetails.nutrient_levels_tags[2]);
  const nutrient_levels_tags_data_salt = (!dataDetails.nutrient_levels_tags ? '' : dataDetails.nutrient_levels_tags[3]);

  const nutrient_levels_tags_fat = (!nutrient_levels_tags_data_saturated ? '' : nutrient_levels_tags_data_fat.replaceAll('en:', ''));
  const nutrient_levels_tags_saturated = (!nutrient_levels_tags_data_saturated ? '' : nutrient_levels_tags_data_saturated.replaceAll('en:', ''));
  const nutrient_levels_tags_sugars = (!nutrient_levels_tags_data_sugars ? '' : nutrient_levels_tags_data_sugars.replaceAll('en:', ''));
  const nutrient_levels_tags_salt = (!nutrient_levels_tags_data_salt ? '' : nutrient_levels_tags_data_salt.replaceAll('en:', ''));
  
  const allegens_data = (!dataDetails.allergens ? '' : dataDetails.allergens);
  const display_allegens_data = allegens_data.toString().replaceAll('en:', '');

  const traces_data = (!dataDetails.traces ? '' : dataDetails.traces);
  const display_traces_data = traces_data.toString().replaceAll('en:', '');

  return (
    <Box mt={3} mb={8} sx={{width: '100%'}}>
    <Grid container spacing={2}>
    {loading ? <Typography variant="h5" component="div">Loading...</Typography> : ''}
    {error ? <Typography variant="h5" component="div">Connection problem...</Typography> : ''}
      <Grid item sm={4} xs={12}>
        <Avatar variant={"rounded"} alt="The image" src={!dataDetails.image_url ? '' : dataDetails.image_url} style={{
          width: '100%',
          height: '100%',
        }} />
      </Grid>
      
    <Grid item sm={8} xs={12}>

    <Card>
      <CardContent>
        <Typography variant="h4" component="div" sx={{fontWeight: '700',}}>
        {!dataDetails.product_name ? '' : dataDetails.product_name}
        </Typography>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            aria-label="product detail"
          >
          <ListItem disablePadding>
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
              <ListItemText primary={<Typography type="body2">Quantity: {!dataDetails.quantity ? '' : dataDetails.quantity}</Typography>} />
            </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
              <ListItemText primary={<Typography type="body2">Brands: {!dataDetails.brands ? '' : dataDetails.brands}</Typography>} />
            </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
              <ListItemText primary={<Typography type="body2">Labels, certifications, awards: {!dataDetails.labels_old ? '' : dataDetails.labels_old}</Typography>} />
            </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
              <ListItemText primary={<Typography type="body2">Link to the product page: <Link href={dataDetails.link} underline="none">{dataDetails.link}</Link></Typography>} />
            </ListItem>

          </List>
      </CardContent>
      </Card>

      </Grid>
    </Grid>

    <Divider sx={{
      margin: '2rem'
    }} />

    <Paper elevation={6} square >

      <Typography  variant="body1" component="div" paragraph p={2}>
        <Typography sx={{fontWeight: 700}}>Ingredients:</Typography> {!dataDetails.ingredients_text_en ? '' : dataDetails.ingredients_text_en}
      </Typography>

      <Typography  variant="body1" component="div" paragraph p={2}>
        <Typography sx={{fontWeight: 700}}>Allergens:</Typography> {display_allegens_data}
      </Typography>
      <Typography  variant="body1" component="div" paragraph p={2}>
      <Typography sx={{fontWeight: 700}}>Traces:</Typography> {display_traces_data}
      </Typography>

      <Divider sx={{
        marginLeft: '2rem',
        marginRight: '2rem'
      }} />

      <Typography  variant="body1" component="div" paragraph p={2}>
        <Typography sx={{fontWeight: 700}}>Additives:</Typography>{additives_tags.toUpperCase()}
      </Typography>

      <Divider sx={{
        margin: '2rem',
      }} />

      <Typography  variant="h5" component="div" paragraph p={2}>
        Ingredients analysis:
      </Typography>

      <List
          sx={{bgcolor: 'background.paper', paddingLeft: '1rem', fontSize: '1.5rem' }}
          aria-label="product detail"
        >
        <ListItem disablePadding>
          <ListItemIcon>
            <GiPalmTree color='#62B6B7' />
          </ListItemIcon>
            <ListItemText primary={<Typography type="body2">{ingredients_analysis_tags_palm.toUpperCase()}</Typography>} />
          </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <GiChestnutLeaf color='#62B6B7' />
          </ListItemIcon>
            <ListItemText primary={<Typography type="body2">{ingredients_analysis_tags_vegan.toUpperCase()}</Typography>} />
          </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <GiSquareBottle color='#62B6B7' />
          </ListItemIcon>
            <ListItemText primary={<Typography type="body2">{ingredients_analysis_tags_vegetarian.toUpperCase()}</Typography>} />
        </ListItem>
      </List>

      <Divider sx={{
        margin: '2rem',
      }} />

      <Typography  variant="h5" component="div" paragraph p={2}>
        Nutrition:
      </Typography>

      <List
          sx={{bgcolor: 'background.paper', paddingLeft: '1rem', fontSize: '1.5rem' }}
          aria-label="product detail"
        >
        <ListItem disablePadding>
          <ListItemIcon>
            <GiPlainCircle color='#97DECE'/>
          </ListItemIcon>
            <ListItemText primary={<Typography type="body2">{nutrient_levels_tags_fat} ({!dataDetails.nutriments ? "" : dataDetails.nutriments.fat}%)</Typography>} />
          </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <GiPlainCircle color='#97DECE' />
          </ListItemIcon>
            <ListItemText primary={<Typography type="body2">{nutrient_levels_tags_saturated} ({!dataDetails.nutriments ? "" : dataDetails.nutriments['saturated-fat_100g']}%)</Typography>} />
          </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <GiPlainCircle color='#97DECE' />
          </ListItemIcon>
            <ListItemText primary={<Typography type="body2">{nutrient_levels_tags_sugars} ({!dataDetails.nutriments ? "" : dataDetails.nutriments.sugars_100g}%)</Typography>} />
          </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <GiPlainCircle color='#97DECE' />
          </ListItemIcon>
            <ListItemText primary={<Typography type="body2">{nutrient_levels_tags_salt} ({!dataDetails.nutriments ? "" : dataDetails.nutriments.salt_100g}%)</Typography>} />
          </ListItem>
        </List>

      <Divider sx={{
        margin: '2rem',
      }} />

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nutrition facts</StyledTableCell>
              <StyledTableCell align="right">As sold <br />for 100 g / 100 ml</StyledTableCell>
              <StyledTableCell align="right">As sold <br />per serving ({!dataDetails.serving_size ? '' : dataDetails.serving_size})</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Energy
                </StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.energy_100g}{!dataDetails.nutriments ? '' : dataDetails.nutriments.energy_unit}</StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.energy_serving}{!dataDetails.nutriments ? '' : dataDetails.nutriments.energy_unit}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Fat
                </StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.fat}{!dataDetails.nutriments ? '' : dataDetails.nutriments.fat_unit}</StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.fat_serving}{!dataDetails.nutriments ? '' : dataDetails.nutriments.fat_unit}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Saturated fat
                </StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments['saturated-fat']}{!dataDetails.nutriments ? '' : dataDetails.nutriments['saturated-fat_unit']}</StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments['saturated-fat_serving']}{!dataDetails.nutriments ? '' : dataDetails.nutriments['saturated-fat_unit']}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Carbohydrates
                </StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.carbohydrates_100g}{!dataDetails.nutriments ? '' : dataDetails.nutriments.carbohydrates_prepared_unit}</StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.carbohydrates_serving}{!dataDetails.nutriments ? '' : dataDetails.nutriments.carbohydrates_prepared_unit}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Sugars
                </StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.sugars}{!dataDetails.nutriments ? '' : dataDetails.nutriments.sugars_unit}</StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.sugars_serving}{!dataDetails.nutriments ? '' : dataDetails.nutriments.sugars_unit}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Fiber
                </StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.fiber_100g}{!dataDetails.nutriments ? '' : dataDetails.nutriments.fiber_unit}</StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.fiber_serving}{!dataDetails.nutriments ? '' : dataDetails.nutriments.fiber_unit}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Proteins
                </StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.proteins_100g}{!dataDetails.nutriments ? '' : dataDetails.nutriments.proteins_unit}</StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.proteins_serving}{!dataDetails.nutriments ? '' : dataDetails.nutriments.proteins_unit}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Salt
                </StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.salt_100g}{!dataDetails.nutriments ? '' : dataDetails.nutriments.salt_unit}</StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.salt_serving}{!dataDetails.nutriments ? '' : dataDetails.nutriments.salt_unit}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Aclohol
                </StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.alcohol_100g}{!dataDetails.nutriments ? '' : dataDetails.nutriments.alcohol_unit}</StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments.alcohol_serving}{!dataDetails.nutriments ? '' : dataDetails.nutriments.alcohol_unit}</StyledTableCell>
              </StyledTableRow>
          </TableBody>
          <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Fruits‚ vegetables‚ nuts and rapeseed‚ walnut and olive oils (estimate from ingredients list analysis)
                </StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments['fruits-vegetables-nuts-estimate-from-ingredients_100g']}%</StyledTableCell>
                <StyledTableCell align="right">{!dataDetails.nutriments ? '' : dataDetails.nutriments['fruits-vegetables-nuts-estimate-from-ingredients_serving']}%</StyledTableCell>
              </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
  </Box>
  )
}

export default ProductDetail;