import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle } from "lucide-react";

export default function CRMLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (login(username, password)) {
        navigate("/crm/dashboard");
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 500);
  };

  const handleDemo = (role: "master_admin" | "admin" | "team" | "vandan") => {
    const demoCredentials: Record<string, { username: string; password: string }> = {
      master_admin: { username: "master_admin", password: "admin123" },
      admin: { username: "admin", password: "admin123" },
      team: { username: "team_member", password: "team123" },
      vandan: { username: "vandan_sec", password: "vandan@123" },
    };

    const creds = demoCredentials[role];
    setUsername(creds.username);
    setPassword(creds.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md border-gold/20 shadow-xl bg-slate-900/90 text-white backdrop-blur-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-serif text-gold">CRM Login</CardTitle>
          <CardDescription className="text-slate-400">Enter your credentials to access the CRM dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-950/50 border border-red-500/30 rounded-md text-red-200 text-sm">
                <AlertCircle className="h-4 w-4 text-red-400" />
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="username" className="text-slate-300">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="bg-slate-800 border-slate-700 text-white focus:ring-gold"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="bg-slate-800 border-slate-700 text-white focus:ring-gold"
              />
            </div>

            <Button type="submit" className="w-full bg-gold hover:bg-gold-light text-slate-950 font-bold" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-400">Demo Accounts</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-400">Quick login shortcuts:</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemo("vandan")}
                className="col-span-2 border-gold/40 text-gold hover:bg-gold hover:text-slate-950 font-bold transition-all"
              >
                🔑 Vandan Secretary (Sec. Account)
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemo("master_admin")}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Master Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemo("admin")}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemo("team")}
                className="col-span-2 border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Team Member
              </Button>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
              Vandan Secretary: vandan_sec / vandan@123<br />
              Master Admin: master_admin / admin123<br />
              Admin: admin / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
