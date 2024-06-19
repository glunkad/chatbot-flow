import './style.css';
import {Handle, Position} from "reactflow";
import whatsapp from '../../assets/svg/whatsapp.svg';
import message from '../../assets/svg/message-black.svg';

interface TextNodeProps {
    data:{
        header: string,
        label: string,
    }
}

export const TextNode: React.FC<TextNodeProps> = ({data}) => {

    return (
        <div className='text-node'>
            <div className='text-node-header'>
                <div className="icon-title">
                    <img src={message} alt="msgs"/>
                    <p><strong>{data['header']}</strong></p>
                </div>
                <span className="icon-right"><img src={whatsapp} alt="whatsapp icon"/></span>
            </div>
            <div className='text-node-body'>
                {data['label']}
            </div>
            <Handle type="source" position={Position.Right} isConnectable={true} id="source"/>
            <Handle type="target" position={Position.Left} isConnectable={true} id="target"/>
        </div>
    )
};

