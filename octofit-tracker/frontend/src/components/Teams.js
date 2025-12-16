import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched teams:', data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  // Determine table columns dynamically
  const columns = teams.length > 0 ? Object.keys(teams[0]) : [];

  return (
    <div>
      <h2 className="mb-4 text-info">Teams</h2>
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
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                {columns.map(col => (
                  <td key={col}>{String(team[col])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {teams.length === 0 && <div className="alert alert-info">No teams found.</div>}
      </div>
    </div>
  );
};

export default Teams;
