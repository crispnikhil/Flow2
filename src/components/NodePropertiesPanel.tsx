import React, { useState, useEffect } from "react";
import { Node } from "reactflow";

interface NodePropertiesPanelProps {
  selectedNode: Node<any, string | undefined> | null;
  setNodes: (
    updater: (
      nodes: Node<any, string | undefined>[]
    ) => Node<any, string | undefined>[]
  ) => void;
}

const NodePropertiesPanel: React.FC<NodePropertiesPanelProps> = ({
  selectedNode,
  setNodes,
}) => {
  const [label, setLabel] = useState("");
  const [actor, setActor] = useState("");
  const [task, setTask] = useState("");

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label);
      setActor(selectedNode.data.actor || "");
      setTask(selectedNode.data.task || "");
    }
  }, [selectedNode]);

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = event.target.value;
    setLabel(newLabel);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode?.id
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  };

  const handleActorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newActor = event.target.value;
    setActor(newActor);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode?.id
          ? { ...node, data: { ...node.data, actor: newActor } }
          : node
      )
    );
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTask = event.target.value;
    setTask(newTask);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode?.id
          ? { ...node, data: { ...node.data, task: newTask } }
          : node
      )
    );
  };

  if (!selectedNode) {
    return (
      <div
        style={{
          width: "200px",
          padding: "10px",
          borderLeft: "1px solid #ddd",
        }}
      >
        <h3>Node Properties</h3>
        <p>Select a node to edit its properties.</p>
      </div>
    );
  }

  return (
    <div
      style={{ width: "200px", padding: "10px", borderLeft: "1px solid #ddd" }}
    >
      <h3>Node Properties</h3>
      <label>
        Label:
        <input type="text" value={label} onChange={handleLabelChange} />
      </label>
      <label>
        Actor:
        <input type="text" value={actor} onChange={handleActorChange} />
      </label>
      <label>
        Task:
        <input type="text" value={task} onChange={handleTaskChange} />
      </label>
      <label>
        Previous Node Title:
        <input
          type="text"
          value={selectedNode.data.previousNodeTitle || ""}
          readOnly
        />
      </label>
    </div>
  );
};

export default NodePropertiesPanel;
