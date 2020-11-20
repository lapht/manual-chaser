import React from 'react';

//material components
import {DataGrid} from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Description from "@material-ui/icons/Description";

//core components
import Button from "components/CustomButtons/Button.js";

//styles
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

const ProductManuals = (props) => {
    const { manuals } = props;
    const classes = useStyles();

    if (!manuals)
        return <br/>;

    if (manuals.length === 0) 
        return <p>Nessun manuale trovato.</p>;

    return (
        <div style={{color: "#3c4858"}}>
            <DataGrid
                width="100%"
                columns={
                    [
                        { 
                            field: "descrizione", 
                            headerName: "Description", 
                            description: "Description",
                            flex: 1,
                            align: "left"
                        },
                        { 
                            field: "lingua", 
                            headerName: "Language", 
                            description: "Language",
                            flex: 0.2,
                            align: "left"
                        },
                        { 
                            field: "", 
                            width: 50,
                            renderCell: () => (
                                <strong>
                                    <Button justIcon link className={classes.margin5}>
                                        <Description/>
                                    </Button>
                                </strong>
                            ),
                            align: "left"
                        }
                    ]
                }
                rows={manuals}
                autoHeight="true"
                autoPageSize="true"
                hideFooterSelectedRowCount="true"
                hideFooterRowCount="true"
                disableSelectionOnClick="true"
            />
        
        {/*
            <table>
                <thead>
                    <tr style={{border: "1px solid black"}}>
                        <th>
                            Descrizione
                        </th>
                        <th>
                            Lingua
                        </th>
                        <th>
                            Manuale
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {manuals.map((manual) => {
                        return (
                            <tr key={manual.id} style={{border: "1px solid black"}}>
                                <td>
                                    {manual.descrizione}
                                </td>
                                <td>
                                    {manual.lingua}
                                </td>
                                <td>
                                    BOTTONE{/*<Link to={`/ProductManual/${manual.id}`} role="button">Vai</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>*/}
        </div>
    );
};

export default ProductManuals;