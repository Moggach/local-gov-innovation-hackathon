import { Link, useParams } from 'react-router-dom';

// Dummy details for demo purposes
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
  // Cases array must be imported from App
  const cases = [
    { id: 1, name: 'John Smith', risk: 'High', details: 'Rent arrears', probability: 90 },
    { id: 2, name: 'Jane Doe', risk: 'Medium', details: 'Council tax debt', probability: 60 },
    { id: 3, name: 'Sam Lee', risk: 'Low', details: 'Universal Credit delay', probability: 20 },
    { id: 4, name: 'Alex Green', risk: 'High', details: 'Eviction notice', probability: 80 },
  ];
  const person = cases.find(c => c.id === personId);
  const details = detailsById[personId];

  if (!person || !details) {
    return (
      <div className="person-page" style={{ padding: '3em', maxWidth: '700px', margin: '0 auto', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <h2>Person Not Found</h2>
        <Link to="/">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="person-page" style={{ padding: '3em', maxWidth: '700px', margin: '0 auto', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <h2>Person Details</h2>
      <section style={{ marginBottom: '2em' }}>
        <h3>Personal Details</h3>
        <ul>
          <li><strong>Name:</strong> {person.name}</li>
          <li><strong>Date of Birth:</strong> {details.dob}</li>
          <li><strong>Address:</strong> {details.address}</li>
          <li><strong>Contact:</strong> {details.contact}</li>
        </ul>
      </section>
      <section style={{ marginBottom: '2em' }}>
        <h3>Service Interaction History</h3>
        <ul>
          {details.history.map((h: string, idx: number) => <li key={idx}>{h}</li>)}
        </ul>
      </section>
      <section style={{ marginBottom: '2em' }}>
        <h3>Risk Factors</h3>
        <ul>
          {details.riskFactors.map((r: string, idx: number) => <li key={idx}>{r}</li>)}
        </ul>
      </section>
      <section style={{ marginBottom: '2em' }}>
        <h3>Model Probability of Homelessness (6mo)</h3>
        <p><strong>{person.probability}%</strong></p>
      </section>
      <Link to="/">Back to dashboard</Link>
    </div>
  );
}
