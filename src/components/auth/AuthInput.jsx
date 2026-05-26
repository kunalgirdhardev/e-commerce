function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  id,
}) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 rounded-xl bg-white/90 border border-border text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
      />
    </div>
  );
}

export default AuthInput;
