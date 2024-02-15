import "../../index.css";

function UserDiv() {
  return (
    <div className="user-container">
      <div className="user-profile-picture">
        <img alt="Profile Picture" />
      </div>
      <div className="user-chat-info">
        <div className="user-chat-row">
          <div className="user-name">Kevin</div>
          <div className="user-chat-msg-time">8:26 pm</div>
        </div>
        <div className="user-chat-row">
          <div className="user-last-msg">...</div>
          <div className="user-chat-msg-count">3</div>
        </div>
      </div>
    </div>
  );
}

export default UserDiv;
