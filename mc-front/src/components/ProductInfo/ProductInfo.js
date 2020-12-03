import React from 'react';

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

//fontawesome
import { faFlag, faShare, faStar } from '@fortawesome/free-solid-svg-icons'

//core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

//fontawesome component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//styles
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

const ProductInfo = (props) => {
    const { product } = props;
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    if (!product)
        return <br/>;

    if (product.length === 0) 
        return <p>Nessun prodotto trovato.</p>;

    let data = product;

    return (
        <div style={{color: "#3c4858"}} >
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                    <div className={classes.profile}>
                        <div>
                            <img 
                                src={data.imageurl} 
                                alt="..."  
                                className={imageClasses} 
                            />
                        </div>
                        <div className={classes.name}>
                            <h3>{data.name}</h3>
                            <h6>{data.brand}</h6>
                            <Button justIcon link className={classes.margin5}>
                                <FontAwesomeIcon icon={faStar}/>
                            </Button>
                            <Button justIcon link className={classes.margin5}>
                                <FontAwesomeIcon icon={faShare}/>
                            </Button>
                            <Button justIcon link className={classes.margin5}>
                                <FontAwesomeIcon icon={faFlag}/>
                            </Button>
                        </div>
                        <div className={classes.description}>
                            <p>
                                {data.description}
                            </p>
                        </div>
                    </div>
                </GridItem>
            </GridContainer>
        </div>  
    );
};

export default ProductInfo;