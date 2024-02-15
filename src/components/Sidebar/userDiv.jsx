import "../../App.css";
import ProfilePicture from "../ProfilePicture";

import Username from "../UserName";

function UserDiv() {
  return (
    <div className="user-container">
      <ProfilePicture />
      <div className="user-chat-info">
        <div className="user-chat-row">
         <Username />
        </div>
        <div className="user-chat-row">
          <div className="user-last-msg-time">
            <h6>
            8:26 pm
            </h6></div>
          <div className="user-chat-msg-count">3</div>
        </div>
      </div>
    </div>
  );
}

export default UserDiv;
