import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  // Determine table columns dynamically
  const columns = activities.length > 0 ? Object.keys(activities[0]) : [];

  return (
    <div>
      <h2 className="mb-4 text-primary">Activities</h2>
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
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                {columns.map(col => (
                  <td key={col}>{String(activity[col])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {activities.length === 0 && <div className="alert alert-info">No activities found.</div>}
      </div>
    </div>
  );
};

export default Activities;
