import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap, addEdge, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import UmlNode from './UmlNode';

// Definir los tipos de nodos personalizados
const nodeTypes = {
  umlNode: UmlNode,
};

// Tipos de relaciones UML 2.0
const RELACIONES_UML = {
  asociacion: { label: 'asociación', style: { stroke: '#a5b4fc', strokeWidth: 2 }, markerEnd: 'arrow' },
  composicion: { label: 'composición', style: { stroke: '#f59e0b', strokeWidth: 2 }, markerEnd: 'diamond' },
  agregacion: { label: 'agregación', style: { stroke: '#10b981', strokeWidth: 2 }, markerEnd: 'diamondOpen' },
  herencia: { label: 'herencia', style: { stroke: '#8b5cf6', strokeWidth: 2 }, markerEnd: 'arrowclosed' },
  dependencia: { label: 'dependencia', style: { stroke: '#6b7280', strokeWidth: 2, strokeDasharray: '5,5' }, markerEnd: 'arrow' },
  realizacion: { label: 'realización', style: { stroke: '#ec4899', strokeWidth: 2, strokeDasharray: '5,5' }, markerEnd: 'arrowclosed' },
};

// Procesar comandos del usuario para construir el diagrama paso a paso
function procesarComando(input, currentNodes, currentEdges) {
  const inputLower = input.toLowerCase();
  let newNodes = [...currentNodes];
  let newEdges = [...currentEdges];
  let mensaje = '';

  // Comando: Crear clase
  if (inputLower.includes('crear') && inputLower.includes('clase')) {
    const match = input.match(/clase\s+([A-Za-z]+)/i);
    if (match) {
      const nombreClase = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      
      // Verificar si ya existe
      if (newNodes.find(n => n.id === nombreClase)) {
        return { nodes: currentNodes, edges: currentEdges, mensaje: `La clase "${nombreClase}" ya existe.` };
      }
      
      // Determinar si debe tener atributos o no
      const sinAtributos = inputLower.includes('sin atributo');
      
      const x = (newNodes.length % 3) * 300 + 100;
      const y = Math.floor(newNodes.length / 3) * 250 + 100;
      
      const newNode = {
        id: nombreClase,
        position: { x, y },
        data: { 
          label: sinAtributos ? nombreClase : `${nombreClase}\n(sin atributos aún)`,
          atributos: [],
          metodos: []
        },
        type: 'umlNode',
      };
      
      newNodes.push(newNode);
      mensaje = `Clase "${nombreClase}" creada ${sinAtributos ? 'sin atributos' : 'exitosamente'}.`;
    }
  }
  
  // Comando: Agregar atributo
  else if (inputLower.includes('agregar') && inputLower.includes('atributo')) {
    const matchClase = input.match(/clase\s+([A-Za-z]+)/i);
    const matchAtributo = input.match(/atributo\s+([A-Za-z_]+)(?:\s*:\s*([A-Za-z]+))?/i);
    
    if (matchClase && matchAtributo) {
      const nombreClase = matchClase[1].charAt(0).toUpperCase() + matchClase[1].slice(1);
      const nombreAtributo = matchAtributo[1];
      const tipoAtributo = matchAtributo[2] || 'String';
      
      const nodeIndex = newNodes.findIndex(n => n.id === nombreClase);
      if (nodeIndex !== -1) {
        if (!newNodes[nodeIndex].data.atributos) {
          newNodes[nodeIndex].data.atributos = [];
        }
        newNodes[nodeIndex].data.atributos.push(`- ${nombreAtributo}: ${tipoAtributo}`);
        
        // Actualizar label
        const atributos = newNodes[nodeIndex].data.atributos.join('\n');
        const metodos = newNodes[nodeIndex].data.metodos?.join('\n') || '';
        newNodes[nodeIndex].data.label = `${nombreClase}\n${atributos}${metodos ? '\n' + metodos : ''}`;
        
        mensaje = `Atributo "${nombreAtributo}: ${tipoAtributo}" agregado a "${nombreClase}".`;
      } else {
        mensaje = `La clase "${nombreClase}" no existe. Créala primero.`;
      }
    }
  }
  
  // Comando: Agregar método
  else if (inputLower.includes('agregar') && inputLower.includes('metodo')) {
    const matchClase = input.match(/clase\s+([A-Za-z]+)/i);
    const matchMetodo = input.match(/metodo\s+([A-Za-z_]+)\(([^)]*)\)/i);
    
    if (matchClase && matchMetodo) {
      const nombreClase = matchClase[1].charAt(0).toUpperCase() + matchClase[1].slice(1);
      const nombreMetodo = matchMetodo[1];
      const parametros = matchMetodo[2] || '';
      
      const nodeIndex = newNodes.findIndex(n => n.id === nombreClase);
      if (nodeIndex !== -1) {
        if (!newNodes[nodeIndex].data.metodos) {
          newNodes[nodeIndex].data.metodos = [];
        }
        newNodes[nodeIndex].data.metodos.push(`+ ${nombreMetodo}(${parametros})`);
        
        // Actualizar label
        const atributos = newNodes[nodeIndex].data.atributos?.join('\n') || '';
        const metodos = newNodes[nodeIndex].data.metodos.join('\n');
        newNodes[nodeIndex].data.label = `${nombreClase}${atributos ? '\n' + atributos : ''}\n${metodos}`;
        
        mensaje = `Método "${nombreMetodo}()" agregado a "${nombreClase}".`;
      } else {
        mensaje = `La clase "${nombreClase}" no existe. Créala primero.`;
      }
    }
  }
  
  // Comando: Crear relación
  else if (inputLower.includes('relacion') || inputLower.includes('asociacion') || 
           inputLower.includes('composicion') || inputLower.includes('agregacion') ||
           inputLower.includes('herencia') || inputLower.includes('dependencia')) {
    
    const matchClases = input.match(/([A-Za-z]+)\s+(?:y|con|a)\s+([A-Za-z]+)/i);
    let tipoRelacion = 'asociacion';
    
    if (inputLower.includes('composicion')) tipoRelacion = 'composicion';
    else if (inputLower.includes('agregacion')) tipoRelacion = 'agregacion';
    else if (inputLower.includes('herencia')) tipoRelacion = 'herencia';
    else if (inputLower.includes('dependencia')) tipoRelacion = 'dependencia';
    else if (inputLower.includes('realizacion')) tipoRelacion = 'realizacion';
    
    if (matchClases) {
      const clase1 = matchClases[1].charAt(0).toUpperCase() + matchClases[1].slice(1);
      const clase2 = matchClases[2].charAt(0).toUpperCase() + matchClases[2].slice(1);
      
      const node1Exists = newNodes.find(n => n.id === clase1);
      const node2Exists = newNodes.find(n => n.id === clase2);
      
      if (node1Exists && node2Exists) {
        const edgeId = `e${clase1}-${clase2}`;
        
        if (newEdges.find(e => e.id === edgeId)) {
          mensaje = `Ya existe una relación entre "${clase1}" y "${clase2}".`;
        } else {
          const relacionConfig = RELACIONES_UML[tipoRelacion];
          
          newEdges.push({
            id: edgeId,
            source: clase1,
            target: clase2,
            label: relacionConfig.label,
            type: 'smoothstep',
            animated: tipoRelacion === 'dependencia',
            style: relacionConfig.style,
            labelStyle: { 
              fill: '#fff', 
              fontSize: 12, 
              fontWeight: 600 
            },
            labelBgStyle: { 
              fill: '#23232a', 
              fillOpacity: 0.9 
            }
          });
          
          mensaje = `Relación de ${relacionConfig.label} creada entre "${clase1}" y "${clase2}".`;
        }
      } else {
        mensaje = `Una o ambas clases no existen. Clases disponibles: ${newNodes.map(n => n.id).join(', ')}`;
      }
    }
  }
  
  // Comando: Listar clases
  else if (inputLower.includes('listar') || inputLower.includes('mostrar clases')) {
    if (newNodes.length === 0) {
      mensaje = 'No hay clases creadas aún.';
    } else {
      mensaje = `Clases creadas: ${newNodes.map(n => n.id).join(', ')}`;
    }
  }
  
  // Comando: Eliminar clase
  else if (inputLower.includes('eliminar') && inputLower.includes('clase')) {
    const match = input.match(/clase\s+([A-Za-z]+)/i);
    if (match) {
      const nombreClase = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      const nodeIndex = newNodes.findIndex(n => n.id === nombreClase);
      
      if (nodeIndex !== -1) {
        newNodes = newNodes.filter(n => n.id !== nombreClase);
        newEdges = newEdges.filter(e => e.source !== nombreClase && e.target !== nombreClase);
        mensaje = `Clase "${nombreClase}" eliminada.`;
      } else {
        mensaje = `La clase "${nombreClase}" no existe.`;
      }
    }
  }
  
  else {
    mensaje = 'Comando no reconocido. Usa comandos como:\n- "Crear clase Materia"\n- "Crear clase Alumno sin atributos"\n- "Agregar atributo nombre:String a clase Materia"\n- "Agregar metodo calcular() a clase Materia"\n- "Crear relación de composición entre Materia y Alumno"';
  }
  
  return { nodes: newNodes, edges: newEdges, mensaje };
}


