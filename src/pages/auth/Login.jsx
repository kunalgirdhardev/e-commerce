import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import {
  signIn,
  getUserRole,
  getRedirectPathForRole,
  getAuthErrorMessage,
} from "../../services/authService";
import { useAuthStore } from "../../store";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, role, initialized } = useAuthStore();

  useEffect(() => {
    if (initialized && user && role) {
      navigate(getRedirectPathForRole(role), { replace: true });
    }
  }, [initialized, user, role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const firebaseUser = await signIn({ email, password });
      const userRole = await getUserRole(firebaseUser.uid);
      navigate(getRedirectPathForRole(userRole), { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your account — shopping or admin dashboard."
      footer={
        <p className="text-sm text-white/60">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-accent font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
        />

        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />

        <AuthButton loading={loading}>Sign in</AuthButton>
      </form>
    </AuthLayout>
  );
}

export default Login;
