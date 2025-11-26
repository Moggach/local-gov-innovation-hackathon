import './App.css';
import MapHotspots from './MapHotspots';
import PersonPage from './PersonPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { cases } from './data/cases';


const hotspots = [
  { id: 1, name: 'Sittingbourne', lat: 51.3413, lng: 0.7312, count: 12 },
  { id: 2, name: 'Swale House', lat: 51.3385, lng: 0.7350, count: 7 }, 
  { id: 3, name: 'Milton Regis', lat: 51.3465, lng: 0.7250, count: 5 }, 
  { id: 4, name: 'Kemsley', lat: 51.3570, lng: 0.7310, count: 4 },
  { id: 5, name: 'Murston', lat: 51.3390, lng: 0.7430, count: 3 },
];

import { useState } from 'react';

function Dashboard() {
  const [riskFilter, setRiskFilter] = useState('All');
  const [riskOverrides, setRiskOverrides] = useState<Record<number, string>>({});
  const filteredCases = riskFilter === 'All' ? cases : cases.filter(c => (riskOverrides[c.id] || c.risk) === riskFilter);

  const handleRiskChange = (id: number, value: string) => {
    setRiskOverrides(prev => ({ ...prev, [id]: value }));
  };

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
        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="risk-filter" style={{ fontWeight: 500, marginRight: '0.7em' }}>Filter by risk:</label>
          <select
            id="risk-filter"
            value={riskFilter}
            onChange={e => setRiskFilter(e.target.value)}
            style={{ padding: '0.5em 1em', borderRadius: '6px', fontSize: '1em' }}
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
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
            {filteredCases.map((c) => (
              <tr key={c.id} className={`risk-${(riskOverrides[c.id] || c.risk).toLowerCase()}`}>
                <td>
                  <Link to={`/person/${c.id}`} className="case-link">{c.reference}</Link>
                </td>
                <td>{c.uprn}</td>
                <td>{c.name}</td>
                <td>
                  <span style={{ fontWeight: riskOverrides[c.id] ? 600 : 400 }}>
                    {riskOverrides[c.id] ? `${riskOverrides[c.id]} (manual override)` : c.risk}
                  </span>
                  <div style={{ marginTop: '0.5em' }}>
                    <label htmlFor={`risk-override-${c.id}`} style={{ fontWeight: 500, marginRight: '0.7em' }}>Override risk:</label>
                    <select
                      id={`risk-override-${c.id}`}
                      value={riskOverrides[c.id] || c.risk}
                      onChange={e => handleRiskChange(c.id, e.target.value)}
                      style={{ padding: '0.4em 1em', borderRadius: '6px', fontSize: '1em', marginRight: '0.7em' }}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </td>
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
