import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { Button, Card, Input, Label } from "../components/ui";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[#1f3f99] to-[#13a8ff] px-4 py-12">
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <div className="mb-4 flex items-center gap-2 text-white">
          <span className="grid h-8 w-8 place-items-center rounded-[4px] bg-white text-sm font-bold text-[#1f3f99]">AL</span>
          <span className="text-3xl font-black">AlumTech</span>
        </div>

        <Card className="w-full max-w-md rounded-md bg-white p-6 shadow-xl">
          <h1 className="text-center text-4xl font-black text-slate-900">Admin Login</h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            Enter your credentials to access the admin dashboard
          </p>

          <Label className="mt-4">Email Address</Label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin@alumtech.com" />

          <Label className="mt-3">Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />

          <div className="mt-3 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
            <span className="text-slate-500">Forgot password?</span>
          </div>

          <Button
            className="mt-4 w-full bg-[#1f3f99] text-white hover:bg-[#173277]"
            onClick={() => {
              if (login(username, password, remember)) {
                toast.success("Logged in");
                navigate("/admin");
              } else toast.error("Invalid credentials");
            }}
          >
            Sign In
          </Button>

          <div className="mt-4 rounded-md border border-sky-100 bg-sky-50 p-3 text-sm text-slate-700">
            <p className="font-semibold">Demo Credentials:</p>
            <p>Email: admin@alumtech.com</p>
            <p>Password: admin123</p>
          </div>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-slate-600 hover:text-[#1f3f99]">
              ← Back to Home
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
