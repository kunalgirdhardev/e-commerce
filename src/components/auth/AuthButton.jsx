function AuthButton({
  children,
  type = "submit",
  loading = false,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="relative w-full py-3.5 px-6 rounded-xl font-semibold text-ink bg-accent overflow-hidden transition-all duration-300 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 group"
    >
      <span
        className={`flex items-center justify-center gap-2 ${loading ? "opacity-0" : ""}`}
      >
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
        </span>
      )}
    </button>
  );
}

export default AuthButton;
