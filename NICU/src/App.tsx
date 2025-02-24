import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from './theme/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/Auth/RequireAuth';
import Login from './components/Auth/Login';
import ErrorBoundary from './components/ErrorBoundary';

// Default route components
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Unauthorized = React.lazy(() => import('./pages/Unauthorized'));
const InvestigationsDashboard = React.lazy(() => import('./pages/InvestigationsDashboard'));
const Navigation = React.lazy(() => import('./components/Navigation/Navigation'));

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Box sx={{ display: 'flex' }}>
              <Suspense fallback={<LoadingFallback />}>
                <Navigation />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route 
                      path="/unauthorized" 
                      element={
                        <Suspense fallback={<LoadingFallback />}>
                          <Unauthorized />
                        </Suspense>
                      } 
                    />
                    <Route
                      path="/"
                      element={
                        <RequireAuth>
                          <Suspense fallback={<LoadingFallback />}>
                            <Dashboard />
                          </Suspense>
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="/investigations"
                      element={
                        <RequireAuth allowedRoles={['doctor', 'nurse']}>
                          <Suspense fallback={<LoadingFallback />}>
                            <InvestigationsDashboard />
                          </Suspense>
                        </RequireAuth>
                      }
                    />
                  </Routes>
                </Box>
              </Suspense>
            </Box>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;