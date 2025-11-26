import './App.css';
import MapHotspots from './MapHotspots';

// Mock data for cases
const cases = [
  { id: 1, name: 'John Smith', risk: 'High', details: 'Rent arrears', probability: 90 },
  { id: 2, name: 'Jane Doe', risk: 'Medium', details: 'Council tax debt', probability: 60 },
  { id: 3, name: 'Sam Lee', risk: 'Low', details: 'Universal Credit delay', probability: 20 },
  { id: 4, name: 'Alex Green', risk: 'High', details: 'Eviction notice', probability: 80 },
];

// Mock data for financial difficulty hotspots
const hotspots = [
  { lat: 51.5074, lng: -0.1278, count: 12, area: 'Central' },
  { lat: 51.515, lng: -0.09, count: 8, area: 'North' },
  { lat: 51.495, lng: -0.15, count: 5, area: 'West' },
];


function App() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to your dashboard</h1>
        <div className="profile-icon" title="Profile">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="#e9ecef" />
            <circle cx="40" cy="32" r="14" fill="#b0b8c1" />
            <ellipse cx="40" cy="60" rx="20" ry="12" fill="#b0b8c1" />
          </svg>
        </div>
      </div>
      <section className="cases-section">
        <h2>Cases</h2>
        <table className="cases-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Risk Status</th>
              <th>Details</th>
              <th>Probability of Homelessness (6mo)</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className={`risk-${c.risk.toLowerCase()}`}>
                <td>{c.name}</td>
                <td>{c.risk}</td>
                <td>{c.details}</td>
                <td>{c.probability}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="map-section">
        <h2>Homelessness hotspots</h2>
        <MapHotspots hotspots={hotspots} />
      </section>
    </div>
  );
}

export default App
