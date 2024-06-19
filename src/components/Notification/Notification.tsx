import './style.css';

interface NotificationProps {
    message: string,
    show: boolean,
}

export const Notification: React.FC<NotificationProps> = ({message, show}) => {
    if(!show) return null;

    const className = message === 'Saved Flow' ? 'saved' : 'not-saved';

    return (
        <div className={className}>
            {message}
        </div>
    );
};