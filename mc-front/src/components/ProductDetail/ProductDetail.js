import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";

//utils
import withLoading from 'utils/WithLoading';
import {ServerConnection} from 'utils/ConnectionManager';

// @material-ui/icons
import Description from "@material-ui/icons/Description";
import LiveHelp from "@material-ui/icons/LiveHelp";
import Link from "@material-ui/icons/Link";

//core components
import NavPills from "components/NavPills/NavPills.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

//views
import ProductInfo from 'components/ProductInfo/ProductInfo';
import ProductManuals from 'components/ProductManuals/ProductManuals';

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
			await axios.post(ServerConnection + `/manuals`, { productId })
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
			await axios.post(ServerConnection + `/product`, { productId })
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

		return (
			<div>
				<DataLoading isLoading={this.state.loadingProductInfo} product={this.state.product} />
				<GridContainer justify="center">
					<GridItem 
						xs={12} 
						sm={12} 
						md={10} 
						style={{margin: "20px auto 50px auto", textAlign: "center"}}
					>
						<NavPills
							alignCenter
							color="primary"
							tabs={[
								{
									tabButton: "Manuals",
									tabIcon: Description,
									tabContent: (
										<ManualsLoading isLoading={this.state.loadingManuals} manuals={this.state.manuals} />
									)
								},
								{
									tabButton: "FAQ",
									tabIcon: LiveHelp,
									tabContent: (
										<div style={{backgroundColor:"red", width:"100%"}}><p>FAQ</p></div>
									)
								},
								{
									tabButton: "Related",
									tabIcon: Link,
									tabContent: (
										<div style={{backgroundColor:"red", width:"100%"}}><p>Related</p></div>
									)
								}
							]}
						/>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
};

export default withRouter(ProductDetail);