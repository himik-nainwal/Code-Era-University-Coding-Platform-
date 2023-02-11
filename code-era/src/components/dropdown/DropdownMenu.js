import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

function DropdownMenu({ onOptionSelected }) {
  const [selectedOption, setSelectedOption] = useState("Dificulty Level");

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    onOptionSelected(eventKey); // call the callback function with the selected option
  };

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={selectedOption}
      onSelect={handleSelect}
    >
      <Dropdown.Item eventKey="Easy">Easy</Dropdown.Item>
      <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
      <Dropdown.Item eventKey="Hard">Hard</Dropdown.Item>
    </DropdownButton>
  );
}

export default DropdownMenu;
