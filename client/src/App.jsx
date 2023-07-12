import React from "react";
import ExpenseTracker from "./ExpenseTracker.jsx";
import SignUpForm from "./SignUp.jsx";
import LoginForm from "./Login.jsx";
import NotFound from "./Notfound.jsx";
import ChangePassword from "./change-password.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App(){

    return(
        <Router>
        <Routes>
            <Route exact path="/" element={<SignUpForm/>}></Route>
            <Route exact path="/Login" element={<LoginForm/>}></Route>
            <Route exact path="/expense-tracker" element={<ExpenseTracker/>}></Route>
            <Route exact path="/change-password" element={<ChangePassword/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
        </Router>
    )

}

export default App



