import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import { Button } from "@mui/material";

function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        fetch("https://northwind.vercel.app/api/products")
            .then((res) => res.json())
            .then((resData) => {
                setProducts(resData)
            });
    }

    const deleteProduct = (id) => {
        fetch('https://northwind.vercel.app/api/products/' + id, { method: 'DELETE' })
            .then(res => {
                if (res.ok === true) {
                    loadData()
                }
            })
    }

    const columns = [
        { field: 'id', headerName: 'Id', flex: 1},
        { field: 'name', headerName: 'Name', flex: 1},
        { field: 'unitPrice', headerName: 'UnitPrice', flex: 1},
        { field: 'unitsInStock', headerName: 'UnitsInStock', flex: 1},
        { field: 'quantityPerUnit', headerName: 'QuantityPerUnit', flex: 1},
        { field: 'actions', headerName: 'Delete', flex: 1, renderCell: (params) => {
            return (
              <Button
                onClick={(e) => deleteProduct(params.row.id)}
                variant="contained"
              >
                Delete
              </Button>
            );
          
        }}
    ];

    return (
        <div style={{ height: '80vh', margin: '3%' }}>
            <DataGrid rows={products} columns={columns}/>
        </div>
    )
}

export default Products