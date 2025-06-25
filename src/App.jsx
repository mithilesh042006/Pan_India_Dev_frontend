import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth_page';
import InputDetails from './pages/input_details';
import EmployeeDetails from './pages/employee_details';
import CompanyDetails from './pages/company_details';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/input-details" element={<InputDetails />} />
        <Route path="/employee-details" element={<EmployeeDetails />} />
        <Route path="/company-details" element={<CompanyDetails />} />
      </Routes>
    </Router>
  );
}

export default App
