import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { demoUsers } from "../data/mockData";
import { ArrowRight } from "lucide-react";

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
      setError("Enter an email address.");
      return;
    }
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
    <div className="min-h-screen bg-ivory flex flex-col justify-center py-12 px-4">
      <div className="mx-auto w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <img src="/logo.svg" alt="" className="w-8 h-8" />
          <div>
            <span className="block text-[15px] font-semibold tracking-wide text-forest">AGRINOVA</span>
            <span className="block text-[11px] text-slate-muted">Field operations workspace</span>
          </div>
        </Link>
        <h1 className="mt-8 font-display text-3xl text-charcoal">Sign in</h1>
        <p className="mt-2 text-sm text-slate-muted">
          This demo does not check passwords. Pick a role, or open a named sample account below.
        </p>

        <div className="mt-8 panel p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-muted mb-2">Role</label>
              <div className="grid grid-cols-2 gap-2">
                {["Farmer", "FPO Administrator", "Field Officer", "Platform Administrator"].map((role) => (
                  <button
                    type="button"
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`py-2 px-2.5 rounded-md text-xs font-medium border text-left ${
                      selectedRole === role
                        ? "bg-forest text-cream border-forest"
                        : "bg-white text-charcoal border-slate-border hover:bg-ivory"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-muted mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-slate-muted mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>

            {error && (
              <p className="text-xs text-danger">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full mt-2">
              Continue as {selectedRole}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-border">
            <p className="text-xs text-slate-muted mb-3">Sample accounts</p>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleQuickDemoLogin(user)}
                  className="p-2.5 rounded-md bg-ivory hover:bg-white border border-slate-border text-left text-xs"
                >
                  <p className="font-medium text-charcoal truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-muted">{user.role}</p>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-muted">
            New to the pilot?{" "}
            <Link to="/register" className="font-medium text-forest hover:underline">
              Register a farm
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
