import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const newErrors = { ...errors };
    
    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }
    }
    
    if (name === 'password' && value) {
      if (!validatePassword(value)) {
        newErrors.password = "Password must be at least 8 characters";
      } else {
        delete newErrors.password;
      }
    }
    
    if (name === 'confirmPassword' && value && !isLogin) {
      if (value !== form.password) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    }
    
    setErrors(newErrors);
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate all fields
    const newErrors = {};
    
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(form.password)) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!isLogin) {
      if (!form.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(`${isLogin ? "Login" : "Registration"} successful!`);
      setErrors({});
      // Reset form after success
      setTimeout(() => {
        setForm({ email: "", password: "", confirmPassword: "" });
        setSuccess("");
      }, 2000);
    }, 1500);
  };

  const toggleMode = (loginMode) => {
    setIsLogin(loginMode);
    setErrors({});
    setSuccess("");
    setForm({ email: "", password: "", confirmPassword: "" });
  };

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

  const UserIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
  );

  const LoadingSpinner = () => (
    <svg width="20" height="20" viewBox="0 0 50 50" style={{animation: 'spin 1s linear infinite'}}>
      <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416" style={{animation: 'dash 2s ease-in-out infinite'}}/>
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
          <h1 className="title">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="subtitle">
            {isLogin ? "Sign in to your account" : "Join us today"}
          </p>
        </div>

        {/* Main Card */}
        <div className="card">
          {/* Toggle Buttons */}
          <div className="toggle-container">
            <button
              className={`toggle-button ${isLogin ? 'active' : ''}`}
              onClick={() => toggleMode(true)}
            >
              Login
            </button>
            <button
              className={`toggle-button ${!isLogin ? 'active' : ''}`}
              onClick={() => toggleMode(false)}
            >
              Register
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="success-message slide-up">
              <CheckIcon />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <div className="form">
            {/* Email Field */}
            <div className="field-container">
              <label className="label">Email</label>
              <div className="input-container">
                <div className="input-icon">
                  <MailIcon />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  autoComplete="username"
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
              <label className="label">Password</label>
              <div className="input-container">
                <div className="input-icon">
                  <LockIcon />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
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
            {!isLogin && (
              <div className="field-container">
                <label className="label">Confirm Password</label>
                <div className="input-container">
                  <div className="input-icon">
                    <LockIcon />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
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
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? (
                <div className="loading-container">
                  <LoadingSpinner />
                  <span>Processing...</span>
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="footer">
            <p className="footer-text">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => toggleMode(!isLogin)}
                className="footer-link"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;