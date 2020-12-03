import React from 'react';
import ProductList from 'components/ProductsList/ProductsList';

//utils
import withListLoading from 'utils/WithLoading';

//components
import LandingPage from 'views/LandingPage';
import algoliasearch from 'algoliasearch';

export default class SearchProduct extends React.Component {
    state = {
        filter: '',
        products: null,
        loading: false,
        algolia: null,
        algoliaindex: null
    }

    componentDidMount() {
		let algolia = algoliasearch('XJH23A38DB', '9d11533f9834cc8edfa503ec55fd67f3');
        let algoliaindex = algolia.initIndex('manualchaser_product')
        this.setState({ algolia, algoliaindex });
	}

    search = async val => {
        this.setState({ loading: true });
        const filter = val;
        
        if (filter !== "") {
            // only query string
            this.state.algoliaindex.search(filter).then(({ hits }) => {
                this.setState({products: hits, loading: false});
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