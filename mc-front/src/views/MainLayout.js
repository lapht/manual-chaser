//libraries
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import classNames from "classnames"; // nodejs library that concatenates classes
import { /*makeStyles, */withStyles } from "@material-ui/core/styles"; // @material-ui/core components -- makeStyles if is not class

//core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";

//views
import SearchProduct from 'components/SearchProducts/SearchProduct';
import ProductDetail from './../components/ProductDetail';
import ProductManual from './../components/ProductManual';

//styles
import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];
//const useStyles = makeStyles(styles); //if is not class

//export default function MainLayout(props) { //if is not class
class MainLayout extends Component {
    state={
        filter: ''
    }

    onChangeHandler = async e => {console.log('mainlayout' + e);
        this.setState({ filter: e.target.value });
    }

    render(){
        //const classes = useStyles(); //if is not class
        const { classes } = this.props;
        //const { ...rest } = props; //if is not class

        return (
            <div className="App">
                <Router>
                    <Header
                        color="transparent"
                        routes={dashboardRoutes}
                        brand="Manual Chaser"
                        rightLinks={<HeaderLinks />}
                        fixed
                        changeColorOnScroll={{
                            height: 100,
                            color: "white"
                        }} 
                        //{...rest} //if is not class
                    />
                    <Parallax filter style={{
                        backgroundColor: "purple",
                        color: "white"
                    }}>
                        <div className={classes.container}>
                            <GridContainer>
                                <GridItem xs={12} sm>
                                    <CustomInput
                                        labelText="Search your product"
                                        id="filter"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        white={true}
                                        inputProps={{
                                            onChange: (e => this.onChangeHandler(e))
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </div>
                    </Parallax>
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div className={classes.container}>
                            <Switch>
                                <Route exact path="/"><SearchProduct filter={this.state.filter}/></Route>
                                <Route path="/ProductDetail/:productId"><ProductDetail/></Route>
                                <Route path="/ProductManual/:manualId"><ProductManual/></Route>
                            </Switch>
                        </div>
                    </div>
                    <Footer />
                </Router>
            </div>
        );
    };
}

export default withStyles(styles, { withTheme: true })(MainLayout);