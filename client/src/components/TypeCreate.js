import { useState } from "react";

function TypeCreate({ onCreateType }) {
  const [type_name, setName] = useState("");
  const [typeNum, setTypeNum] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      type_name,
      public_id: Number(typeNum),
    };
    fetch("/api/types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((type) => {
          setName("");
          setTypeNum("");
          setErrors([]);
          onCreateType(type);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Type</h2>
      <div>
        <label htmlFor="type_name">Name:</label>
        <input
          type="text"
          id="type_name"
          value={type_name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="typeNum">Type Number:</label>
        <input
          type="number"
          id="typeNum"
          value={typeNum}
          onChange={(e) => setTypeNum(e.target.value)}
        />
      </div>
      {errors.map((err) => (
        <p key={err} style={{ color: "red" }}>
          {err}
        </p>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default TypeCreate