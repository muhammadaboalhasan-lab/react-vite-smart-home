function SubmitButton({ children }) {
  return (
    <button type="submit" className="auth-submit">
      <ButtonLogo />
      {children}
    </button>
  );
}

function ButtonLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
export default SubmitButton;
