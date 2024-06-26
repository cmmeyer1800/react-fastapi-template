import { useContext, useEffect, useState } from 'react';

import { OAuthContext } from '../../components/context/OAuthContext';

const AdminDashboard = () => {
    const [perf, setPerf] = useState(undefined);

    const { getToken } = useContext(OAuthContext);

    useEffect(() => {
        fetch('/api/v1/admin/performance', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        })
            .then(response => response.json())
            .then(data => {
                setPerf(data);
            });
    }, [getToken])

    var art;
    if (perf === undefined) {
        art = "Loading...";
    } else {
        art = (perf.average_response_time*1000).toFixed(2);
    }

    var api_load;
    if (perf === undefined) {
        api_load = "Loading...";
    } else {
        api_load = perf.rps.toFixed(3);
    }

    var uptime;
    if (perf === undefined) {
        uptime = "Loading...";
    } else {
        var seconds = Math.floor(perf.system_uptime % 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var minutes = Math.floor((perf.system_uptime / 60) % 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var hours = Math.floor((perf.system_uptime / 3600) % 24);
        if (hours < 10) {
            hours = "0" + hours;
        }
        var days = Math.floor(perf.system_uptime / 86400);
        uptime = `${days}:${hours}:${minutes}:${seconds}`;
    }

    return (
        <>
            <div className="has-text-centered">
                <h1 className="title">Application Status</h1>
            </div>
            <br></br>
            <br></br>
            <div className="columns is-vcentered">
                <div className="column is-2 is-offset-2">
                    <h2 className="subtitle has-text-centered">System Uptime</h2>
                    <hr></hr>
                    <p className="title is-2 has-text-centered">{uptime}</p>
                </div>
                <div className="column is-2 is-offset-1">
                    <h2 className="subtitle has-text-centered">Average Response Time</h2>
                    <hr></hr>
                    <p className="title is-1 has-text-centered">{art} ms</p>
                </div>
                <div className="column is-2 is-offset-1">
                    <h2 className="subtitle has-text-centered">API Load</h2>
                    <hr></hr>
                    <p className="title is-1 has-text-centered">{api_load} rps</p>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;