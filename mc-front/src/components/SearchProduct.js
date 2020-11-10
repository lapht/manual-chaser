import React from 'react';
import axios from 'axios';
import ProductList from './ProductsList';
import withListLoading from './WithLoading';
import {ServerConnection} from './../utils/ConnectionManager';

export default class SearchProduct extends React.Component {
    state = {
        filter: '',
        products: null,
        loading: false
    }

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ filter: e.target.value });
    }

    search = async val => {
        this.setState({ loading: true });

        const filter = val;
        
        if (filter !== "") {
            await axios.post(ServerConnection + '/search', { filter })
            .then(res => {
                const products = res.data;
                this.setState({ products, loading: false });

                console.log(this.state.products);
            });
        }
        else {
            this.setState({ products: null, loading: false });
        }
    }

    render() {
        const ListLoading = withListLoading(ProductList);

        return (
        <div>
            <form>
                <input type="text" name="name" value={this.state.filter} onChange={e => this.onChangeHandler(e)} />
                <button type="submit">Cerca</button>
            </form>
            <br/>
            <div className='repo-container'>
                <ListLoading isLoading={this.state.loading} products={this.state.products} />
            </div>
        </div>
        )
    }
}