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
                            field: "description", 
                            headerName: "Description", 
                            description: "Description",
                            flex: 1,
                            align: "left"
                        },
                        { 
                            field: "language", 
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
        </div>
    );
};

export default ProductManuals;