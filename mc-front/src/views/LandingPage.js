//libraries
import React, { Component } from 'react';
import classNames from "classnames"; // nodejs library that concatenates classes
import { withStyles } from "@material-ui/core/styles"; // @material-ui/core components -- makeStyles if is not class

//styles
import styles from "assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];
class LandingPage extends Component {
    onChangeHandler = async e => {console.log('mainlayout' + e);
        this.setState({ filter: e.target.value });
    }

    render(){
        const { classes } = this.props;

        return (
            <div className="App">
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div className={classes.container}>
                            <h1 style={{color: "black"}}>LANDING PAGE</h1>
                        </div>
                    </div>
            </div>
        );
    };
}

export default withStyles(styles, { withTheme: true })(LandingPage);