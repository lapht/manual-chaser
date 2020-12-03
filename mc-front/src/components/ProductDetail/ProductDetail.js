import React from 'react';
import { withRouter } from "react-router";

//utils
import withLoading from 'utils/WithLoading';
import firebase from 'utils/Firestore.js';

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

	setProductInfo = async doc => {
		if (doc.exists) {
			let product = doc.data();
			this.setState({ product, loadingProductInfo: false });
		} else {
			console.log("No such document!");
		}
	}

	setManuals = async manuals => {
		if (manuals.length > 0) {
			this.setState({ manuals, loadingManuals: false });
		} else {
			console.log("No such document!");
		}
	}

	readProductInfo = async val => {
		this.setState({ loadingProductInfo: true });
		let db = firebase.firestore();

		const productId = val;
		
		if (productId !== "") {
			let docRef = db.collection('products').doc(productId);
			docRef.get().then(
				doc => this.setProductInfo(doc)
			).catch(function(error) {
				console.log("Error getting document:", error);
			});
        }
		else {
			this.setState({ product: null, loadingProductInfo: false });
		}
	}

	readManuals = async val => {
		this.setState({ loadingManuals: true });
		let db = firebase.firestore();

		const productId = val;
		let manualsList = [];
		
		if (productId !== "") {
			let collRef = db.collection('products').doc(productId).collection('manuals');
			collRef.get().then(querySnapshot => {
				querySnapshot.forEach(doc => {
					let manual = doc.data();
					manual.id = doc.id;
					
					manualsList.push(manual)
				});

				this.setManuals(manualsList);
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
		}
		else {
			this.setState({ manuals: null, loadingManuals: false });
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
										<div style={{backgroundColor:"red", width:"100%", height:"600px"}}><p>FAQ</p></div>
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