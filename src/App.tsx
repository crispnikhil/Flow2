import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./components/Sidebar";
import NodePropertiesPanel from "./components/NodePropertiesPanel";

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Node 1", actor: "", task: "", previousNodeTitle: "" },
  },
  {
    id: "2",
    position: { x: 300, y: 200 },
    data: { label: "Node 2", actor: "", task: "", previousNodeTitle: "" },
  },
];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      if (sourceNode && targetNode) {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === targetNode.id
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    previousNodeTitle: sourceNode.data.label,
                  },
                }
              : node
          )
        );
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [nodes, setNodes, setEdges]
  );

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = { x: event.clientX, y: event.clientY };
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type,
      position,
      data: {
        label: `${type} Node`,
        actor: "",
        task: "",
        previousNodeTitle: "",
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const generateFlowJson = () => {
    return JSON.stringify({ nodes, edges }, null, 2); // Pretty-print JSON with 2-space indentation
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Button to open modal */}
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "10px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleOpenModal}
      >
        Show Flow JSON
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1001,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "600px",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <h2>Flow JSON</h2>
            <pre
              style={{
                background: "#f4f4f4",
                padding: "10px",
                borderRadius: "5px",
                maxHeight: "60vh",
                overflow: "auto",
              }}
            >
              {generateFlowJson()}
            </pre>
            <button
              style={{
                marginTop: "10px",
                padding: "10px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Sidebar />
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <NodePropertiesPanel selectedNode={selectedNode} setNodes={setNodes} />
    </div>
  );
};

export default App;
