import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the dashboard heading on the home route', () => {
    window.history.pushState({}, '', '/');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /welcome to your dashboard/i })).toBeInTheDocument();
  });

  it('renders person details page when navigating directly', () => {
    window.history.pushState({}, '', '/person/1');
    render(<App />);
    expect(screen.getByRole('heading', { level: 2, name: /person details/i })).toBeInTheDocument();
  });
});
