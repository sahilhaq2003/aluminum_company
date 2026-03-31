import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { Button, Card, Input, Label } from "../components/ui";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Add artificial delay for professional feel
    await new Promise((r) => setTimeout(r, 600));

    if (login(username, password, true)) {
      toast.success("Welcome back, Admin!");
      navigate("/admin");
    } else {
      toast.error("Incorrect email or password");
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a1b34] flex items-center justify-center px-4">
      {/* Decorative Circles */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#1f3f99]/20 blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#13a8ff]/20 blur-[100px]" />

      <div className="z-10 w-full max-w-[420px] transform transition-all">
        {/* Brand Header */}
        <div className="mb-10 flex flex-col items-center">
          <div className="flex items-center gap-3">
             <div className="h-12 w-12 bg-white rounded-xl shadow-2xl flex items-center justify-center">
                <span className="text-2xl font-black text-[#1f3f99]">AL</span>
             </div>
             <h2 className="text-3xl font-black tracking-tight text-white">AlumTech</h2>
          </div>
          <div className="mt-4 h-1 w-12 bg-[#13a8ff] rounded-full" />
        </div>

        <Card className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">Please sign in to manage your site</p>
          </div>

          <div className="space-y-5">
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</Label>
              <div className="relative mt-2">
                <Input
                  className="h-12 border-white/10 bg-white/5 pl-4 text-white placeholder:text-slate-500 focus:border-[#13a8ff] focus:ring-[#13a8ff]/20"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@gmail.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Password</Label>
                <span className="text-[11px] font-medium text-slate-500 hover:text-[#13a8ff] cursor-pointer transition">FORGOT?</span>
              </div>
              <Input
                type="password"
                className="h-12 border-white/10 bg-white/5 pl-4 text-white placeholder:text-slate-500 focus:border-[#13a8ff] focus:ring-[#13a8ff]/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button
              className="mt-4 h-12 w-full bg-[#13a8ff] text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-[#0e95e3] shadow-lg shadow-[#13a8ff]/20"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                   Authorizing...
                </span>
              ) : "SIGN IN"}
            </Button>

            <div className="mt-8 flex items-center justify-center gap-2 border-t border-white/10 pt-6">
               <Link to="/" className="text-xs font-semibold text-slate-400 hover:text-[#13a8ff] transition flex items-center gap-1">
                 <span>←</span> RETURN TO MAIN WEBSITE
               </Link>
            </div>
          </div>
        </Card>

        {/* Footer info */}
        <p className="mt-8 text-center text-xs text-slate-500">
           © 2026 AlumTech Solutions. Secured Admin Console.
        </p>
      </div>
    </main>
  );
}
