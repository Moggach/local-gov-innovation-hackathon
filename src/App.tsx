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
  { id: 5, reference: 'CASE-005', uprn: '100010005', name: 'Maria White', risk: 'Medium', details: 'Benefit cap', probability: 55, completeness: 'partial' },
  { id: 6, reference: 'CASE-006', uprn: '100010006', name: 'Tom Black', risk: 'Low', details: 'ASB complaint', probability: 15, completeness: 'limited' },
  { id: 7, reference: 'CASE-007', uprn: '100010007', name: 'Lucy Brown', risk: 'High', details: 'Domestic violence', probability: 85, completeness: 'high' },
  { id: 8, reference: 'CASE-008', uprn: '100010008', name: 'Peter Gray', risk: 'Medium', details: 'Rent increase', probability: 50, completeness: 'partial' },
  { id: 9, reference: 'CASE-009', uprn: '100010009', name: 'Nina Patel', risk: 'Low', details: 'Council tax reminder', probability: 25, completeness: 'limited' },
  { id: 10, reference: 'CASE-010', uprn: '100010010', name: 'Omar Khan', risk: 'High', details: 'Eviction threat', probability: 92, completeness: 'high' },
  { id: 11, reference: 'CASE-011', uprn: '100010011', name: 'Sophie Evans', risk: 'Medium', details: 'Universal Credit sanction', probability: 65, completeness: 'partial' },
  { id: 12, reference: 'CASE-012', uprn: '100010012', name: 'Ben Turner', risk: 'Low', details: 'Missed rent payment', probability: 30, completeness: 'limited' },
  { id: 13, reference: 'CASE-013', uprn: '100010013', name: 'Chloe Adams', risk: 'High', details: 'Family breakdown', probability: 88, completeness: 'high' },
  { id: 14, reference: 'CASE-014', uprn: '100010014', name: 'Raj Singh', risk: 'Medium', details: 'Council tax debt', probability: 58, completeness: 'partial' },
  { id: 15, reference: 'CASE-015', uprn: '100010015', name: 'Ella King', risk: 'Low', details: 'Universal Credit delay', probability: 18, completeness: 'limited' },
];


const hotspots = [
  { id: 1, name: 'Sittingbourne', lat: 51.3413, lng: 0.7312, count: 12 },
  { id: 2, name: 'Swale House', lat: 51.3385, lng: 0.7350, count: 7 }, // moved south-east
  { id: 3, name: 'Milton Regis', lat: 51.3465, lng: 0.7250, count: 5 }, // moved north-west
  { id: 4, name: 'Kemsley', lat: 51.3570, lng: 0.7310, count: 4 },
  { id: 5, name: 'Murston', lat: 51.3390, lng: 0.7430, count: 3 },
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
