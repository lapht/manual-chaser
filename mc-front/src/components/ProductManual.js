import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import withLoading from './WithLoading';
import PDFViewer from './PDFViewer';
import { ServerConnection } from '../utils/ConnectionManager';

class ProductManual extends React.Component {
	state = {
        manualId: this.props.match.params.manualId,
        manual: null,
        loading: false
	}

	componentDidMount() {
		this.readManual(this.state.manualId);
	}

	readManual = async val => {
		this.setState({ loading: true });

		const manualId = val;
		
		if (manualId !== "") {
			await axios.post(ServerConnection + `/manual`, { manualId })
			.then(res => {
                if (res.data.length > 0){
                    const manual = res.data[0];
                    this.setState({ manual, loading: false });

                    console.log(this.state.manual);
                }
                else{
                    this.setState({ loading: false });
                    console.log("Error retreiving manuals");
                }
			});
		}
		else {
			this.setState({ manual: null, loading: false });
		}
	}

	render() {
        const ManualLoading = withLoading(PDFViewer);

		return (
			<div>
				<ManualLoading isLoading={this.state.loading} manual={this.state.manual} />
			</div>
		);
	}
};

export default withRouter(ProductManual);