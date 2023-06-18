import react from "react";
import './Auth.css'

function Auth(){
    return(
        <div id="auth-wrap">
        <div id="box">
            <p id="expense-tracker-p">Expense Tracker</p>
            <form id="auth-form">
                <input class="auth-input" type="text" placeholder="username"></input>
                <input class="auth-input" type="text" placeholder="password"></input>
                <span id="button-span">
                <button class="auth-buttons">Login</button>
                <button class="auth-buttons">Sign Up</button>
                </span>
                
            </form>
        </div>
        </div>
    )
}

export default Auth