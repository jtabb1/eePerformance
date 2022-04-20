import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../constraints/index.js";
// import Ee from "./User.js";

import TypeCreate from "./TypeCreate";
import TypeDiv from "./TypeDiv";

import '../styles/TypeContainer.css'

export default function TypeContainer() {
  const [types, setTypes] = useState([]);

  // CREATE

  function onCreateType(newEType) {
    setTypes((types) => [...types, newEType])
  }

  // READ

  useEffect(() => {
    fetch(`/api/types`)
      .then((res) => res.json())
      .then(setTypes)
  }, []);

  function populateTypes() {
    return types.map((type) => (
      <TypeDiv type={type} onDeleteType={handleDeleteType} onUpdateType={handleUpdateType} key={type.id} />
    ));
  }


  // UPDATE

  function handleUpdateType(type) {
    fetch("/api/types/" + type.id, {
      method: "PATCH",
      body: JSON.stringify(type),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // OPTIMISTIC RENDERING

    const newTypes = types.map((g) => {
      if (g.id === type.id) {
        g = type;
      }
      return g;
    });
    setTypes(newTypes);
  }

  // DELETE

  function handleDeleteType(id) {
    fetch(`/api/types/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setTypes((types) =>
        types.filter((type) => type.id !== id)
        );
      }
    });
  }
  
  return (
      <div>
        <h2 className="home-page-header">Type List</h2>
        <div className="type-container">
          {types && populateTypes()}
        </div>
        <TypeCreate onCreateType={onCreateType} />
      </div>
  );
}
