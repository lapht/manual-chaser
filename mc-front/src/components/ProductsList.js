import React from 'react';
import { Link } from 'react-router-dom';
import './../assets/css/ProductsList.css';

const ProductsList = (props) => {
    const { products } = props;

    if (!products)
        return <br/>;

    if (products.length === 0) 
        return <p>Nessun prodotto trovato.</p>;

    return (
        <div>
            <h2 className='list-head'>Prodotti:</h2>
            <div className="row">
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
            </div>
        </div>    
    );
};

export default ProductsList;