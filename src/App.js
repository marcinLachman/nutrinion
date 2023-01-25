import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";

import Container from '@mui/material/Container';

const App = () => {

    return (
      <div>
        <Router>
          <Navbar />
            <main>
              <Container sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                <Routes>
                  <Route path='/' element={ <MainPage /> } />
                  <Route path='/productDetail' element={ <ProductDetail /> } />
                </Routes>
              </Container>
            </main>
          <footer>
            <Footer />
          </footer>
        </Router>
      </div>
    );
  }

export default App;
