import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', data);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  // Determine table columns dynamically
  const columns = workouts.length > 0 ? Object.keys(workouts[0]) : [];

  return (
    <div>
      <h2 className="mb-4 text-danger">Workouts</h2>
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
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                {columns.map(col => (
                  <td key={col}>{String(workout[col])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {workouts.length === 0 && <div className="alert alert-info">No workouts found.</div>}
      </div>
    </div>
  );
};

export default Workouts;
