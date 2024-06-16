// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import SuperAdminDashboard from './SuperAdminDashboard';
import ResidenteDashboard from './ResidenteDashboard';
import PorteroDashboard from './PorteroDashboard';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <ProtectedRoute path="/super-admin" component={SuperAdminDashboard} role={1} />
                    <ProtectedRoute path="/residente" component={ResidenteDashboard} role={2} />
                    <ProtectedRoute path="/portero" component={PorteroDashboard} role={3} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
