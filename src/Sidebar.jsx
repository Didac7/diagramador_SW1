import React from 'react';

const Sidebar = ({ chats, setChats, selectedId, setSelectedId }) => {
  const handleNew = () => {
    const newChat = { id: Date.now(), title: 'Nuevo chat', history: [], uml: { nodes: [], edges: [] } };
    setChats([...chats, newChat]);
    setSelectedId(newChat.id);
  };

  const handleDelete = (id) => {
    const filtered = chats.filter(c => c.id !== id);
    if (filtered.length === 0) {
      const newChat = { id: Date.now(), title: 'Nuevo chat', history: [], uml: { nodes: [], edges: [] } };
      setChats([newChat]);
      setSelectedId(newChat.id);
    } else {
      setChats(filtered);
      if (selectedId === id) {
        setSelectedId(filtered[0].id);
      }
    }
  };

  return (
  <aside style={{
    width: 260,
    background: '#18181b',
    color: '#fff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #23232a',
    padding: 0
  }}>
    <div style={{ padding: 24, fontWeight: 'bold', fontSize: 20, borderBottom: '1px solid #23232a' }}>
      UML Chat
    </div>
    <button onClick={handleNew} style={{ margin: 16, padding: 10, background: '#23232a', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
      + Nuevo chat
    </button>
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {chats.map(chat => (
        <div
          key={chat.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 8px 12px 20px',
            background: chat.id === selectedId ? '#23232a' : 'none',
            cursor: 'pointer',
            borderLeft: chat.id === selectedId ? '4px solid #4f46e5' : '4px solid transparent',
            fontWeight: chat.id === selectedId ? 'bold' : 'normal',
            gap: 8
          }}
        >
          <span style={{ flex: 1 }} onClick={() => setSelectedId(chat.id)}>
            {chat.title || 'Chat sin título'}
          </span>
          <button
            onClick={e => { e.stopPropagation(); handleDelete(chat.id); }}
            style={{
              background: 'none',
              border: 'none',
              color: '#aaa',
              fontSize: 16,
              cursor: 'pointer',
              padding: 0
            }}
            title="Eliminar chat"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
    <div style={{ padding: 16, fontSize: 12, color: '#aaa', borderTop: '1px solid #23232a' }}>
      <b>Hecho por GitHub Copilot</b>
    </div>
  </aside>
  );
};

export default Sidebar;
