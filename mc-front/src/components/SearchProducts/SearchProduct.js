import React from 'react';
import axios from 'axios';
import ProductList from 'components/ProductsList/ProductsList';

//utils
import withListLoading from 'utils/WithLoading';
import {ServerConnection} from 'utils/ConnectionManager';

//components
import LandingPage from 'views/LandingPage';

export default class SearchProduct extends React.Component {
    state = {
        filter: '',
        products: null,
        loading: false
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
        if (this.state.filter !== this.props.filter && (this.props.filter !== null && this.props.filter.length > 0)){
            console.log(this.props.filter);
            this.setState({ filter: this.props.filter });
            this.search(this.props.filter);
        } else if (this.props.filter == null || this.props.filter.length === 0){
            return (
                <LandingPage />
            );
        }

        const ListLoading = withListLoading(ProductList);

        return (
        <div>
            <div className='repo-container'>
                <ListLoading isLoading={this.state.loading} products={this.state.products} />
            </div>
        </div>
        )
    }
}