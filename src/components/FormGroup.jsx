function FormGroup({ type = "text", placeholder, value, setValue, children }) {
  const forAttribute = children.split(" ").join("-").toLowerCase() + "__form";
  return (
    <div className="form-group">
      <label htmlFor={forAttribute}>{children}</label>
      <input
        type={type}
        id={forAttribute}
        placeholder={placeholder}
        required
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export default FormGroup
