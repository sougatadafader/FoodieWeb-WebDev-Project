import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Search from "../components/Search/Search";
import DishDetails from "../components/DishDetails/DishDetails";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";

const FoodieWeb = () =>
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/search" render={ props => <Search {...props} />}/>
            <Route path="/search/:searchCriteria?/:course?/:page?" render={ props => <Search {...props} />}/>
            <Route path="/:dishId/view" render={ props => <DishDetails {...props} />}/>
        </div>
    </Router>

export default FoodieWeb;