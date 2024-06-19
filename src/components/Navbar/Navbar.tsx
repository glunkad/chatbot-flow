import './style.css';
import {Notification} from "../Notification";

interface NavbarProps {
    onSave:  () => void
    errorMessage: string,
    showStatus: boolean
}

export const Navbar: React.FC<NavbarProps> = ({onSave,errorMessage,showStatus}) => {
    return (
        <div className="navbar">
            <div className="centered-notification">
                <Notification message={errorMessage} show={showStatus}/>
            </div>
            <button onClick={onSave} className="save-button">Save Changes</button>
        </div>
    )
}