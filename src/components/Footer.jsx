import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";

const Footer = () => {
  return (
    <Paper sx={{marginTop: 'calc(10% + 60px)',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    }} component="footer" square variant="outlined">
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
            mt: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            Marcin Lachamn - Copyright ©2023
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}

export default Footer;