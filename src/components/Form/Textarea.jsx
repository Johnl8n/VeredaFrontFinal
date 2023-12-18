import React from "react";

const Textarea = ({ text, name, handleOnChange, value }) => {
  return (
    <div>
      <label htmlFor={name}>{text}:</label>
      <br />
      <textarea
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value}
        rows={4}
      />
    </div>
  );
};

export default Textarea;
