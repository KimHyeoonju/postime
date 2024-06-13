import "../css/usermodal.css";

const UserModal = ({ isOpen, title, message, onConfirm, buttonComment }) => {
  if (!isOpen) return null;

  return (
    <div className="usermodal-wrap">
      <div className="usermodal-content">
        <div className="usermodal-line">
          <h1>{title}</h1>
        </div>

        <div className="usermodal-message">
          <p>{message}</p>
        </div>
        <div className="usermodal-footer">
          <button onClick={onConfirm}>
            <span>{buttonComment}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
