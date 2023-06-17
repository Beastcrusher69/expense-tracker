import react from "react";
import './Auth.css'

function Auth(){
    return(
        <div id="box">
            <p>Expense Tracker</p>
            <form>
                <input type="text"></input>
                <input type="text"></input>
                <span id="buttons">
                <button>Login</button>
                <button>Sign Up</button>
                </span>
                
            </form>
        </div>
    )
}

export default Auth