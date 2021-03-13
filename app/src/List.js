import React, { useState, useEffect } from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useTheme, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';

function List(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const theme = useTheme();

    const columns = [
      { field: 'bad', headerName: 'Bad', width: 70 },
      { field: 'ort', headerName: 'Ort', width: 130 },
      { field: 'becken', headerName: 'Becken', width: 130 },
      { field: 'kanton', headerName: 'Ort', width: 130 },
      {
        field: 'temp',
        headerName: 'Temperatur',
        type: 'number',
        width: 20,
      },

      /*
      {
        field: 'vG',
        headerName: 'vG',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.getValue('badid') || ''} ${params.getValue('badid_text') || ''}`,
      },


      {
        field: 'id',
        headerName: 'id',
        sortable: true,
        width: 160,
        valueGetter: (params) =>
          `${params.getValue('badid') || ''} ${params.getValue('beckenid') || ''}`,
      },
      */
    ];
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("https://www.wiewarm.ch:443/api/v1/temperature/all_current.json/0")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        
        <Box>

        <DataGrid rows={items} columns={columns} getRowId ={(row) => row.badid} pageSize={100}/>

        {/*
        <ul>
          {items.slice(0, 10).map(item => (
            <li key={item.id}>
              <Typography variant="body1">{item.bad} {item.ort} {item.becken} {item.temp}</Typography>
            </li>
          ))}
        </ul>
          */}
        </Box>
      );
    }
}

export default List;