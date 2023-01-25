import { createContext, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataDetails, setDataDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [barcode, setBarcode] = useState('3017620422003');


  const getData = async (url) => {
    setLoading(true)
    try {
      const response = await axios.get(url);
      setData(response.data.products);
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const getDataDetails = async (url) => {
  setLoading(true)
    try {
      const response = await axios.get(url);
      setDataDetails(response.data.product);
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }
  
  return (
    <AppContext.Provider value={{
      data,
      loading,
      setLoading,
      setData,
      error,
      setError,
      setSearch,
      barcode,
      setBarcode,
      search,
      getData,
      dataDetails, setDataDetails,
      getDataDetails,
    }}>
      { children }
    </AppContext.Provider>
  );
};

export default AppProvider;