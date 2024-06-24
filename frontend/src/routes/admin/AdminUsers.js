import { useEffect, useState, useContext } from 'react';

import { OAuthContext } from '../../components/context/OAuthContext';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const { getToken } = useContext(OAuthContext);

    useEffect(() => {
        fetch('/api/v1/admin/users', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUsers(data);
            });
    }, [])

    return (
        <>
            <div className="has-text-centered">
                <h1 className="title">Current Users</h1>
            </div>
            <br></br>
            <table className="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Admin</th>
                        <th>Disabled</th>
                        <th>Creation</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.email}</td>
                            <td>{user.first}</td>
                            <td>{user.last}</td>
                            <td>{user.is_superuser ? "Yes" : "No"}</td>
                            <td>{user.is_active ? "No" : "Yes"}</td>
                            <td>{user.time_created}</td>
                            <td>{user.time_updated}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default AdminUsers;