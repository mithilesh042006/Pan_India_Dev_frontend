import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyDetails = () => {
  const navigate = useNavigate();
  
  // Company form fields
  const [companyData, setCompanyData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    industry: "",
    companySize: "",
    city: ""
  });
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Industry options
  const industryOptions = [
    "IT & Software",
    "Manufacturing",
    "Healthcare",
    "Finance & Banking",
    "Education",
    "Retail & E-commerce",
    "Construction",
    "Automotive",
    "Food & Beverage",
    "Real Estate",
    "Media & Entertainment",
    "Transportation & Logistics",
    "Energy & Utilities",
    "Consulting",
    "Non-Profit",
    "Government",
    "Other"
  ];

  // Company size options
  const companySizeOptions = [
    "1-10 employees",
    "11-50 employees", 
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees"
  ];

  // Handle company form field changes
  const handleCompanyFieldChange = (field, value) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Handle logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, companyLogo: "Please select a valid image file (JPEG, PNG, or GIF)" }));
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, companyLogo: "Image size should be less than 5MB" }));
        return;
      }
      
      setCompanyLogo(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Clear any existing errors
      if (errors.companyLogo) {
        setErrors(prev => ({ ...prev, companyLogo: "" }));
      }
    }
  };

  const removeLogo = () => {
    setCompanyLogo(null);
    setCompanyLogoPreview(null);
    // Clear the file input
    const fileInput = document.getElementById('company-logo-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Helper function to validate URLs
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!companyData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    
    if (!companyData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(companyData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!companyData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(companyData.password)) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!companyData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (companyData.password !== companyData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!companyData.industry) {
      newErrors.industry = "Please select an industry";
    }
    
    if (!companyData.companySize) {
      newErrors.companySize = "Please select company size";
    }
    
    if (!companyData.city.trim()) {
      newErrors.city = "City/Location is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Store the data
    localStorage.setItem("companyData", JSON.stringify(companyData));
    
    if (companyLogo) {
      console.log("Company logo selected:", companyLogo.name, companyLogo.size);
    }
    
    console.log("Company data:", {
      companyName: companyData.companyName,
      email: companyData.email,
      industry: companyData.industry,
      companySize: companyData.companySize,
      city: companyData.city,
      hasLogo: !!companyLogo
    });
    
    alert(`Company profile created successfully!\n\nCompany: ${companyData.companyName}\nIndustry: ${companyData.industry}\nSize: ${companyData.companySize}\nLocation: ${companyData.city}\n\nNext page will be implemented next.`);
  };

  const handleBack = () => {
    navigate("/input-details");
  };

  // Icons
  const BuildingIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 21h18"/>
      <path d="M5 21V7l8-4v18"/>
      <path d="M19 21V11l-6-4"/>
      <path d="M9 9v.01"/>
      <path d="M9 12v.01"/>
      <path d="M9 15v.01"/>
      <path d="M9 18v.01"/>
    </svg>
  );

  const CameraIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );

  const XIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );

  const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <circle cx="12" cy="16" r="1"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );

  const MapPinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );

  const EyeIcon = ({ show }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      {show ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </>
      )}
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
            <BuildingIcon />
          </div>
          <h1 className="title">Company Details</h1>
          <p className="subtitle">Set up your company profile</p>
        </div>

        {/* Main Card */}
        <div className="card">
          <div className="company-form">
            <h3 className="form-section-title">Company Information</h3>

            {/* Company Logo Upload */}
            <div className="field-container">
              <label className="label">
                Company Logo <span className="optional-text">(Optional)</span>
              </label>
              <div className="image-upload-container">
                {companyLogoPreview ? (
                  <div className="image-preview-container">
                    <img
                      src={companyLogoPreview}
                      alt="Company logo preview"
                      className="company-logo-preview"
                    />
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="remove-image-button"
                      title="Remove logo"
                    >
                      <XIcon />
                    </button>
                  </div>
                ) : (
                  <div className="image-upload-placeholder logo-placeholder">
                    <input
                      type="file"
                      id="company-logo-input"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="image-input-hidden"
                    />
                    <label htmlFor="company-logo-input" className="image-upload-label">
                      <CameraIcon />
                      <span>Upload Company Logo</span>
                      <span className="upload-hint">JPEG, PNG, or GIF (Max 5MB)</span>
                    </label>
                  </div>
                )}
              </div>
              {errors.companyLogo && (
                <div className="error-message slide-up">
                  ⚠️ {errors.companyLogo}
                </div>
              )}
            </div>

            {/* Company Name Field */}
            <div className="field-container">
              <label className="label">Company Name *</label>
              <div className="input-container">
                <div className="input-icon">
                  <BuildingIcon />
                </div>
                <input
                  type="text"
                  value={companyData.companyName}
                  onChange={(e) => handleCompanyFieldChange('companyName', e.target.value)}
                  className={`input ${errors.companyName ? 'error' : ''}`}
                  placeholder="Enter your company name"
                />
              </div>
              {errors.companyName && (
                <div className="error-message slide-up">
                  ⚠️ {errors.companyName}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="field-container">
              <label className="label">Email / Admin Contact *</label>
              <div className="input-container">
                <div className="input-icon">
                  <MailIcon />
                </div>
                <input
                  type="email"
                  value={companyData.email}
                  onChange={(e) => handleCompanyFieldChange('email', e.target.value)}
                  className={`input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter admin email address"
                />
              </div>
              {errors.email && (
                <div className="error-message slide-up">
                  ⚠️ {errors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="field-container">
              <label className="label">Password *</label>
              <div className="input-container">
                <div className="input-icon">
                  <LockIcon />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={companyData.password}
                  onChange={(e) => handleCompanyFieldChange('password', e.target.value)}
                  className={`input ${errors.password ? 'error' : ''}`}
                  placeholder="Create a secure password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-button"
                >
                  <EyeIcon show={!showPassword} />
                </button>
              </div>
              {errors.password && (
                <div className="error-message slide-up">
                  ⚠️ {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="field-container">
              <label className="label">Confirm Password *</label>
              <div className="input-container">
                <div className="input-icon">
                  <LockIcon />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={companyData.confirmPassword}
                  onChange={(e) => handleCompanyFieldChange('confirmPassword', e.target.value)}
                  className={`input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="eye-button"
                >
                  <EyeIcon show={!showConfirmPassword} />
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="error-message slide-up">
                  ⚠️ {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Industry Dropdown */}
            <div className="field-container">
              <label className="label">Industry *</label>
              <div className="select-container">
                <select
                  value={companyData.industry}
                  onChange={(e) => handleCompanyFieldChange('industry', e.target.value)}
                  className={`select ${errors.industry ? 'error' : ''}`}
                >
                  <option value="">Select your industry</option>
                  {industryOptions.map((industry, index) => (
                    <option key={index} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              {errors.industry && (
                <div className="error-message slide-up">
                  ⚠️ {errors.industry}
                </div>
              )}
            </div>

            {/* Company Size Dropdown */}
            <div className="field-container">
              <label className="label">Company Size *</label>
              <div className="select-container">
                <select
                  value={companyData.companySize}
                  onChange={(e) => handleCompanyFieldChange('companySize', e.target.value)}
                  className={`select ${errors.companySize ? 'error' : ''}`}
                >
                  <option value="">Select company size</option>
                  {companySizeOptions.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              {errors.companySize && (
                <div className="error-message slide-up">
                  ⚠️ {errors.companySize}
                </div>
              )}
            </div>

            {/* City/Location Field */}
            <div className="field-container">
              <label className="label">City / Location *</label>
              <div className="input-container">
                <div className="input-icon">
                  <MapPinIcon />
                </div>
                <input
                  type="text"
                  value={companyData.city}
                  onChange={(e) => handleCompanyFieldChange('city', e.target.value)}
                  className={`input ${errors.city ? 'error' : ''}`}
                  placeholder="Enter your city or location"
                />
              </div>
              {errors.city && (
                <div className="error-message slide-up">
                  ⚠️ {errors.city}
                </div>
              )}
            </div>
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
              onClick={handleSubmit}
              className="nav-button next-button"
            >
              <span>Create Company Profile</span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
