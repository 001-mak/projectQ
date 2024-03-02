import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const CustomDropdownColumn = ({ data, onSelectAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const handleSelectAction = (action) => {
    onSelectAction(data, action);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        className="btn sm"
        type="button"
        id={`dropdownButton-${data.id}`} // Use a unique ID for each button
        data-toggle="dropdown"
        // aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaEllipsisV />
      </button>
      <div
        className={`dropdown-menu ${isOpen ? 'show' : ''}`}
        aria-labelledby={`dropdownButton-${data.id}`}
        style={{zIndex: 999}}
      >
        <a
          className="dropdown-item"
          href="#"
          onClick={() => handleSelectAction('action1')}
        >
          Action 1
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => handleSelectAction('action2')}
        >
          Action 2
        </a>
      </div>
    </div>
  );
};

export default CustomDropdownColumn;
