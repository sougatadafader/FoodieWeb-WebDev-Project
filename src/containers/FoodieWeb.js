import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Search from "../components/Search/Search";

const FoodieWeb = () =>
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route path="/search/q=:searchCriteria?" render={ props => <Search {...props} />}/>
        </div>
    </Router>

export default FoodieWeb;