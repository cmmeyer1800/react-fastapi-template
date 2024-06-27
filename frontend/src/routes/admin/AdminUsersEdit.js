import { useState, useContext, useEffect } from "react";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

import { ErrorContext } from "../../components/context/ErrorContext";
import { OAuthContext } from "../../components/context/OAuthContext";

const AdminUserEdit = () => {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [admin, setAdmin] = useState(false);
    const [active, setActive] = useState(true);
    const [searchParams, ] = useSearchParams();

    const { addError } = useContext(ErrorContext);
    const { getToken } = useContext(OAuthContext);

    const user = searchParams.get("user");
    // const doCreateUser = async () => {
    //     const response = await fetch('/api/v1/admin/users', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: 'Bearer ' + getToken()
    //         },
    //         body: JSON.stringify({
    //             first: first,
    //             last: last,
    //             password: password,
    //             email: email,
    //             is_superuser: admin,
    //             is_active: active
    //         })
    //     });

    //     if (response.status === 200) {
    //         window.location.href = '/admin/users';
    //     } else {
    //         addError("Error creating user");
    //     }
    // }

    const doUpdateUser = async () => {
        var body = {};
        if (password !== null && password !== undefined && password !== "") {body.password = password;}
        if (first !== null && first !== undefined && first !== "") {body.first = first;}
        if (last !== null && last !== undefined && last !== "") {body.last = last;}
        if (email !== null && email !== undefined && email !== "") {body.email = email;}
        if (admin !== null && admin !== undefined) {body.is_superuser = admin;}
        if (active !== null && active !== undefined) {body.is_active = active;}

        const response = await fetch('/api/v1/admin/users', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(body)
        }).then(response => {
            if (response.status !== 200) {
                addError("Error updating user");
            } else {
                window.location.href = '/admin/users';
            }
        })
    }


    useEffect(() => {
        if (!user) {
            window.location.href = '/admin/users';
            return null;
        }
        fetch('/api/v1/admin/user?user_id=' + encodeURI(user), {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        })
            .then(response => response.json())
            .then(data => {
                setFirst(data.first);
                setLast(data.last);
                setEmail(data.email);
                setAdmin(data.is_superuser);
                setActive(data.is_active);
            });
    }, [])


    return (
        <>
            <div className="has-text-centered">
                <h1 className="title">Edit User</h1>
            </div>
            <br></br>
            <br></br>
            <div className="columns is-vcentered">
                <div className="column is-1 is-offset-2">
                    <a className="button" href="/admin/users"><FaArrowLeft/> Back</a>
                </div>
                <div className="column is-6 box">
                    <div className="columns">
                        <div className="column is-6">
                            <div className="field">
                                <label className="label">First</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="e.g. Bob" value={first} onChange={(e) => {
                                        setFirst(e.target.value);
                                    }}></input>
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="field">
                                <label className="label">Last</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="e.g. Smith" value={last} onChange={(e) => {
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

                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" checked={admin} onChange={() => {
                                    setAdmin(!admin);
                                }}></input>
                                <span className="ml-1">Admin?</span>
                            </label>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" checked={active} onChange={() => {
                                    setActive(!active);
                                }}></input>
                                <span className="ml-1">Active?</span>
                            </label>
                        </div>
                    </div>

                    <button className="button is-success is-fullwidth" onClick={(e) => {
                        e.preventDefault();
                        doUpdateUser();
                    }}>Update</button>
                </div>
            </div>
        </>
    );
}

export default AdminUserEdit;