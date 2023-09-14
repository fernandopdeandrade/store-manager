import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeAdmin from './pages/HomeAdmin';
import HomeUser from './pages/HomeUser';
import HomeUserPurchased from './pages/HomeUserPurchased';
import Login from './pages/Login';
import ProductIdDetails from './pages/ProductIdDetails';
import Register from './pages/Register';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/home_user" component={HomeUser} />
      <Route path="/home_admin" component={HomeAdmin} />
      <Route path="/register" component={Register} />
      <Route path="/product/:id" component={ProductIdDetails} />
      <Route path="/home_user_purchased" component={HomeUserPurchased} />
    </Switch>
  );
}