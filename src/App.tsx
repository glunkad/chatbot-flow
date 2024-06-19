import './style.css'

import {Navbar, NodesPanel, SettingsPanel, TextNode} from "./components";
import React, {useCallback, useState} from "react";


import 'reactflow/dist/style.css';
import ReactFlow, {addEdge, Controls, MarkerType, NodeTypes, OnConnect, useEdgesState, useNodesState} from "reactflow";


// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes: NodeTypes = {textUpdater: TextNode};

let id = 0;
let edgeCount = 0;
const getNodeId = () => `node_${id++}`;


export const App = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [selectedNode, setSelectedNode] = useState<Node>();
    // const [selectedNode, setSelectedNode] = useState(null);
    const [isNodeSelected, setIsNodeSelected] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showStatus, setShowStatus] = useState(false)

    const onConnect: OnConnect  = useCallback(
        (connection) => {
            setEdges((eds) => addEdge({...connection, markerEnd:{type: MarkerType.Arrow}}, eds))
            edgeCount++;
        },
        [setEdges]
    );

    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        event.preventDefault();
        setSelectedNode(node);
        setIsNodeSelected(true);
        console.log("Node is selected!");
    }, []);

    const onDrop = useCallback(
        (event ) => {
            event.preventDefault();
            const type = event.dataTransfer.getData('application/reactflow');


            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getNodeId(),
                data: { header : 'Send message' ,label: `test message ${id}` },
                position: position,
                type: 'textUpdater'
            };
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    )

    const onDragOver = useCallback((event ) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);


    const onSave = useCallback(() => {
        const totalConnectedNodes = id;

        if (edgeCount !== totalConnectedNodes - 1 ) {
            setErrorMessage('Cannot save Flow')
            setShowStatus(true)
            setTimeout(() => {
                setErrorMessage('')
                setShowStatus(false);
            }, 5000)
        } else {
            console.log('Saved Flow')
            setErrorMessage('Saved Flow')
            setShowStatus(true)
            setTimeout(() => {
                setErrorMessage('')
                setShowStatus(false)
            }, 5000)
        }
    }, []);

    return (
        <div className="container">
            <Navbar onSave={onSave} errorMessage={errorMessage} showStatus={showStatus}/>
            <div className="wrapper">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeClick={onNodeClick as any}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <Controls/>
                    </ReactFlow>

                    <div className="panel-wrapper">
                        {isNodeSelected ?
                            (
                                <div>
                                    <SettingsPanel selectedNode={selectedNode as any} setNodes={setNodes}
                                                   setIsNodeSelected={setIsNodeSelected}/>
                                </div>

                            ) : (
                                <div>
                                    <NodesPanel/>
                                </div>
                            )
                        }
                    </div>
            </div>

        </div>
    )
}