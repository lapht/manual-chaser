import React from 'react';

//assets
import 'assets/css/ProductsList.css';

//core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

//components
import ProductCard from "components/ProductCard/ProductCard";

const ProductsList = (props) => {
    const { products } = props;

    if (!products)
        return <br/>;

    if (products.length === 0) 
        return <p>Nessun prodotto trovato.</p>;

    return (
        <div>
            <GridContainer>
                {products.map((product) => {
                    return (
                        <GridItem xs={12} sm={12} md={4}>
                            <ProductCard product={product}/>
                        </GridItem>
                    )
                })}
            </GridContainer>
        </div>    
    );
};

export default ProductsList;