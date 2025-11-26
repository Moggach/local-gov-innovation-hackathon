import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { cases } from './data/cases';

type PersonDetails = {
  dob: string;
  address: string;
  contact: string;
  history: string[];
  riskFactors: string[];
};

// Dummy details for demo purposes
const detailsById: Record<number, PersonDetails> = {
  1: {
    dob: '12/03/1980',
    address: '123 Example Street, Sittingbourne',
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
    address: '45 Example Road, Faversham',
    contact: 'jane.doe@email.com, 07987 654321',
    history: [
      '10/05/2025: Contacted Council Tax Team',
      '20/06/2025: Attended Debt Advice Session',
    ],
    riskFactors: ['Council tax debt', 'Single parent'],
  },
  3: {
    dob: '03/11/1990',
    address: '78 Example Avenue, Sheerness',
    contact: 'sam.lee@email.com, 07812 345678',
    history: [
      '05/04/2025: Universal Credit application',
    ],
    riskFactors: ['Universal Credit delay', 'Young adult'],
  },
  4: {
    dob: '30/01/1985',
    address: '9 Example Close, Sittingbourne',
    contact: 'alex.green@email.com, 07777 888999',
    history: [
      '12/09/2025: Received Eviction Notice',
      '18/09/2025: Contacted Housing Advice Service',
    ],
    riskFactors: ['Eviction notice', 'Private renter'],
  },
  5: {
    dob: '14/02/1982',
    address: '22 High Street, Faversham',
    contact: 'maria.white@email.com, 07111 222333',
    history: [
      '03/03/2025: Benefit cap applied',
      '10/04/2025: Requested hardship payment',
    ],
    riskFactors: ['Benefit cap', 'Single parent'],
  },
  6: {
    dob: '09/09/1978',
    address: '5 Park Lane, Sheerness',
    contact: 'tom.black@email.com, 07222 333444',
    history: [
      '15/05/2025: ASB complaint filed',
    ],
    riskFactors: ['ASB complaint', 'Social housing tenant'],
  },
  7: {
    dob: '27/07/1987',
    address: '33 Mill Road, Sittingbourne',
    contact: 'lucy.brown@email.com, 07333 444555',
    history: [
      '20/06/2025: Reported domestic violence',
      '25/06/2025: Moved to temporary accommodation',
    ],
    riskFactors: ['Domestic violence', 'Family breakdown'],
  },
  8: {
    dob: '18/12/1983',
    address: '7 Church Street, Faversham',
    contact: 'peter.gray@email.com, 07444 555666',
    history: [
      '01/07/2025: Rent increase notice',
    ],
    riskFactors: ['Rent increase', 'Private renter'],
  },
  9: {
    dob: '05/05/1992',
    address: '19 Queen Street, Sheerness',
    contact: 'nina.patel@email.com, 07555 666777',
    history: [
      '10/08/2025: Council tax reminder sent',
    ],
    riskFactors: ['Council tax reminder', 'Young adult'],
  },
  10: {
    dob: '11/11/1980',
    address: '2 Station Road, Sittingbourne',
    contact: 'omar.khan@email.com, 07666 777888',
    history: [
      '15/09/2025: Received eviction threat',
      '20/09/2025: Contacted Housing Advice Service',
    ],
    riskFactors: ['Eviction threat', 'Private renter'],
  },
  11: {
    dob: '23/03/1986',
    address: '8 Market Street, Faversham',
    contact: 'sophie.evans@email.com, 07777 888999',
    history: [
      '05/10/2025: Universal Credit sanction',
    ],
    riskFactors: ['Universal Credit sanction', 'Single adult household'],
  },
  12: {
    dob: '16/06/1991',
    address: '14 Bridge Road, Sheerness',
    contact: 'ben.turner@email.com, 07888 999000',
    history: [
      '22/07/2025: Missed rent payment',
    ],
    riskFactors: ['Missed rent payment', 'Young adult'],
  },
  13: {
    dob: '29/04/1984',
    address: '21 Grove Avenue, Sittingbourne',
    contact: 'chloe.adams@email.com, 07999 000111',
    history: [
      '30/08/2025: Family breakdown reported',
    ],
    riskFactors: ['Family breakdown', 'Single parent'],
  },
  14: {
    dob: '07/07/1979',
    address: '3 School Lane, Faversham',
    contact: 'raj.singh@email.com, 07000 111222',
    history: [
      '12/09/2025: Council tax debt letter',
    ],
    riskFactors: ['Council tax debt', 'Social housing tenant'],
  },
  15: {
    dob: '25/12/1993',
    address: '17 Park Avenue, Sheerness',
    contact: 'ella.king@email.com, 07123 222333',
    history: [
      '02/10/2025: Universal Credit delay',
    ],
    riskFactors: ['Universal Credit delay', 'Young adult'],
  },
};

export default function PersonPage() {
  const { id } = useParams();
  const personId = Number(id);
  // cases imported from data/cases
  const person = cases.find(c => c.id === personId);
  const details = detailsById[personId];


  const [caseNotes, setCaseNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState('');

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
      <section className="person-section">
        <h3 className="person-section-title">Case Notes</h3>
        <textarea
          value={caseNotes}
          onChange={e => setCaseNotes(e.target.value)}
          placeholder="Enter case notes..."
          style={{ width: '100%', minHeight: '80px', fontSize: '1.08em', padding: '0.8em', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '0.7em' }}
        />
        <button
          type="button"
          onClick={() => setSavedNotes(caseNotes)}
          style={{ padding: '0.6em 1.4em', borderRadius: '6px', background: '#234', color: '#fff', fontWeight: 500, fontSize: '1em', border: 'none', cursor: 'pointer', marginBottom: '1em' }}
        >
          Save Notes
        </button>
        {savedNotes && (
          <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '0.8em', marginTop: '0.5em', color: '#234' }}>
            <div style={{ marginTop: '0.5em', whiteSpace: 'pre-wrap' }}>{savedNotes}</div>
          </div>
        )}
      </section>
      <nav className="person-nav">
        <Link to="/" className="back-link">Back to dashboard</Link>
      </nav>
    </main>
  );
}
