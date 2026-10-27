import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function RegisterPage() {
  const { loginUser } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Farmer",
    preferredLanguage: "English",
    state: "Tamil Nadu",
    district: "Coimbatore",
    village: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const districtsByState = {
    "Tamil Nadu": ["Coimbatore", "Thanjavur", "Madurai", "Tiruchirappalli", "Salem", "Erode", "Dindigul"],
    "Maharashtra": ["Nashik", "Pune", "Ahmednagar", "Solapur", "Satara", "Kolhapur", "Aurangabad"]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === "state") {
        updated.district = districtsByState[value][0];
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: `USR-${Date.now()}`,
      ...formData
    };
    loginUser(newUser);
    setSubmitted(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center py-12 px-4">
      <div className="mx-auto w-full max-w-xl">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <img src="/logo.svg" alt="" className="w-8 h-8" />
          <div>
            <span className="block text-[15px] font-semibold tracking-wide text-forest">AGRINOVA</span>
            <span className="block text-[11px] text-slate-muted">Tamil Nadu & Maharashtra pilots</span>
          </div>
        </Link>
        <h1 className="mt-8 font-display text-3xl text-charcoal">
          Register a farm
        </h1>
        <p className="mt-2 text-sm text-slate-muted">
          Name, contact, role, and the district you farm in. You can add plots after you sign in.
        </p>
      </div>

      <div className="mt-8 mx-auto w-full max-w-xl">
        <div className="panel p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-muted mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-muted mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="ramesh@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-muted mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-muted mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-muted mb-1">
                  Application Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Farmer">Farmer (Landholder / Tenant)</option>
                  <option value="FPO Administrator">FPO Administrator</option>
                  <option value="Field Officer">Field Extension Officer</option>
                  <option value="Platform Administrator">Platform Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-muted mb-1">
                  Preferred Interface Language
                </label>
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="English">English</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Marathi">मराठी (Marathi)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-medium text-slate-muted mb-1">
                  Pilot State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-muted mb-1">
                  District
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="input-field"
                >
                  {districtsByState[formData.state].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-muted mb-1">
                  Village / Taluk
                </label>
                <input
                  type="text"
                  name="village"
                  placeholder="e.g. Thondamuthur"
                  value={formData.village}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="btn-primary w-full">
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Opening the workspace…</span>
                  </>
                ) : (
                  <>
                    <span>Create account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-slate-muted">
            Already registered?{" "}
            <Link to="/login" className="font-medium text-forest hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
