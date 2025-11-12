const { config } = require('dotenv');
const express = require('express');
const axios = require('axios');
const cors = require('cors');

config();

const app = express();
app.use(cors());
app.use(express.json());


const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY;

// Estado en memoria para cada sesión (por chatId)
const diagramSessions = new Map();

app.post('/api/uml', async (req, res) => {
  const { prompt, chatId, currentNodes, currentEdges, reset } = req.body;
  
  // Permitir resetear el diagrama
  if (reset) {
    if (chatId) diagramSessions.delete(chatId);
    return res.json({ message: 'Diagrama reiniciado.', nodes: [], edges: [] });
  }

  // Obtener o crear sesión
  if (!diagramSessions.has(chatId)) {
    diagramSessions.set(chatId, { history: [], nodes: [], edges: [] });
  }
  const session = diagramSessions.get(chatId);

  // Prompt del sistema optimizado para lenguaje natural
  const systemPrompt = `Eres un asistente experto en UML 2.5 que ayuda a construir diagramas de clases paso a paso mediante lenguaje natural.

Tu trabajo es interpretar las instrucciones del usuario y devolver un JSON con UNA SOLA acción.

REGLAS IMPORTANTES:
1. Si el usuario pide MÚLTIPLES atributos en un mensaje, devuelve TODOS en un array "atributos"
2. Siempre devuelve un mensaje amigable en español
3. Infiere la clase del contexto si no se menciona explícitamente
4. Normaliza los tipos: "int" → "Integer", "string" → "String", "double" → "Double"

FORMATO DE RESPUESTA (siempre JSON válido):
{
  "accion": "crear_clase" | "agregar_atributos" | "agregar_metodo" | "crear_relacion" | "listar" | "eliminar",
  "clase": "NombreClase",
  "atributos": [{"nombre": "attr1", "tipo": "String"}, {"nombre": "attr2", "tipo": "Integer"}],
  "metodo": { "nombre": "nombreMetodo", "parametros": "" },
  "relacion": { "origen": "Clase1", "destino": "Clase2", "tipo": "composicion|agregacion|herencia|asociacion|dependencia|realizacion" },
  "mensaje": "Mensaje amigable en español"
}

TIPOS DE RELACIONES UML 2.0:
- asociacion: relación general
- composicion: relación fuerte (el todo contiene las partes)
- agregacion: relación débil (el todo agrupa las partes)
- herencia: relación "es un"
- dependencia: relación de uso
- realizacion: implementación de interfaz

EJEMPLOS DE INTERPRETACIÓN:

Usuario: "crea una clase llamada Materia"
Respuesta: {"accion": "crear_clase", "clase": "Materia", "mensaje": "✅ Clase Materia creada exitosamente"}

Usuario: "agrégale un atributo nombre de tipo String"
Respuesta: {"accion": "agregar_atributos", "clase": "Materia", "atributos": [{"nombre": "nombre", "tipo": "String"}], "mensaje": "✅ Atributo nombre agregado a Materia"}

Usuario: "quiero que lo agregues a la clase materia dos atributos id tipo int y nombre tipo string"
Respuesta: {"accion": "agregar_atributos", "clase": "Materia", "atributos": [{"nombre": "id", "tipo": "Integer"}, {"nombre": "nombre", "tipo": "String"}], "mensaje": "✅ 2 atributos agregados a Materia: id (Integer) y nombre (String)"}

Usuario: "ponle también creditos y horas"
Respuesta: {"accion": "agregar_atributos", "clase": "Materia", "atributos": [{"nombre": "creditos", "tipo": "Integer"}, {"nombre": "horas", "tipo": "Integer"}], "mensaje": "✅ Atributos creditos y horas agregados a Materia"}

Usuario: "que Alumno herede de Persona"
Respuesta: {"accion": "crear_relacion", "relacion": {"origen": "Alumno", "destino": "Persona", "tipo": "herencia"}, "mensaje": "✅ Alumno ahora hereda de Persona"}

ESTADO ACTUAL DEL DIAGRAMA:
Clases: ${JSON.stringify(currentNodes?.map(n => n.id) || [])}
${currentNodes && currentNodes.length > 0 ? `Última clase mencionada: ${currentNodes[currentNodes.length - 1].id}` : ''}

Responde SOLO con el JSON, sin markdown ni explicaciones adicionales.`;

  // Construir mensajes
  let messages = [
    { role: 'system', content: systemPrompt }
  ];
  
  // Agregar historial de la sesión
  session.history.forEach(msg => {
    messages.push(msg);
  });
  
  // Agregar mensaje actual
  messages.push({ role: 'user', content: prompt });

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        // model: 'gpt-3.5-turbo',
        model: 'gpt-4.1-mini',
        messages,
        max_tokens: 500,
        temperature: 0.3
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const content = response.data.choices[0].message.content;
    
    // Guardar en historial
    session.history.push({ role: 'user', content: prompt });
    session.history.push({ role: 'assistant', content });
    
    // Intentar parsear el JSON
    let parsedResponse;
    try {
      // Limpiar el contenido si viene con markdown
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedResponse = JSON.parse(cleanContent);
    } catch (e) {
      parsedResponse = { mensaje: content, accion: 'texto' };
    }
    
    res.json({ 
      response: parsedResponse,
      rawContent: content,
      success: true
    });
  } catch (error) {
    if (error.response) {
      res.status(500).json({ error: 'Error al comunicarse con OpenAI', details: error.response.data });
    } else {
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
