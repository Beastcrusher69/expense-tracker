import React from "react";
import ExpenseTracker from "./ExpenseTracker.jsx";
import Auth from "./Auth.jsx";
import NotFound from "./Notfound.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App(){

    return(
        <Router>
        <Routes>
            <Route exact path="/" element={<Auth/>}></Route>
            <Route exact path="/expense-tracker" element={<ExpenseTracker/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
        </Router>
    )

}

export default App



