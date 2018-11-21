import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../components/Home/Home";

const FoodieWeb = () =>
    <Router>
        <div>
            <Route exact path="/" component={Home} />
        </div>
    </Router>

export default FoodieWeb;