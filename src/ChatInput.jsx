import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Habla naturalmente: 'crea una clase Materia', 'agrégale un atributo nombre'..."
        style={{ flex: 1, padding: 12, fontSize: 14, background: '#23232a', color: '#fff', border: '1px solid #333', borderRadius: 6 }}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend} style={{ padding: '12px 24px', fontSize: 14, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }}>Enviar</button>
    </div>
  );
};

export default ChatInput;
