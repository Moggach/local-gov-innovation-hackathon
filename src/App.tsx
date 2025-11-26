import './App.css';
import MapHotspots from './MapHotspots';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


const cases = [
  { id: 1, name: 'John Smith', risk: 'High', details: 'Rent arrears', probability: 90 },
  { id: 2, name: 'Jane Doe', risk: 'Medium', details: 'Council tax debt', probability: 60 },
  { id: 3, name: 'Sam Lee', risk: 'Low', details: 'Universal Credit delay', probability: 20 },
  { id: 4, name: 'Alex Green', risk: 'High', details: 'Eviction notice', probability: 80 },
];

function PersonPage() {
  // Template person page
  return (
    <div className="person-page" style={{ padding: '3em', maxWidth: '700px', margin: '0 auto', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <h2>Person Details</h2>
      <section style={{ marginBottom: '2em' }}>
        <h3>Personal Details</h3>
        <ul>
          <li><strong>Name:</strong> John Smith</li>
          <li><strong>Date of Birth:</strong> 12/03/1980</li>
          <li><strong>Address:</strong> 123 Example Street, Birmingham</li>
          <li><strong>Contact:</strong> john.smith@email.com, 07123 456789</li>
        </ul>
      </section>
      <section style={{ marginBottom: '2em' }}>
        <h3>Service Interaction History</h3>
        <ul>
          <li>01/06/2025: Contacted Housing Advice Service</li>
          <li>15/07/2025: Attended Financial Support Workshop</li>
          <li>02/09/2025: Received Council Tax Debt Letter</li>
        </ul>
      </section>
      <section style={{ marginBottom: '2em' }}>
        <h3>Risk Factors</h3>
        <ul>
          <li>Rent arrears</li>
          <li>Single adult household</li>
          <li>Recent job loss</li>
        </ul>
      </section>
      <Link to="/">Back to dashboard</Link>
    </div>
  );
}

const hotspots = [
  { id: 1, name: 'Central Park', lat: 51.5074, lng: -0.1278, count: 12 },
  { id: 2, name: 'East End', lat: 51.515, lng: -0.07, count: 8 },
  { id: 3, name: 'South Bank', lat: 51.5033, lng: -0.1195, count: 5 },
];

function Dashboard() {
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
                <td>
                  <Link to={`/person/${c.id}`} className="case-link">{c.name}</Link>
                </td>
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
        <MapHotspots hotspots={hotspots.map(h => ({ lat: h.lat, lng: h.lng, count: h.count, area: h.name }))} />
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/person/:id" element={<PersonPage />} />
      </Routes>
    </Router>
  );
}

export default App
