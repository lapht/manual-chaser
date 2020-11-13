//libraries
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import classNames from "classnames"; // nodejs library that concatenates classes
import { makeStyles } from "@material-ui/core/styles"; // @material-ui/core components

//core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";

//views
import SearchProduct from './../components/SearchProduct';
import ProductDetail from './../components/ProductDetail';
import ProductManual from './../components/ProductManual';

//styles
import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

const onChangeHandler = (e) => {
    console.log('mainlayout' + e);
}

export default function MainLayout(props) {
    const classes = useStyles();
    const { ...rest } = props;

    return (
        <div className="App">
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
                {...rest}
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
                                    onChange: (e => onChangeHandler(e))
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <Router>
                        <Switch>
                            <Route exact path="/"><SearchProduct /></Route>
                            <Route path="/ProductDetail/:productId"><ProductDetail/></Route>
                            <Route path="/ProductManual/:manualId"><ProductManual/></Route>
                        </Switch>
                    </Router>
                </div>
            </div>
            <Footer />
        </div>
    );
}