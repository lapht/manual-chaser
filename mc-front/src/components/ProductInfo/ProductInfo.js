import React from 'react';

const ProductInfo = (props) => {
    const { product } = props;

    if (!product)
        return <br/>;

    if (product.length === 0) 
        return <p>Nessun prodotto trovato.</p>;

    let data = product[0];

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td rowSpan="2">
                            <><img className="card-img-right flex-auto d-none d-lg-block" alt="Thumbnail [200x250]" src={data.imageurl}></img></>
                        </td>
                        <td>
                            <h2 className='list-head'>{data.nome}</h2>
                            <h4>{data.nomeproduttore}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>{data.descrizione}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>    
    );
};

export default ProductInfo;