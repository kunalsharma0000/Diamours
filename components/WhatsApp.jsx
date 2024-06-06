import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ mobileNumber }) => {
  const message = encodeURIComponent("Hey I'm interested to buy jewellery from Diamour");

  const openWhatsApp = () => {
    window.open(`https://wa.me/${mobileNumber}?text=${message}`, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999',
      }}
    >
      <button
        style={{
          background: '#25d366',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        }}
        onClick={openWhatsApp}
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  );
};

export default WhatsAppButton;
