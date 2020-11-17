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
            {/*<div className="row">
            {products.map((product) => {
                return (
                    <div key={product.id} className="col-md-6">
                        <div className="card text-white bg-primary flex-md-row mb-4 shadow-sm h-md-250">
                            <div className="card-body d-flex flex-column align-items-start">
                                <strong className="d-inline-block mb-2 text-white">{product.nome}</strong>
                                <h6 className="mb-0">
                                    <span className="text-white">{product.nomefornitore}</span>
                                </h6>
                                <p className="card-text mb-auto">{product.descrizione}</p>
                                <Link to={`/ProductDetail/${product.id}`} className="btn btn-outline-light btn-sm" role="button">Pagina del prodotto</Link>
                            </div>
                            <><img className="card-img-right flex-auto d-none d-lg-block" alt="Thumbnail [200x250]" src={product.imageurl}></img></>                           
                        </div>
                    </div>
                )
            })}
            </div>*/}
        </div>    
    );
};

export default ProductsList;