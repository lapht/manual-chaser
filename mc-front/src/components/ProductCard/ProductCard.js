import React from "react";
import { Link } from 'react-router-dom';

// material-ui components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

//assets
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import { cardTitle } from "assets/jss/material-kit-react.js";

const styles = {
    ...imagesStyles,
    cardTitle,
};

const useStyles = makeStyles(styles);

export default function Cards(props) {
    const classes = useStyles();
    let product = props.product;
    var ProductDescription = product.description;

    if (product.description.length >= 80)
        ProductDescription = ProductDescription.substring(0, 77) + "...";

    return (
        <Card style={{width: "20rem"}}>
            <img
                style={{height: "180px", width: "100%", display: "block", objectFit: "contain"}}
                className={classes.imgCardTop}
                src={product.imgurl}
                alt="Card-img-cap"
            />
            <CardBody>
                <h4 className={classes.cardTitle}>{product.name}</h4>
                <small>{product.brand}</small>
                <p>{ProductDescription}</p>
                <Link to={`/ProductDetail/${product.objectID}`}>
                    <Button color="primary">Pagina del prodotto</Button>
                </Link>
            </CardBody>
        </Card>
    );
}