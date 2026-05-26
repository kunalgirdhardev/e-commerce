import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import {
  signUp,
  getRedirectPathForRole,
  getAuthErrorMessage,
  ROLES,
} from "../../services/authService";
import { useAuthStore } from "../../store";

function Signup() {
  const [name, setName] = useState("");
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
      await signUp({ name, email, password });
      navigate(getRedirectPathForRole(ROLES.USER), { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join LUXE and discover premium products with immersive 3D previews."
      footer={
        <p className="text-sm text-white/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-accent font-medium hover:underline"
          >
            Sign in
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
          label="Full name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          required
          autoComplete="name"
        />

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
          placeholder="At least 6 characters"
          required
          autoComplete="new-password"
        />

        <AuthButton loading={loading}>Create account</AuthButton>
      </form>
    </AuthLayout>
  );
}

export default Signup;
