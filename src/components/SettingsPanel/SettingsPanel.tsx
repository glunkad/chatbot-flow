import { useEffect, useState} from "react";
import ArrowBack from '../../assets/svg/arrow_back.svg'
import './style.css'
import {Node} from "reactflow";

interface SettingsPanelProps {
    selectedNode: {
        id: string;
        data: {
            label: string;
        };
    };
    setIsNodeSelected: (b: boolean) => void,
    setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>; // Replace 'any' with the specific type if you have it
}


export const SettingsPanel: React.FC<SettingsPanelProps> = ({selectedNode, setIsNodeSelected, setNodes}) => {

    const [nodeName, setNodeName] = useState(selectedNode.data['label']);

    const id = selectedNode.id;

    useEffect(() => {
        if (selectedNode) {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === id) {
                        // Create a new object to notify react flow about the change
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                label: nodeName,
                            },
                        };
                    }
                    return node;
                })
            );
        }

    }, [nodeName, setNodes, selectedNode]);

    const handleInputChange = (event:  React.ChangeEvent<HTMLTextAreaElement>) => {
        setNodeName(event.target.value);
    };


    return (
        <>
            <aside>
                <div className="settings-panel">
                    <nav>
                        <img className="arrow-back" src={ArrowBack} onClick={() => setIsNodeSelected(false)}  alt="back"/>
                        <div className='centered-message'>
                            <p>Message</p>
                        </div>

                    </nav>
                    <hr/>
                    <div className="settings-data">
                        <h3>Text</h3>
                        <textarea
                            rows={4}
                            cols={30}
                            value={nodeName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <hr/>
                </div>
            </aside>
        </>
    )
};