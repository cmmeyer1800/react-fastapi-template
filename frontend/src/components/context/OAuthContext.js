import { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import './errorContext.css';
import globals from '../Globals';

const OAuthContext = createContext(
    {authed: false, admin: false, getToken: () => {}, login: () => {}, logout: () => {}}
);

const OAuthManager = ({ children, initCheck = true }) => {
    const [cookies, setCookie, deleteCookie] = useCookies([globals.cookiesPrefix+'-oauth']);
    const [authed, setAuthed] = useState(cookies[globals.cookiesPrefix+'-oauth'] !== undefined);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if (initCheck) validateAuth();
    });

    const getToken = () => {
        return cookies[globals.cookiesPrefix+'-oauth'].access_token;
    }

    const login = async (username, password) => {
        const data = await fetch(globals.oauthBackendURL+globals.oauthTokenEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${username}&password=${password}`
        })
        .then(async response => {
            const data = await response.json();
            if(!response.ok) {
                console.error("Request Error: ", data.detail);
                return {status: "error", message: data.detail}
            }

            return {status: "success", data: data};
        })
        .catch(error => {
            console.error(error)
            return {status: "error", message: error}
        });

        if (data.status === "error") return data;

        const oauth = data.data;
        console.log(oauth)
        if(oauth === undefined || (!('access_token' in oauth)) || 
            (oauth.grants === undefined || !oauth.grants.includes("user"))){

            console.error("Bad Token Response: ", oauth);
            return {status: "error", message: "Bad Token Response"};
        }

        setCookie(globals.cookiesPrefix+'-oauth', oauth, { path: '/' });
        console.log("test")
        setAuthed(true);
        setAdmin(oauth.grants.includes("admin"));

        return data;
    }

    const testToken = async (access_token) => {
        const status = await oauthFetch(
            globals.oauthBackendURL+globals.oauthUserEndpoint,
            access_token
        )
        .then(async response => {
            const data = await response.json();
            if(!response.ok) {
                return false;
            }
    
            if(data === undefined) return false;
            
            return 'email' in data
        })
        .catch(error => {
            console.error(error)
        });
    
        return status;
    }

    const logout = () => { 
        deleteCookie(globals.cookiesPrefix+'-oauth');
        setAuthed(false);
    }

    const validateAuth = async () => {
        if(cookies[globals.cookiesPrefix+'-oauth'] === undefined) {
            setAuthed(false);
        }

        if(cookies[globals.cookiesPrefix+'-oauth'] !== undefined) {
            if(await testToken(cookies[globals.cookiesPrefix+'-oauth'].access_token)){
                setAuthed(true);
                setAdmin(cookies[globals.cookiesPrefix+'-oauth'].grants.includes("admin"));
            } else {
                setAuthed(false);
                setAdmin(false);
            }
        }
    }

    return (
        <OAuthContext.Provider value={{authed: authed, admin: admin, getToken: getToken, login: login, logout: logout}}>
            {children}
        </OAuthContext.Provider>
    );
};


const oauthFetch = async (url, token, options = {}) => {

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
    }

    return fetch(url, options);
}

export { OAuthContext, OAuthManager}