function SwitchModal({text, onClickHandle, children }) {
  return (
    <>
      <div className="auth-bottom">
        {text}
        <a href="#" role="button" onClick={onClickHandle}>
          {children}
        </a>
      </div>
    </>
  );
}

export default SwitchModal;
