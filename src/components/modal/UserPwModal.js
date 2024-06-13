import "./userpwmodal.css";
const UserPwModal = ({
  isOpen,
  message,
  userPwInput,
  error,
  onPwInputChange,
  onConfirm,
  buttonComment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="userpwmodal-wrap">
      <div className="userpwmodal-content">
        <div className="userpwmodal-message">
          <p>{message}</p>
          <div className="userpwmodal-error">
            <p>{error}</p>
          </div>
        </div>

        <div className="userpwmodal-footer">
          <input
            type="password"
            value={userPwInput}
            onChange={onPwInputChange}
          />
          <button onClick={onConfirm}>
            <span>{buttonComment}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPwModal;
