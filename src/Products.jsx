import React, { useEffect, useState } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function Products() {
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [id, setDeleteId] = useState(0)

    const handleClickOpen = (id) => {
        setDeleteId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setLoading(true)
        loadData()
    }, [])

    const loadData = () => {
        fetch("https://northwind.vercel.app/api/products")
            .then((res) => res.json())
            .then((resData) => {
                setProducts(resData)
                setLoading(false)
            });
    }

    const deleteProduct = (id) => {
        handleClose()
        setLoading(true)
        fetch('https://northwind.vercel.app/api/products/' + id, { method: 'DELETE' })
            .then(res => {
                if (res.ok === true) {
                    loadData()
                }
            })
    }

    const columns = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'unitPrice', headerName: 'UnitPrice', flex: 1 },
        { field: 'unitsInStock', headerName: 'UnitsInStock', flex: 1 },
        { field: 'quantityPerUnit', headerName: 'QuantityPerUnit', flex: 1 },
        {
            field: 'actions', headerName: 'Delete', flex: 1, renderCell: (params) => {
                return (
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={(e) => handleClickOpen(params.row.id)}
                        color="warning"
                    />
                );

            }
        }
    ];

    return (

        <div style={{ height: "100vh", margin: "3%" }}>
            <DataGrid
                rows={products}
                columns={columns}
                loading={isLoading}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"The product will be deleted."}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(e) => deleteProduct(id)} autoFocus variant="contained">Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Products