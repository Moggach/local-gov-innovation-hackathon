import './App.css';
import MapHotspots from './MapHotspots';
import PersonPage from './PersonPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


const cases = [
  { id: 1, reference: 'CASE-001', uprn: '100010001', name: 'John Smith', risk: 'High', details: 'Rent arrears', probability: 90, completeness: 'high' },
  { id: 2, reference: 'CASE-002', uprn: '100010002', name: 'Jane Doe', risk: 'Medium', details: 'Council tax debt', probability: 60, completeness: 'partial' },
  { id: 3, reference: 'CASE-003', uprn: '100010003', name: 'Sam Lee', risk: 'Low', details: 'Universal Credit delay', probability: 20, completeness: 'limited' },
  { id: 4, reference: 'CASE-004', uprn: '100010004', name: 'Alex Green', risk: 'High', details: 'Eviction notice', probability: 80, completeness: 'high' },
];


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
              <th>Case Reference</th>
              <th>UPRN</th>
              <th>Name</th>
              <th>Risk Status</th>
              <th>Data Completeness</th>
              <th>Details</th>
              <th>Probability of Homelessness (6mo)</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className={`risk-${c.risk.toLowerCase()}`}>
                <td>
                  <Link to={`/person/${c.id}`} className="case-link">{c.reference}</Link>
                </td>
                <td>{c.uprn}</td>
                <td>{c.name}</td>
                <td>{c.risk}</td>
                <td>
                  {c.completeness === 'high' && (
                    <span style={{ fontSize: '1em' }} title="High data completeness">🟢 High data completeness</span>
                  )}
                  {c.completeness === 'partial' && (
                    <span style={{ fontSize: '1em' }} title="Partial data">🟡 Partial data</span>
                  )}
                  {c.completeness === 'limited' && (
                    <span style={{ fontSize: '1em' }} title="Very limited data (CT only)">🔴 Very limited data (CT only)</span>
                  )}
                </td>
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
