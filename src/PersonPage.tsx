import { Link, useParams } from 'react-router-dom';

// Dummy details for demo purposes
import './PersonPage.css';
const detailsById: Record<number, any> = {
  1: {
    dob: '12/03/1980',
    address: '123 Example Street, Birmingham',
    contact: 'john.smith@email.com, 07123 456789',
    history: [
      '01/06/2025: Contacted Housing Advice Service',
      '15/07/2025: Attended Financial Support Workshop',
      '02/09/2025: Received Council Tax Debt Letter',
    ],
    riskFactors: ['Rent arrears', 'Single adult household', 'Recent job loss'],
  },
  2: {
    dob: '22/08/1975',
    address: '45 Example Road, Birmingham',
    contact: 'jane.doe@email.com, 07987 654321',
    history: [
      '10/05/2025: Contacted Council Tax Team',
      '20/06/2025: Attended Debt Advice Session',
    ],
    riskFactors: ['Council tax debt', 'Single parent'],
  },
  3: {
    dob: '03/11/1990',
    address: '78 Example Avenue, Birmingham',
    contact: 'sam.lee@email.com, 07812 345678',
    history: [
      '05/04/2025: Universal Credit application',
    ],
    riskFactors: ['Universal Credit delay', 'Young adult'],
  },
  4: {
    dob: '30/01/1985',
    address: '9 Example Close, Birmingham',
    contact: 'alex.green@email.com, 07777 888999',
    history: [
      '12/09/2025: Received Eviction Notice',
      '18/09/2025: Contacted Housing Advice Service',
    ],
    riskFactors: ['Eviction notice', 'Private renter'],
  },
};

export default function PersonPage() {
  const { id } = useParams();
  const personId = Number(id);
  const cases = [
    { id: 1, reference: 'CASE-001', uprn: '100010001', name: 'John Smith', risk: 'High', details: 'Rent arrears', probability: 90, completeness: 'high' },
    { id: 2, reference: 'CASE-002', uprn: '100010002', name: 'Jane Doe', risk: 'Medium', details: 'Council tax debt', probability: 60, completeness: 'partial' },
    { id: 3, reference: 'CASE-003', uprn: '100010003', name: 'Sam Lee', risk: 'Low', details: 'Universal Credit delay', probability: 20, completeness: 'limited' },
    { id: 4, reference: 'CASE-004', uprn: '100010004', name: 'Alex Green', risk: 'High', details: 'Eviction notice', probability: 80, completeness: 'high' },
  ];
  const person = cases.find(c => c.id === personId);
  const details = detailsById[personId];

  if (!person || !details) {
    return (
      <main className="person-page">
        <h2 className="person-title">Person Not Found</h2>
        <Link to="/" className="back-link">Back to dashboard</Link>
      </main>
    );
  }

  return (
      <main className="person-page">
        <header className="person-header">
          <h2 className="person-title">Person Details</h2>
        </header>
        <section className="person-section">
          <h3 className="person-section-title">Personal Details</h3>
          <dl className="person-details-list">
            <div><dt>Name</dt><dd>{person.name}</dd></div>
            <div><dt>Case Reference</dt><dd>{person.reference}</dd></div>
            <div><dt>UPRN</dt><dd>{person.uprn}</dd></div>
            <div><dt>Data Completeness</dt><dd>{person.completeness === 'high' && <span title="High data completeness">🟢 High data completeness</span>}{person.completeness === 'partial' && <span title="Partial data">🟡 Partial data</span>}{person.completeness === 'limited' && <span title="Very limited data (CT only)">🔴 Very limited data (CT only)</span>}</dd></div>
            <div><dt>Date of Birth</dt><dd>{details.dob}</dd></div>
            <div><dt>Address</dt><dd>{details.address}</dd></div>
            <div><dt>Contact</dt><dd>{details.contact}</dd></div>
          </dl>
        </section>
        <section className="person-section">
          <h3 className="person-section-title">Service Interaction History</h3>
          <ul className="person-list">
            {details.history.map((h: string, idx: number) => <li key={idx}>{h}</li>)}
          </ul>
        </section>
        <section className="person-section">
          <h3 className="person-section-title">Risk Factors</h3>
          <ul className="person-list">
            {details.riskFactors.map((r: string, idx: number) => <li key={idx}>{r}</li>)}
          </ul>
        </section>
        <section className="person-section">
          <h3 className="person-section-title">Model Probability of Homelessness (6mo)</h3>
          <p className="person-probability"><strong>{person.probability}%</strong></p>
        </section>
        <nav className="person-nav">
          <Link to="/" className="back-link">Back to dashboard</Link>
        </nav>
      </main>
  );
}
