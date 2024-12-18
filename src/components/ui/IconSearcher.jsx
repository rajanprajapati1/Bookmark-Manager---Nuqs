import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai'; // Ant Design Icons
import * as FiIcons from 'react-icons/fi'; // Feather Icons
import * as FaIcons from 'react-icons/fa'; // FontAwesome
import * as MdIcons from 'react-icons/md'; // Material Icons
import * as IoIcons from 'react-icons/io'; // Ionicons
import * as BiIcons from 'react-icons/bi'; // BoxIcons

// Combine all icon sets into one object
const allIcons = {
  ...AiIcons,
  ...FiIcons,
//   ...FaIcons,
//   ...MdIcons,
//   ...IoIcons,
//   ...BiIcons,
};

const IconPicker = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter icons based on search term
  const iconKeys = Object.keys(allIcons).filter((key) =>
    key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="icon-picker overflow-y-auto">
      <input
        type="text"
        placeholder="Search icons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="icon-search"
      />
      <div className="icon-grid">
        {iconKeys.map((key) => {
          const Icon = allIcons[key];
          return (
            <div
              key={key}
              className="icon-item"
              onClick={() => onSelect(key)}
              title={key}
            >
              <Icon size={24} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconPicker;
