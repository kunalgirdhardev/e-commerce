import { Link } from "react-router-dom";

function AuthLayout({ children, title, subtitle, footer }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-ink flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,_rgba(201,169,98,0.12)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,_rgba(255,255,255,0.04)_0%,_transparent_40%)]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/login" className="inline-block">
            <span className="text-3xl font-bold text-white tracking-tight">
              LUXE<span className="text-accent">.</span>
            </span>
          </Link>
        </div>

        <div className="glass-panel rounded-2xl p-8 md:p-10 shadow-2xl border border-white/10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-ink tracking-tight">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-ink-muted text-sm leading-relaxed">{subtitle}</p>
            )}
          </div>

          {children}
        </div>

        {footer && <div className="mt-6 text-center">{footer}</div>}
      </div>
    </div>
  );
}

export default AuthLayout;
