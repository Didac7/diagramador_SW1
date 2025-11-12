# 🎨 Diagramador UML 2.0 - Con Lenguaje Natural e IA

## 📋 Descripción

Diagramador UML 2.0 que usa **inteligencia artificial** para entender lenguaje natural. Habla normalmente y construye diagramas de clases paso a paso, sin comandos rígidos ni edición manual.

### ✨ Características Principales

- 🤖 **IA con Lenguaje Natural** - Habla como quieras, la IA te entiende
- ✅ **UML 2.0 Completo** - Soporta todas las relaciones estándar
- ✅ **Construcción Paso a Paso** - Crea clases, atributos y relaciones uno por uno
- ✅ **Contexto Conversacional** - La IA recuerda la conversación
- ✅ **Interfaz Visual Moderna** - ReactFlow + diseño oscuro
- ✅ **Múltiples Diagramas** - Sistema de chats para diferentes proyectos
- ✅ **Historial Completo** - Ve toda tu conversación con la IA
- ✅ **Persistencia Automática** - Guarda tu progreso en localStorage

---

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Ejecutar el Backend (Requerido)

```bash
node backend.cjs
```

### Ejecutar el Frontend

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

---

## 💬 Habla Naturalmente

No necesitas comandos rígidos. Habla como lo harías normalmente:

### Crear Clases
```
crea una clase llamada Materia
necesito una clase Alumno
hazme una clase Profesor
```

### Agregar Atributos
```
agrégale un atributo nombre de tipo String
ponle también creditos que sea Integer
que tenga email y teléfono
```

### Agregar Métodos
```
agrégale un método calcular
ponle un método inscribirse
que tenga un método getPromedio
```

### Crear Relaciones UML 2.0
```
que Alumno tenga una asociación con Materia
crea una composición entre Universidad y Facultad
quiero que Profesor herede de Persona
pon una agregación entre Departamento y Empleado
que haya una dependencia de Controlador a Servicio
```

### Consultar
```
muéstrame qué clases tengo
qué hay en el diagrama
lista las clases
```

📖 **Ver guía completa**: [USO_LENGUAJE_NATURAL.md](./USO_LENGUAJE_NATURAL.md)

---

## 🎯 Ejemplo de Conversación Real

```
Tú: crea una clase llamada Materia
IA: ✅ Clase Materia creada

Tú: agrégale un atributo nombre de tipo String
IA: ✅ Atributo nombre: String agregado a Materia

Tú: ponle también creditos que sea Integer
IA: ✅ Atributo creditos: Integer agregado a Materia

Tú: ahora crea otra clase Alumno
IA: ✅ Clase Alumno creada

Tú: que tenga nombre
IA: ✅ Atributo agregado

Tú: que Alumno tenga una asociación con Materia
IA: ✅ Relación de asociación creada entre Alumno y Materia
```

---

## 🛠️ Tecnologías

- **Frontend**: React 19 + Vite
- **Diagramas**: ReactFlow
- **IA**: OpenAI GPT-3.5-turbo
- **Backend**: Node.js + Express
- **Estilos**: CSS-in-JS
- **Generador**: Spring Boot (generación de código)

---

## 📁 Estructura del Proyecto

```
pruebaProy/
├── src/
│   ├── App.jsx                    # Componente principal con IA
│   ├── UmlNode.jsx                # Nodo personalizado UML
│   ├── Sidebar.jsx                # Gestión de múltiples diagramas
│   └── ChatInput.jsx              # Input de lenguaje natural
├── backend.cjs                    # Backend con IA (REQUERIDO)
├── generador-backend/             # Generador de código Spring Boot
├── USO_LENGUAJE_NATURAL.md        # Guía completa de uso
└── EJEMPLOS_RAPIDOS.md            # Ejemplos para copiar y pegar
```

---

## 🎨 Tipos de Relaciones Soportadas

| Relación | Descripción | Color |
|----------|-------------|-------|
| **Asociación** | Relación general entre clases | Azul |
| **Composición** | Relación fuerte (el todo contiene las partes) | Naranja |
| **Agregación** | Relación débil (el todo agrupa las partes) | Verde |
| **Herencia** | Relación "es un" (generalización) | Morado |
| **Dependencia** | Relación de uso temporal | Gris |
| **Realización** | Implementación de interfaz | Rosa |

---

## 🔧 Configuración (REQUERIDA)

### 1. Configura tu API Key de OpenAI

Crea un archivo `.env` en la raíz del proyecto:
```
OPENAI_API_KEY=tu_api_key_aqui
```

### 2. Inicia el Backend

```bash
node backend.cjs
```

Debe mostrar: `Backend escuchando en http://localhost:3001`

### 3. Inicia el Frontend

```bash
npm run dev
```

---

## 📝 Licencia

MIT

---

## 👨‍💻 Autor

Proyecto de Software - 9no Semestre