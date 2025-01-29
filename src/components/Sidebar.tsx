import React from "react";

const nodeTypes = ["Start", "Action", "Timer", "End"];

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      style={{ width: "200px", padding: "10px", borderRight: "1px solid #ddd" }}
    >
      <h3>Nodes</h3>
      {nodeTypes.map((type) => (
        <div
          key={type}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            cursor: "grab",
          }}
          onDragStart={(event) => onDragStart(event, type)}
          draggable
        >
          {type} Node
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
