import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../store/AppContext';
import { useNavigate  } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const MyCustomeButton = styled(Button) ({
  padding: 1.5,
  color: 'black',
})

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const { search, setSearch, getData } = useContext(AppContext);
  const navigate = useNavigate();

  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${search}&search_simple=1&action=process&json=1`;

  useEffect(() => {  
    getData(url);
  }, [search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(searchInput);
    navigate('/');
  };

  const handleClickHome = () => {
    navigate('/')
  };

  return (
    <nav>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{
          marginTop: 2,
          padding: 1.5,
          backgroundColor: '#439A97'
        }}>
          <Toolbar>
          <Grid container spacing={2}  sx={{
            display: 'flex',
            alignItems: 'center'
          }}>  

            <Grid item sm={2} xs={12}>
              <MenuBookIcon sx={{
                fontSize: 50
              }} />
            </Grid>
            <Grid item sm={6} xs={12}>
            <form onSubmit={handleSubmit}> 
              <TextField
                id="search-product"
                label="SEARCH PRODUCT"
                fullWidth
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton aria-label="search" type='submit'>
                        <ManageSearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </form>

            </Grid>

            <Grid item sm={4} xs={12}  sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}>
            <MyCustomeButton variant="text" onClick={handleClickHome}>Products</MyCustomeButton>
            {/* <MyCustomeButton variant="text">BMI</MyCustomeButton> */}
            </Grid>
          </Grid>

          </Toolbar>
        </AppBar>
      </Box>

    </nav>
  )
}

export default Navbar;