import './App.css';
import MapHotspots from './MapHotspots';

// Mock data for cases
const cases = [
  { id: 1, name: 'John Smith', risk: 'High', details: 'Rent arrears' },
  { id: 2, name: 'Jane Doe', risk: 'Medium', details: 'Council tax debt' },
  { id: 3, name: 'Sam Lee', risk: 'Low', details: 'Universal Credit delay' },
  { id: 4, name: 'Alex Green', risk: 'High', details: 'Eviction notice' },
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
      <h1>Local Authority Dashboard</h1>
      <section className="cases-section">
        <h2>Cases</h2>
        <table className="cases-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Risk Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className={`risk-${c.risk.toLowerCase()}`}>
                <td>{c.name}</td>
                <td>{c.risk}</td>
                <td>{c.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="map-section">
        <h2>Financial Difficulty Hotspots</h2>
        <MapHotspots hotspots={hotspots} />
      </section>
    </div>
  );
}

export default App