function getInitialChats() {
  // Carga los chats desde localStorage o crea uno nuevo
  const raw = localStorage.getItem('uml_chats');
  if (raw) {
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length > 0) return arr;
    } catch {}
  }
  return [{ id: Date.now(), title: 'Nuevo chat', history: [], uml: { nodes: [], edges: [] } }];
}


function App() {
  // Estados para chats y selección
  const [chats, setChats] = useState(getInitialChats());
  const [selectedId, setSelectedId] = useState(() => (getInitialChats()[0]?.id ?? null));
  const selectedChat = chats.find(c => c.id === selectedId) || chats[0] || { history: [], uml: { nodes: [], edges: [] } };
  const [nodes, setNodes, onNodesChange] = useNodesState(selectedChat?.uml?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(selectedChat?.uml?.edges || []);

  useEffect(() => {
    localStorage.setItem('uml_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    const cleanNodes = (selectedChat.uml.nodes || []).map(node => ({
      ...node,
      data: {
        ...node.data,
        label: typeof node.data.label === 'string' ? node.data.label : String(node.data.label)
      }
    }));
    setNodes(cleanNodes);
    setEdges(selectedChat.uml.edges);
    // eslint-disable-next-line
  }, [selectedId]);

  const handleSend = async (input) => {
    const newHistory = [...selectedChat.history, { role: 'user', content: input }];
    
    try {
      // Enviar a la IA con el estado actual del diagrama
      const response = await axios.post('http://localhost:3001/api/uml', { 
        prompt: input,
        chatId: selectedChat.id,
        currentNodes: nodes,
        currentEdges: edges
      });
      
      const aiResponse = response.data.response;
      let newNodes = [...nodes];
      let newEdges = [...edges];
      let mensaje = aiResponse.mensaje || 'Procesado';
      
      // Procesar la respuesta de la IA
      if (aiResponse.accion === 'crear_clase' && aiResponse.clase) {
        const nombreClase = aiResponse.clase;
        
        // Verificar si ya existe
        if (!newNodes.find(n => n.id === nombreClase)) {
          const x = (newNodes.length % 3) * 300 + 100;
          const y = Math.floor(newNodes.length / 3) * 250 + 100;
          
          newNodes.push({
            id: nombreClase,
            position: { x, y },
            data: { 
              label: nombreClase,
              atributos: [],
              metodos: []
            },
            type: 'umlNode',
          });
        }
      }
      
      else if ((aiResponse.accion === 'agregar_atributo' || aiResponse.accion === 'agregar_atributos') && aiResponse.clase) {
        const nombreClase = aiResponse.clase;
        const nodeIndex = newNodes.findIndex(n => n.id === nombreClase);
        
        if (nodeIndex !== -1) {
          if (!newNodes[nodeIndex].data.atributos) {
            newNodes[nodeIndex].data.atributos = [];
          }
          
          // Procesar múltiples atributos si vienen en array
          if (aiResponse.atributos && Array.isArray(aiResponse.atributos)) {
            aiResponse.atributos.forEach(attr => {
              const atributo = `- ${attr.nombre}: ${attr.tipo || 'String'}`;
              newNodes[nodeIndex].data.atributos.push(atributo);
            });
          }
          // Procesar un solo atributo
          else if (aiResponse.atributo) {
            const atributo = `- ${aiResponse.atributo.nombre}: ${aiResponse.atributo.tipo || 'String'}`;
            newNodes[nodeIndex].data.atributos.push(atributo);
          }
          
          // Actualizar label
          const atributos = newNodes[nodeIndex].data.atributos.join('\n');
          const metodos = newNodes[nodeIndex].data.metodos?.join('\n') || '';
          newNodes[nodeIndex].data.label = `${nombreClase}\n${atributos}${metodos ? '\n' + metodos : ''}`;
        }
      }
      
      else if (aiResponse.accion === 'agregar_metodo' && aiResponse.clase && aiResponse.metodo) {
        const nombreClase = aiResponse.clase;
        const nodeIndex = newNodes.findIndex(n => n.id === nombreClase);
        
        if (nodeIndex !== -1) {
          if (!newNodes[nodeIndex].data.metodos) {
            newNodes[nodeIndex].data.metodos = [];
          }
          const metodo = `+ ${aiResponse.metodo.nombre}(${aiResponse.metodo.parametros || ''})`;
          newNodes[nodeIndex].data.metodos.push(metodo);
          
          // Actualizar label
          const atributos = newNodes[nodeIndex].data.atributos?.join('\n') || '';
          const metodos = newNodes[nodeIndex].data.metodos.join('\n');
          newNodes[nodeIndex].data.label = `${nombreClase}${atributos ? '\n' + atributos : ''}\n${metodos}`;
        }
      }
      
      else if (aiResponse.accion === 'crear_relacion' && aiResponse.relacion) {
        const { origen, destino, tipo } = aiResponse.relacion;
        const node1Exists = newNodes.find(n => n.id === origen);
        const node2Exists = newNodes.find(n => n.id === destino);
        
        if (node1Exists && node2Exists) {
          const edgeId = `e${origen}-${destino}`;
          
          if (!newEdges.find(e => e.id === edgeId)) {
            const relacionConfig = RELACIONES_UML[tipo] || RELACIONES_UML.asociacion;
            
            newEdges.push({
              id: edgeId,
              source: origen,
              target: destino,
              label: relacionConfig.label,
              type: 'smoothstep',
              animated: tipo === 'dependencia',
              style: relacionConfig.style,
              labelStyle: { 
                fill: '#fff', 
                fontSize: 12, 
                fontWeight: 600 
              },
              labelBgStyle: { 
                fill: '#23232a', 
                fillOpacity: 0.9 
              }
            });
          }
        }
      }
      
      else if (aiResponse.accion === 'eliminar' && aiResponse.clase) {
        const nombreClase = aiResponse.clase;
        newNodes = newNodes.filter(n => n.id !== nombreClase);
        newEdges = newEdges.filter(e => e.source !== nombreClase && e.target !== nombreClase);
      }
      
      else if (aiResponse.accion === 'listar') {
        mensaje = newNodes.length === 0 
          ? 'No hay clases creadas aún.' 
          : `Clases creadas: ${newNodes.map(n => n.id).join(', ')}`;
      }
      
      // Actualizar el diagrama
      const newUml = { 
        nodes: newNodes, 
        edges: newEdges,
        plantuml: mensaje 
      };
      
      const newBotMsg = { role: 'bot', content: mensaje };
      const updatedChats = chats.map(chat =>
        chat.id === selectedChat.id
          ? { ...chat, history: [...newHistory, newBotMsg], uml: newUml }
          : chat
      );
      setChats(updatedChats);
      
      // Actualizar el diagrama visual
      if (selectedChat.id === selectedId) {
        setNodes(newNodes);
        setEdges(newEdges);
      }
    } catch (error) {
      console.error('Error al procesar:', error);
      const errorMsg = { role: 'bot', content: 'Error al procesar tu solicitud. Asegúrate de que el backend esté corriendo en el puerto 3001.' };
      const updatedChats = chats.map(chat =>
        chat.id === selectedChat.id
          ? { ...chat, history: [...newHistory, errorMsg], uml: selectedChat.uml }
          : chat
      );
      setChats(updatedChats);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#101014', color: '#fff', overflow: 'hidden' }}>
      <div style={{ width: 300, minWidth: 220, maxWidth: 350, height: '100vh', background: '#181824', borderRight: '1px solid #23232a', display: 'flex', flexDirection: 'column' }}>
        <Sidebar chats={chats} setChats={setChats} selectedId={selectedId} setSelectedId={setSelectedId} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', height: '100vh', minWidth: 0 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ flex: 1, minHeight: 0, minWidth: 0 }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              style={{ width: '100%', height: '100%' }}
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </div>
          <div style={{ width: '100%', background: '#181824', borderTop: '1px solid #23232a' }}>
            <ChatInput onSend={handleSend} />
          </div>
        </div>
        
        {/* Panel de historial de chat */}
        <div style={{ width: 350, background: '#181824', borderLeft: '1px solid #23232a', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 16, borderBottom: '1px solid #23232a', fontWeight: 'bold', fontSize: 16 }}>
            Historial de Comandos
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {selectedChat.history.length === 0 ? (
              <div style={{ color: '#666', fontSize: 14, textAlign: 'center', marginTop: 20 }}>
                <p>Habla naturalmente para construir tu diagrama UML 2.0</p>
                <p style={{ marginTop: 10, fontSize: 12 }}>Ejemplos:</p>
                <ul style={{ textAlign: 'left', marginTop: 8, lineHeight: 1.6 }}>
                  <li>crea una clase llamada Materia</li>
                  <li>agrégale un atributo nombre de tipo String</li>
                  <li>ponle también creditos que sea Integer</li>
                  <li>ahora crea otra clase Alumno</li>
                  <li>que Alumno tenga una composición con Materia</li>
                  <li>muéstrame qué clases tengo</li>
                </ul>
              </div>
            ) : (
              selectedChat.history.map((msg, idx) => (
                <div key={idx} style={{ 
                  padding: 12, 
                  borderRadius: 8, 
                  background: msg.role === 'user' ? '#23232a' : '#2a2a3a',
                  borderLeft: msg.role === 'user' ? '3px solid #4f46e5' : '3px solid #10b981'
                }}>
                  <div style={{ fontSize: 11, color: '#888', marginBottom: 4, fontWeight: 'bold' }}>
                    {msg.role === 'user' ? 'TÚ' : 'SISTEMA'}
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
