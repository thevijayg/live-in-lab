import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Sprout, ArrowRight, CheckCircle2, Info } from "lucide-react";

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
    <div className="min-h-screen bg-ivory flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-forest flex items-center justify-center p-2 shadow-lg">
            <img src="/logo.svg" alt="AGRINOVA logo" className="w-full h-full" />
          </div>
          <div className="text-left">
            <span className="text-2xl font-black tracking-tight text-forest-dark block leading-none">
              AGRINOVA
            </span>
            <span className="text-[11px] font-semibold text-agri tracking-widest uppercase">
              Smart Agriculture
            </span>
          </div>
        </Link>
        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-charcoal">
          Create Your Farm Account
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-muted">
          Register your farm profile to join the Tamil Nadu or Maharashtra pilot ecosystem.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-border sm:rounded-3xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="ramesh@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Application Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
                >
                  <option value="Farmer">Farmer (Landholder / Tenant)</option>
                  <option value="FPO Administrator">FPO Administrator</option>
                  <option value="Field Officer">Field Extension Officer</option>
                  <option value="Platform Administrator">Platform Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Preferred Interface Language
                </label>
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
                >
                  <option value="English">English</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Marathi">मराठी (Marathi)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Pilot State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  District
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
                >
                  {districtsByState[formData.state].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                  Village / Taluk
                </label>
                <input
                  type="text"
                  name="village"
                  placeholder="e.g. Thondamuthur"
                  value={formData.village}
                  onChange={handleChange}
                  className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-forest hover:bg-forest-dark text-lime-accent shadow-md transition-all"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-lime-accent" />
                    <span>Account Created! Loading Workspace...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration & Open Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-slate-muted">
            Already registered?{" "}
            <Link to="/login" className="font-bold text-agri hover:underline">
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
