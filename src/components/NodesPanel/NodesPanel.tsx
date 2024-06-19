import './style.css'
import message from '../../assets/svg/message.svg';
import { DragEvent } from 'react';

export const NodesPanel = () => {

    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string ) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="node-panel">
            <aside>
                <div className="appnode">
                    <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                        <img src={message} alt=""/>
                        <p>Message</p>
                    </div>
                </div>
            </aside>
        </div>
    )
};