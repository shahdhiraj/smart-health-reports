
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HealthProvider } from './context/HealthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PatientDashboard from './pages/patient/PatientDashboard';
import HealthProfile from './pages/patient/HealthProfile';
import Prescriptions from './pages/patient/Prescriptions';
import Consultations from './pages/patient/Consultations';
import MedicalReports from './pages/patient/MedicalReports';
import NutritionPlan from './pages/patient/NutritionPlan';
import DiseaseTracking from './pages/patient/DiseaseTracking';
import MenstruationCycle from './pages/patient/MenstruationCycle';
import Timeline from './pages/patient/Timeline';
import FamilyHealth from './pages/patient/FamilyHealth';
import PrivacySettings from './pages/patient/PrivacySettings';
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

// HMS Modules
import PharmacyDashboard from './pages/pharmacy/PharmacyDashboard';
import LabDashboard from './pages/laboratory/LabDashboard';
import BillingDashboard from './pages/billing/BillingDashboard';

// Shared Components
import LiveConsultation from './pages/shared/LiveConsultation';

function App() {
  return (
    <AuthProvider>
      <HealthProvider>
        <Router>
          <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage />} />

          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patient/health-profile" element={<HealthProfile />} />
            <Route path="/patient/prescriptions" element={<Prescriptions />} />
            <Route path="/patient/consultations" element={<Consultations />} />
            <Route path="/patient/reports" element={<MedicalReports />} />
            <Route path="/patient/nutrition" element={<NutritionPlan />} />
            <Route path="/patient/disease-tracking" element={<DiseaseTracking />} />
            <Route path="/patient/menstruation-cycle" element={<MenstruationCycle />} />
            <Route path="/patient/timeline" element={<Timeline />} />
            <Route path="/patient/family" element={<FamilyHealth />} />
            <Route path="/patient/privacy" element={<PrivacySettings />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/dashboard" element={<Navigate to="/doctor" replace />} />
            <Route path="/doctor/patients" element={<PatientList />} />
            <Route path="/doctor/patients/:id" element={<PatientDetails />} />
            <Route path="/doctor/prescriptions" element={<PrescriptionEditor />} />
            <Route path="/doctor/consultations" element={<DoctorConsultations />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/departments" element={<DepartmentManagement />} />
            <Route path="/admin/audit-logs" element={<AuditLogs />} />
            <Route path="/admin/ai-settings" element={<AISettings />} />

            {/* HMS Module Routes */}
            <Route path="/pharmacy" element={<PharmacyDashboard />} />
            <Route path="/pharmacy/prescriptions" element={<PharmacyDashboard />} />
            <Route path="/pharmacy/inventory" element={<PharmacyDashboard />} />
            
            <Route path="/laboratory" element={<LabDashboard />} />
            <Route path="/laboratory/orders" element={<LabDashboard />} />
            <Route path="/laboratory/results" element={<LabDashboard />} />

            <Route path="/billing" element={<BillingDashboard />} />
            <Route path="/billing/invoices" element={<BillingDashboard />} />
            <Route path="/billing/reports" element={<BillingDashboard />} />

            <Route path="/live-consultation" element={<LiveConsultation />} />

            {/* Shared Route */}
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
      </HealthProvider>
    </AuthProvider>
  );
}

export default App;
