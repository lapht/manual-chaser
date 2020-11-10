import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import withLoading from './WithLoading';
import ProductInfo from './ProductInfo';
import ProductManuals from './ProductManuals';

class ProductDetail extends React.Component {
	state = {
		productId: this.props.match.params.productId,
		product: null,
		manuals: null,
		loadingManuals: false,
		loadingProductInfo: false
	}

	componentDidMount() {
		this.readProductInfo(this.state.productId);
		this.readManuals(this.state.productId);
	}

	readManuals = async val => {
		this.setState({ loadingManuals: true });

		const productId = val;
		
		if (productId !== "") {
			await axios.post(`http://localhost:3001/manuals`, { productId })
			.then(res => {
				const manuals = res.data;
				this.setState({ manuals, loadingManuals: false });

				console.log(this.state.manuals);
			});
		}
		else {
			this.setState({ manuals: null, loadingManuals: false });
		}
	}

	readProductInfo = async val => {
		this.setState({ loadingProductInfo: true });

		const productId = val;
		
		if (productId !== "") {
			await axios.post(`http://localhost:3001/product`, { productId })
			.then(res => {
				const product = res.data;
				this.setState({ product, loadingProductInfo: false });

				console.log(this.state.product);
			});
		}
		else {
			this.setState({ product: null, loadingProductInfo: false });
		}
	}

	render() {
		const DataLoading = withLoading(ProductInfo);
		const ManualsLoading = withLoading(ProductManuals);
		console.log('Product id: ' + this.state.productId);

		return (
			<div>
				<DataLoading isLoading={this.state.loadingProductInfo} product={this.state.product} />
				<ManualsLoading isLoading={this.state.loadingManuals} manuals={this.state.manuals} />
			</div>
		);
	}
};

export default withRouter(ProductDetail);