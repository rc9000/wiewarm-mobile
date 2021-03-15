import React, { useState, useEffect } from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useTheme, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';
import BadCard from "./BadCard.js";

function List(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const theme = useTheme();
    const useCards = true;

    const columns = [

      /*
      { field: 'badid_text', headerName: 'Badid', width: 200, type: 'string' },
      { field: 'bad', headerName: 'Bad', width: 200 },
      { field: 'ort', headerName: 'Ort', width: 100 },
      { field: 'becken', headerName: 'Becken', width: 130 },
      { field: 'kanton', headerName: 'KT', width: 130 },

          sortModel={[ { field: 'badid_text', sort: 'asc', }, ]}

        valueGetter: (params) =>
          `${params.getValue('bad') || ''} ${params.getValue('ort') || ''} ${params.getValue('becken') || ''} <br> sdfas`
      */

      {
        field: 'blob',
        headerName: 'Badi',
        width: "400",
        renderCell: (params) => (
        <span>{params.getValue('bad')} {params.getValue('ort')} {params.getValue('becken')} <em className="aktualisiert">Wert von {params.getValue('date_pretty')}</em></span>
        )
      },
      { field: 'temp', headerName: 'Temperatur', type: 'number', width: "100" },

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
            result.sort((a, b) => {                

              // date desc
              if (a.date < b.date) {
                return 1;
              }
              if (a.date > b.date) {
                return -1;
              }
            
              return 0;

            });
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
    } else if (useCards) {
      return (
        <ul>
        {items.map(item => (

          <BadCard bad={item} key={item.badid_text + '.' + item.beckenid}/>
        ))}
      </ul>
      );
    } else {
      return (
        <DataGrid 
          autoHeight={true} 
          rows={items} columns={columns} 
          getRowId={(row) => row.badid +'_'+ row.beckenid} 
        />


      );
    }
}

export default List;