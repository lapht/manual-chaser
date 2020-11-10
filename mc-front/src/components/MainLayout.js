import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SearchProduct from './SearchProduct';
import ProductDetail from './ProductDetail';
import ProductManual from './ProductManual';
import logo from './../logo.svg';
import './../App.css';

class MainLayout extends Component {
    render() {
      return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <main>
                <Router>
                    <Switch>
                        <Route exact path="/"><SearchProduct /></Route>
                        <Route path="/ProductDetail/:productId"><ProductDetail/></Route>
                        <Route path="/ProductManual/:manualId"><ProductManual/></Route>
                    </Switch>
                </Router>
            </main>
        </div>
        )
    }
  }

  export default MainLayout;