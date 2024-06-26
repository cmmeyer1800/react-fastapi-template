import { useState, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

import { ErrorContext } from "../components/context/ErrorContext";
import { OAuthContext } from "../components/context/OAuthContext";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [searchParams, ] = useSearchParams();

    const { login } = useContext(OAuthContext);
    const { addError } = useContext(ErrorContext);

    return (
        <div className="columns">
            <div className="column is-4 is-offset-4 box">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if((await login(e.target[0].value, e.target[1].value)).status === "success"){
                        window.location.href = searchParams.get("redir") || '/';
                    } else {
                        addError("Login Failed! Check your credentials.");
                    }
                }}>
                    <h1 className="title has-text-centered">Log Into Account</h1>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-left">
                            <input className="input" type="email" placeholder="Text input"
                                value={username} onChange={(e) => {
                                    setUsername(e.target.value);
                            }}></input>
                            <span className="icon is-small is-left">
                                <FaEnvelope />
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left">
                            <input className="input" type="password" placeholder="Password"
                                value={password} onChange={(e) => {
                                    setPassword(e.target.value);
                            }}></input>
                            <span className="icon is-small is-left">
                                <FaLock />
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary is-fullwidth">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;