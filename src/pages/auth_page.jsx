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
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes dash {
            0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
            50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
            100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .slide-up { animation: slideUp 0.3s ease-out; }
        `}
      </style>
      
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <UserIcon />
          </div>
          <h1 style={styles.title}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p style={styles.subtitle}>
            {isLogin ? "Sign in to your account" : "Join us today"}
          </p>
        </div>

        {/* Main Card */}
        <div style={styles.card}>
          {/* Toggle Buttons */}
          <div style={styles.toggleContainer}>
            <button
              style={{
                ...styles.toggleButton,
                ...(isLogin ? styles.activeToggle : {})
              }}
              onClick={() => toggleMode(true)}
            >
              Login
            </button>
            <button
              style={{
                ...styles.toggleButton,
                ...(!isLogin ? styles.activeToggle : {})
              }}
              onClick={() => toggleMode(false)}
            >
              Register
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div style={styles.successMessage} className="slide-up">
              <CheckIcon />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <div style={styles.form}>
            {/* Email Field */}
            <div style={styles.fieldContainer}>
              <label style={styles.label}>Email</label>
              <div style={styles.inputContainer}>
                <div style={styles.inputIcon}>
                  <MailIcon />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {})
                  }}
                  placeholder="Enter your email"
                  autoComplete="username"
                />
              </div>
              {errors.email && (
                <div style={styles.errorMessage} className="slide-up">
                  ⚠️ {errors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div style={styles.fieldContainer}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputContainer}>
                <div style={styles.inputIcon}>
                  <LockIcon />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {})
                  }}
                  placeholder="Enter your password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <EyeIcon show={!showPassword} />
                </button>
              </div>
              {errors.password && (
                <div style={styles.errorMessage} className="slide-up">
                  ⚠️ {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            {!isLogin && (
              <div style={styles.fieldContainer}>
                <label style={styles.label}>Confirm Password</label>
                <div style={styles.inputContainer}>
                  <div style={styles.inputIcon}>
                    <LockIcon />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    style={{
                      ...styles.input,
                      ...(errors.confirmPassword ? styles.inputError : {})
                    }}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                  >
                    <EyeIcon show={!showConfirmPassword} />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div style={styles.errorMessage} className="slide-up">
                    ⚠️ {errors.confirmPassword}
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonDisabled : {})
              }}
            >
              {isLoading ? (
                <div style={styles.loadingContainer}>
                  <LoadingSpinner />
                  <span>Processing...</span>
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => toggleMode(!isLogin)}
                style={styles.footerLink}
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

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  wrapper: {
    width: "100%",
    maxWidth: "420px"
  },
  header: {
    textAlign: "center",
    marginBottom: "32px"
  },
  iconContainer: {
    width: "64px",
    height: "64px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px auto",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    color: "white"
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "white",
    margin: "0 0 8px 0"
  },
  subtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "16px",
    margin: "0"
  },
  card: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "32px"
  },
  toggleContainer: {
    display: "flex",
    background: "#f5f5f5",
    borderRadius: "12px",
    padding: "4px",
    marginBottom: "32px"
  },
  toggleButton: {
    flex: 1,
    padding: "12px 16px",
    background: "none",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#666",
    cursor: "pointer",
    transition: "all 0.3s ease",
    outline: "none"
  },
  activeToggle: {
    background: "white",
    color: "#667eea",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  successMessage: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#f0f9ff",
    border: "1px solid #bae6fd",
    color: "#0369a1",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "24px",
    fontWeight: "500"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "4px"
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },
  inputIcon: {
    position: "absolute",
    left: "12px",
    color: "#9ca3af",
    zIndex: 1,
    display: "flex",
    alignItems: "center"
  },
  input: {
    width: "100%",
    padding: "14px 16px 14px 44px",
    fontSize: "16px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.2s ease",
    background: "white",
    boxSizing: "border-box"
  },
  inputError: {
    borderColor: "#ef4444",
    background: "#fef2f2"
  },
  eyeButton: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "4px",
    transition: "color 0.2s ease",
    outline: "none"
  },
  errorMessage: {
    color: "#dc2626",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  submitButton: {
    width: "100%",
    padding: "14px 0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 16px rgba(102, 126, 234, 0.4)",
    outline: "none",
    marginTop: "8px"
  },
  submitButtonDisabled: {
    background: "#9ca3af",
    cursor: "not-allowed",
    boxShadow: "none"
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  footer: {
    textAlign: "center",
    marginTop: "24px"
  },
  footerText: {
    color: "#6b7280",
    fontSize: "14px",
    margin: 0
  },
  footerLink: {
    color: "#667eea",
    background: "none",
    border: "none",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
    outline: "none"
  }
};

export default AuthPage;