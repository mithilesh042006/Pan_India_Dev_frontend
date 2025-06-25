import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputDetails = () => {
  const [selectedUserType, setSelectedUserType] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType);
    // Clear any existing errors when user makes a selection
    if (errors.userType) {
      setErrors(prev => ({ ...prev, userType: "" }));
    }
  };

  const handleNext = () => {
    if (!selectedUserType) {
      setErrors({ userType: "Please select whether you are an Employee or Company" });
      return;
    }

    // Store the selected user type
    localStorage.setItem("userType", selectedUserType);

    // Navigate based on user type
    if (selectedUserType === 'employee') {
      navigate("/employee-details");
    } else if (selectedUserType === 'company') {
      navigate("/company-details");
    }
  };

  const handleBack = () => {
    // Navigate back to the authentication page
    navigate("/");
  };

  // Icons
  const UserIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const EmployeeIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const CompanyIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21h18"/>
      <path d="M5 21V7l8-4v18"/>
      <path d="M19 21V11l-6-4"/>
      <path d="M9 9v.01"/>
      <path d="M9 12v.01"/>
      <path d="M9 15v.01"/>
      <path d="M9 18v.01"/>
    </svg>
  );

  const ArrowLeftIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5"/>
      <path d="M12 19l-7-7 7-7"/>
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14"/>
      <path d="M12 5l7 7-7 7"/>
    </svg>
  );



  return (
    <div className="container">
      <div className="wrapper">
        {/* Header */}
        <div className="header">
          <div className="icon-container">
            <UserIcon />
          </div>
          <h1 className="title">Tell Us About Yourself</h1>
          <p className="subtitle">Are you an employee or a company?</p>
        </div>

        {/* Main Card */}
        <div className="card">
          <div className="user-type-selection">
            <h2 className="selection-title">I am a...</h2>

            {/* User Type Options */}
            <div className="user-type-options">
              <div
                className={`user-type-card ${selectedUserType === 'employee' ? 'selected' : ''}`}
                onClick={() => handleUserTypeSelect('employee')}
              >
                <div className="user-type-icon">
                  <EmployeeIcon />
                </div>
                <h3 className="user-type-title">Employee</h3>
                <p className="user-type-description">
                  I work for a company and want to rate my workplace experience
                </p>
              </div>

              <div
                className={`user-type-card ${selectedUserType === 'company' ? 'selected' : ''}`}
                onClick={() => handleUserTypeSelect('company')}
              >
                <div className="user-type-icon">
                  <CompanyIcon />
                </div>
                <h3 className="user-type-title">Company</h3>
                <p className="user-type-description">
                  I represent a company and want to rate my employees
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errors.userType && (
              <div className="error-message slide-up">
                ⚠️ {errors.userType}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            <button
              onClick={handleBack}
              className="nav-button back-button"
            >
              <ArrowLeftIcon />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="nav-button next-button"
              disabled={!selectedUserType}
            >
              <span>Next</span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputDetails;