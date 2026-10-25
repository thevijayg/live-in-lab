import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { demoUsers } from "../data/mockData";
import { Sprout, ArrowRight, ShieldCheck, CheckCircle2, User, Key, Info } from "lucide-react";
import { Badge } from "../components/common/Badge";

export function LoginPage() {
  const { loginUser } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("murugan@agrinova.demo");
  const [password, setPassword] = useState("agrinova2026");
  const [selectedRole, setSelectedRole] = useState("Farmer");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please provide an email address.");
      return;
    }
    // Demo authentication
    const matchedUser = demoUsers.find(u => u.email === email || u.role === selectedRole) || {
      id: "USR-DEMO",
      name: email.split("@")[0],
      email,
      role: selectedRole,
      state: "Tamil Nadu",
      district: "Coimbatore"
    };

    loginUser(matchedUser);
    navigate("/dashboard");
  };

  const handleQuickDemoLogin = (user) => {
    loginUser(user);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
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
        <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-charcoal">
          Sign In to Your Workspace
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-muted">
          From Field Data to Smart Decisions • Sense, Decide, Finance
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-border sm:rounded-3xl sm:px-10">
          {/* Demo Login Mode Banner */}
          <div className="mb-6 p-3.5 rounded-2xl bg-lime-soft border border-agri/20 flex items-start gap-2.5 text-xs text-forest-dark">
            <Info className="w-4 h-4 text-agri flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Project Evaluation Mode:</strong> This interface uses safe demo session authentication. You can sign in with any role using the one-click quick access below.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Farmer", "FPO Administrator", "Field Officer", "Platform Administrator"].map((role) => (
                  <button
                    type="button"
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                      selectedRole === role
                        ? "bg-forest text-lime-accent border-forest shadow-sm"
                        : "bg-ivory text-charcoal border-slate-border hover:bg-slate-50"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
              />
            </div>

            {error && (
              <p className="text-xs text-danger font-medium">{error}</p>
            )}

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-forest hover:bg-forest-dark text-lime-accent shadow-md transition-all"
            >
              <span>Sign In as {selectedRole}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Role Login for Evaluator */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-muted mb-3 text-center">
              One-Click Evaluator Quick Login
            </p>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleQuickDemoLogin(user)}
                  className="p-2.5 rounded-xl bg-ivory hover:bg-lime-soft/50 border border-slate-200 text-left transition-colors text-xs"
                >
                  <p className="font-bold text-charcoal truncate">{user.name}</p>
                  <p className="text-[10px] text-agri font-medium">{user.role}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-muted">
            Don't have an account yet?{" "}
            <Link to="/register" className="font-bold text-agri hover:underline">
              Register a New Farm Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
