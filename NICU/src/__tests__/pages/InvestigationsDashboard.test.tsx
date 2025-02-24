import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { AuthProvider } from '../../context/AuthContext';
import InvestigationsDashboard from '../../pages/InvestigationsDashboard';

jest.mock('@tauri-apps/api', () => ({
  invoke: jest.fn().mockImplementation((cmd) => {
    switch (cmd) {
      case 'get_lab_results':
        return Promise.resolve([
          {
            id: '1',
            type: 'CBC',
            timestamp: '2024-02-24T10:00:00',
            values: {
              'WBC': 10.5,
              'RBC': 4.2,
              'HGB': 13.5
            }
          }
        ]);
      default:
        return Promise.resolve(null);
    }
  })
}));

const MockProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('InvestigationsDashboard', () => {
  it('renders without crashing', () => {
    render(
      <MockProviders>
        <InvestigationsDashboard />
      </MockProviders>
    );

    expect(screen.getByText('Investigations & Results')).toBeInTheDocument();
  });

  it('displays lab results when loaded', async () => {
    render(
      <MockProviders>
        <InvestigationsDashboard />
      </MockProviders>
    );

    await waitFor(() => {
      expect(screen.getByText('Laboratory Results')).toBeInTheDocument();
    });
  });
});