function Header({ title, description, className }) {
  return (
    // <div className="auth-header">
    <div className={className}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default Header;
