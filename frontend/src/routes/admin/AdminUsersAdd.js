import { useState, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa6";

import { ErrorContext } from "../../components/context/ErrorContext";
import { OAuthContext } from "../../components/context/OAuthContext";

const AdminUserAdd = () => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [admin, setAdmin] = useState(false);
    const [active, setActive] = useState(true);

    const { addError } = useContext(ErrorContext);
    const { getToken } = useContext(OAuthContext);

    const doCreateUser = async () => {
        const response = await fetch('/api/v1/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getToken()
            },
            body: JSON.stringify({
                first: first,
                last: last,
                password: password,
                email: email,
                is_superuser: admin,
                is_active: active
            })
        });

        if (response.status === 200) {
            window.location.href = '/admin/users';
        } else {
            addError("Error creating user");
        }
    }

    return (
        <>
            <div className="has-text-centered">
                <h1 className="title">Add/Create Users</h1>
            </div>
            <br></br>
            <br></br>
            <div className="columns is-vcentered">
                <div className="column is-6 is-offset-3 box">
                    <div className="columns">
                        <div className="column is-6">
                            <div class="field">
                                <label class="label">First</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="e.g. Bob" value={first} onChange={(e) => {
                                        setFirst(e.target.value);
                                    }}></input>
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div class="field">
                                <label class="label">Last</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="e.g. Smith" value={last} onChange={(e) => {
                                        setLast(e.target.value);
                                    }}></input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left">
                            <input className="input" type="email" placeholder="Text input"
                                value={email} onChange={(e) => {
                                    setEmail(e.target.value);
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

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" checked={admin} onClick={() => {
                                    setAdmin(!admin);
                                }}></input>
                                <span className="ml-1">Admin?</span>
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <label class="checkbox">
                                <input type="checkbox" checked={active} onClick={() => {
                                    setActive(!active);
                                }}></input>
                                <span className="ml-1">Active?</span>
                            </label>
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link" onClick={(e) => {
                                e.preventDefault();
                                doCreateUser();
                            }}>Submit</button>
                        </div>
                        <div class="control">
                            <button class="button is-link is-light" onClick={() => {
                                window.location.href = '/admin/users/create';
                            }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminUserAdd;