import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  
  // Employee form fields
  const [employeeData, setEmployeeData] = useState({
    city: "",
    skills: [],
    workHistory: [{ company: "", position: "", duration: "", description: "" }],
    linkedinUrl: "",
    portfolioUrl: ""
  });
  const [currentSkill, setCurrentSkill] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Handle employee form field changes
  const handleEmployeeFieldChange = (field, value) => {
    setEmployeeData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, profileImage: "Please select a valid image file (JPEG, PNG, or GIF)" }));
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, profileImage: "Image size should be less than 5MB" }));
        return;
      }
      
      setProfileImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Clear any existing errors
      if (errors.profileImage) {
        setErrors(prev => ({ ...prev, profileImage: "" }));
      }
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
    // Clear the file input
    const fileInput = document.getElementById('profile-image-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Handle skills
  const addSkill = () => {
    if (currentSkill.trim() && !employeeData.skills.includes(currentSkill.trim())) {
      setEmployeeData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setEmployeeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  // Handle work history
  const addWorkHistory = () => {
    setEmployeeData(prev => ({
      ...prev,
      workHistory: [...prev.workHistory, { company: "", position: "", duration: "", description: "" }]
    }));
  };

  const removeWorkHistory = (index) => {
    setEmployeeData(prev => ({
      ...prev,
      workHistory: prev.workHistory.filter((_, i) => i !== index)
    }));
  };

  const updateWorkHistory = (index, field, value) => {
    setEmployeeData(prev => ({
      ...prev,
      workHistory: prev.workHistory.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
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
    if (!employeeData.city.trim()) {
      newErrors.city = "City/Location is required";
    }
    
    // Validate URLs if provided
    if (employeeData.linkedinUrl && !isValidUrl(employeeData.linkedinUrl)) {
      newErrors.linkedinUrl = "Please enter a valid LinkedIn URL";
    }
    
    if (employeeData.portfolioUrl && !isValidUrl(employeeData.portfolioUrl)) {
      newErrors.portfolioUrl = "Please enter a valid Portfolio URL";
    }
    
    // Check if at least one work history entry has company and position
    const hasValidWorkHistory = employeeData.workHistory.some(work => 
      work.company.trim() && work.position.trim()
    );
    
    if (!hasValidWorkHistory) {
      newErrors.workHistory = "Please add at least one work experience with company and position";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Store the data
    localStorage.setItem("employeeData", JSON.stringify(employeeData));
    
    if (profileImage) {
      console.log("Profile image selected:", profileImage.name, profileImage.size);
    }
    
    console.log("Employee data:", {
      city: employeeData.city,
      skills: employeeData.skills,
      workHistory: employeeData.workHistory,
      linkedinUrl: employeeData.linkedinUrl,
      portfolioUrl: employeeData.portfolioUrl,
      hasProfileImage: !!profileImage
    });
    
    alert(`Employee profile created successfully!\n\nCity: ${employeeData.city}\nSkills: ${employeeData.skills.join(', ')}\nWork Experience: ${employeeData.workHistory.length} entries\n\nNext page will be implemented next.`);
  };

  const handleBack = () => {
    navigate("/input-details");
  };

  // Icons
  const UserIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
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

  const MapPinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );

  const TagIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  );

  const BriefcaseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );

  const LinkIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );

  const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  );

  const MinusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
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
          <h1 className="title">Employee Details</h1>
          <p className="subtitle">Tell us more about your professional background</p>
        </div>

        {/* Main Card */}
        <div className="card">
          <div className="employee-form">
            <h3 className="form-section-title">Complete Your Profile</h3>
            
            {/* Profile Picture Upload */}
            <div className="field-container">
              <label className="label">
                Profile Picture <span className="optional-text">(Optional)</span>
              </label>
              <div className="image-upload-container">
                {profileImagePreview ? (
                  <div className="image-preview-container">
                    <img 
                      src={profileImagePreview} 
                      alt="Profile preview" 
                      className="profile-image-preview"
                    />
                    <button 
                      type="button"
                      onClick={removeImage}
                      className="remove-image-button"
                      title="Remove image"
                    >
                      <XIcon />
                    </button>
                  </div>
                ) : (
                  <div className="image-upload-placeholder">
                    <input
                      type="file"
                      id="profile-image-input"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="image-input-hidden"
                    />
                    <label htmlFor="profile-image-input" className="image-upload-label">
                      <CameraIcon />
                      <span>Upload Profile Picture</span>
                      <span className="upload-hint">JPEG, PNG, or GIF (Max 5MB)</span>
                    </label>
                  </div>
                )}
              </div>
              {errors.profileImage && (
                <div className="error-message slide-up">
                  ⚠️ {errors.profileImage}
                </div>
              )}
            </div>

            {/* City/Location Field */}
            <div className="field-container">
              <label className="label">City / Location</label>
              <div className="input-container">
                <div className="input-icon">
                  <MapPinIcon />
                </div>
                <input
                  type="text"
                  value={employeeData.city}
                  onChange={(e) => handleEmployeeFieldChange('city', e.target.value)}
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

            {/* Skills Field */}
            <div className="field-container">
              <label className="label">Skills</label>
              <div className="skills-container">
                <div className="input-container">
                  <div className="input-icon">
                    <TagIcon />
                  </div>
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyDown={handleSkillKeyPress}
                    className="input"
                    placeholder="Add a skill (e.g., Java, Marketing)"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="add-skill-button"
                    disabled={!currentSkill.trim()}
                  >
                    <PlusIcon />
                  </button>
                </div>
                {employeeData.skills.length > 0 && (
                  <div className="skills-list">
                    {employeeData.skills.map((skill, index) => (
                      <div key={index} className="skill-tag">
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="remove-skill-button"
                        >
                          <XIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Work History Field */}
            <div className="field-container">
              <label className="label">Work History</label>
              <div className="work-history-container">
                {employeeData.workHistory.map((work, index) => (
                  <div key={index} className="work-history-item">
                    <div className="work-history-header">
                      <div className="work-history-icon">
                        <BriefcaseIcon />
                      </div>
                      <h4 className="work-history-title">Experience {index + 1}</h4>
                      {employeeData.workHistory.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeWorkHistory(index)}
                          className="remove-work-button"
                        >
                          <MinusIcon />
                        </button>
                      )}
                    </div>

                    <div className="work-history-fields">
                      <div className="field-row">
                        <input
                          type="text"
                          value={work.company}
                          onChange={(e) => updateWorkHistory(index, 'company', e.target.value)}
                          className="input"
                          placeholder="Company name"
                        />
                        <input
                          type="text"
                          value={work.position}
                          onChange={(e) => updateWorkHistory(index, 'position', e.target.value)}
                          className="input"
                          placeholder="Position/Role"
                        />
                      </div>
                      <input
                        type="text"
                        value={work.duration}
                        onChange={(e) => updateWorkHistory(index, 'duration', e.target.value)}
                        className="input"
                        placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
                      />
                      <textarea
                        value={work.description}
                        onChange={(e) => updateWorkHistory(index, 'description', e.target.value)}
                        className="textarea"
                        placeholder="Job description and achievements"
                        rows="3"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addWorkHistory}
                  className="add-work-button"
                >
                  <PlusIcon />
                  <span>Add Another Experience</span>
                </button>
              </div>
              {errors.workHistory && (
                <div className="error-message slide-up">
                  ⚠️ {errors.workHistory}
                </div>
              )}
            </div>

            {/* LinkedIn/Portfolio Links */}
            <div className="field-container">
              <label className="label">
                LinkedIn/Portfolio Links <span className="optional-text">(Optional)</span>
              </label>

              <div className="links-container">
                <div className="input-container">
                  <div className="input-icon">
                    <LinkIcon />
                  </div>
                  <input
                    type="url"
                    value={employeeData.linkedinUrl}
                    onChange={(e) => handleEmployeeFieldChange('linkedinUrl', e.target.value)}
                    className={`input ${errors.linkedinUrl ? 'error' : ''}`}
                    placeholder="LinkedIn profile URL"
                  />
                </div>
                {errors.linkedinUrl && (
                  <div className="error-message slide-up">
                    ⚠️ {errors.linkedinUrl}
                  </div>
                )}

                <div className="input-container">
                  <div className="input-icon">
                    <LinkIcon />
                  </div>
                  <input
                    type="url"
                    value={employeeData.portfolioUrl}
                    onChange={(e) => handleEmployeeFieldChange('portfolioUrl', e.target.value)}
                    className={`input ${errors.portfolioUrl ? 'error' : ''}`}
                    placeholder="Portfolio/Website URL"
                  />
                </div>
                {errors.portfolioUrl && (
                  <div className="error-message slide-up">
                    ⚠️ {errors.portfolioUrl}
                  </div>
                )}
              </div>
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
              <span>Complete Profile</span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
