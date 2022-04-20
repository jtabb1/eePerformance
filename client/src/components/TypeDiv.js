import React, { useState } from "react"; 
import '../styles/TypeDiv.css'

export default function TypeDiv({ type, onDeleteType, onUpdateType }) {
  const [newType, setNewType] = useState({ ...type });
  const [editMode, setEditMode] = useState(false);

  function handleChange(e) {
    const updatedValue = { ...newType };
    updatedValue[e.target.name] = e.target.value;
    setNewType({ ...updatedValue });
  }

  function toggleEdit() {
    setEditMode(!editMode);
  }

  function handleUpdate(e) {
    e.preventDefault();
    onUpdateType(newType);
    setEditMode(false);
  }

  return(
    <div className="col category-card">
      <p>{type.type_name}</p>

      {editMode && (
        <div>
          <button onClick={() => onDeleteType(type.id)}>Delete Type</button>

          <form onSubmit={handleUpdate}>
            <input 
              name="type_name" 
              value={newType.type_name} 
              onChange={handleChange} 
            />
            <button type="submit">Update Type</button>
          </form>
        </div>
      )}
      <button onClick={toggleEdit}>Edit</button>
    </div>
  );
}
