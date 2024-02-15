import Username from "../UserName";
import ProfilePicture from "../ProfilePicture";

function Header(){
    return <header className="chat-window-header">
        <ProfilePicture />
        <Username />
    </header>
}


export default Header