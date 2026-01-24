
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import PatientDashboard from './pages/patient/PatientDashboard';
import HealthProfile from './pages/patient/HealthProfile';
import Prescriptions from './pages/patient/Prescriptions';
import Consultations from './pages/patient/Consultations';
import MedicalReports from './pages/patient/MedicalReports';
import NutritionPlan from './pages/patient/NutritionPlan';
import DiseaseTracking from './pages/patient/DiseaseTracking';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

import PatientList from './pages/doctor/PatientList';
import PatientDetails from './pages/doctor/PatientDetails';
import PrescriptionEditor from './pages/doctor/PrescriptionEditor';
import DoctorConsultations from './pages/doctor/DoctorConsultations';

import UserManagement from './pages/admin/UserManagement';
import DepartmentManagement from './pages/admin/DepartmentManagement';
import AuditLogs from './pages/admin/AuditLogs';
import AISettings from './pages/admin/AISettings';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patient/health-profile" element={<HealthProfile />} />
            <Route path="/patient/prescriptions" element={<Prescriptions />} />
            <Route path="/patient/consultations" element={<Consultations />} />
            <Route path="/patient/reports" element={<MedicalReports />} />
            <Route path="/patient/nutrition" element={<NutritionPlan />} />
            <Route path="/patient/disease-tracking" element={<DiseaseTracking />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/patients" element={<PatientList />} />
            <Route path="/doctor/patients/:id" element={<PatientDetails />} />
            <Route path="/doctor/prescriptions" element={<PrescriptionEditor />} />
            <Route path="/doctor/consultations" element={<DoctorConsultations />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/departments" element={<DepartmentManagement />} />
            <Route path="/admin/audit-logs" element={<AuditLogs />} />
            <Route path="/admin/ai-settings" element={<AISettings />} />

            {/* Shared Route */}
            <Route path="/settings" element={<SettingsPage />} />

            {/* Redirect root to login for now */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
