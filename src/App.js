import React, { Suspense, Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
//import Checkout from "./containers/Checkout/Checkout";
//import Orders from "./containers/Orders/Orders";
//import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import "./App.css";

const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/Auth" exact component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/Auth" exact component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      );
    }
    return (
      <div className="App">
        <Layout>
          <Switch>{routes}</Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.tokenId !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
