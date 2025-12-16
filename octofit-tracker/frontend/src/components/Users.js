import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users endpoint:', endpoint);
        console.log('Fetched users:', data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  // Determine table columns dynamically
  const columns = users.length > 0 ? Object.keys(users[0]) : [];

  return (
    <div>
      <h2 className="mb-4 text-warning">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              {columns.map(col => (
                <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                {columns.map(col => (
                  <td key={col}>{String(user[col])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <div className="alert alert-info">No users found.</div>}
      </div>
    </div>
  );
};

export default Users;
