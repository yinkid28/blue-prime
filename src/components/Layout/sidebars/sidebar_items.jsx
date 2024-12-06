import React from 'react';

const SidebarItem = ({ label, link }) => {
  return (
    <div style={{ padding: '8px 16px' }}>
      <a href={link} style={{ textDecoration: 'none', color: '#000', display: 'flex', alignItems: 'center' }}>
        {label}
      </a>
    </div>
  );
};

export default SidebarItem;
