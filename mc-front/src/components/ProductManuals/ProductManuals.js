import React from 'react';

const ProductManuals = (props) => {
    const { manuals } = props;

    if (!manuals)
        return <br/>;

    if (manuals.length === 0) 
        return <p>Nessun manuale trovato.</p>;

    return (
        <div>
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
                                    BOTTONE{/*<Link to={`/ProductManual/${manual.id}`} role="button">Vai</Link>*/}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>    
    );
};

export default ProductManuals;