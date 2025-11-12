# 🗣️ Guía de Uso - Lenguaje Natural con IA

## 🎯 ¡Habla Naturalmente!

Este diagramador UML 2.0 usa **inteligencia artificial** para entender tus instrucciones en lenguaje natural. No necesitas memorizar comandos, solo habla como lo harías normalmente.

---

## 🚀 Inicio Rápido

### 1. Inicia el Backend
```bash
node backend.cjs
```

### 2. Inicia el Frontend
```bash
npm run dev
```

### 3. Habla Naturalmente
Escribe como si estuvieras hablando con alguien:
- "crea una clase llamada Materia"
- "agrégale un atributo nombre"
- "que sea de tipo String"

---

## 💬 Ejemplos de Conversaciones Reales

### Ejemplo 1: Creando una Clase Simple

**Tú:** `crea una clase llamada Materia`
**IA:** ✅ Clase Materia creada

**Tú:** `agrégale un atributo nombre de tipo String`
**IA:** ✅ Atributo nombre: String agregado a Materia

**Tú:** `ponle también creditos que sea Integer`
**IA:** ✅ Atributo creditos: Integer agregado a Materia

**Tú:** `y un método calcularPromedio`
**IA:** ✅ Método calcularPromedio() agregado a Materia

---

### Ejemplo 2: Creando Múltiples Clases

**Tú:** `necesito una clase Alumno`
**IA:** ✅ Clase Alumno creada

**Tú:** `que tenga nombre y edad`
**IA:** ✅ Atributos agregados a Alumno

**Tú:** `ahora crea una clase Profesor`
**IA:** ✅ Clase Profesor creada

**Tú:** `con especialidad y departamento`
**IA:** ✅ Atributos agregados a Profesor

---

### Ejemplo 3: Creando Relaciones

**Tú:** `que Alumno tenga una asociación con Materia`
**IA:** ✅ Relación de asociación creada entre Alumno y Materia

**Tú:** `mejor que sea una composición`
**IA:** ✅ Relación actualizada a composición

**Tú:** `ahora quiero que Profesor herede de Persona`
**IA:** ✅ Relación de herencia creada entre Profesor y Persona

---

### Ejemplo 4: Conversación Completa Natural

**Tú:** `vamos a hacer un sistema académico`
**IA:** ✅ Entendido, ¿qué clases necesitas?

**Tú:** `primero una clase Universidad`
**IA:** ✅ Clase Universidad creada

**Tú:** `con nombre y dirección`
**IA:** ✅ Atributos agregados

**Tú:** `ahora una Facultad que pertenezca a Universidad`
**IA:** ✅ Clase Facultad creada

**Tú:** `que tenga una composición con Universidad`
**IA:** ✅ Relación de composición creada

**Tú:** `muéstrame qué tengo hasta ahora`
**IA:** ✅ Clases creadas: Universidad, Facultad

---

## 🎨 Formas de Hablar que la IA Entiende

### Para Crear Clases
- "crea una clase Materia"
- "necesito una clase llamada Alumno"
- "hazme una clase Profesor"
- "quiero crear la clase Persona"
- "agrega una clase Universidad"

### Para Agregar Atributos
- "agrégale un atributo nombre"
- "ponle también edad de tipo Integer"
- "que tenga email y teléfono"
- "añádele creditos que sea Integer"
- "con un atributo promedio de tipo Double"

### Para Agregar Métodos
- "agrégale un método calcular"
- "ponle un método inscribirse"
- "que tenga un método getPromedio"
- "añádele el método validar con parámetro String dato"

### Para Crear Relaciones
- "que Alumno tenga una asociación con Materia"
- "crea una composición entre Universidad y Facultad"
- "quiero que Profesor herede de Persona"
- "pon una agregación entre Departamento y Empleado"
- "que haya una dependencia de Controlador a Servicio"

### Para Consultar
- "muéstrame qué clases tengo"
- "qué hay en el diagrama"
- "lista las clases"
- "qué tengo hasta ahora"

### Para Eliminar
- "elimina la clase Materia"
- "borra Alumno"
- "quita la clase Profesor"

---

## 🧠 La IA Entiende Contexto

La IA recuerda la conversación, así que puedes referirte a cosas anteriores:

**Tú:** `crea una clase Materia`
**IA:** ✅ Clase Materia creada

**Tú:** `agrégale nombre`
**IA:** ✅ (entiende que te refieres a Materia)

**Tú:** `y creditos también`
**IA:** ✅ (sigue agregando a Materia)

**Tú:** `ahora crea Alumno`
**IA:** ✅ Clase Alumno creada

**Tú:** `que se relacione con la anterior`
**IA:** ✅ (entiende que te refieres a Materia)

---

## 💡 Tips para Mejores Resultados

### ✅ Buenas Prácticas

1. **Sé específico con los tipos de datos**
   - ✅ "nombre de tipo String"
   - ❌ "nombre" (asumirá String por defecto)

2. **Menciona el tipo de relación**
   - ✅ "una composición entre Universidad y Facultad"
   - ✅ "que Alumno herede de Persona"

3. **Una acción a la vez**
   - ✅ "crea clase Materia" → "agrégale nombre"
   - ❌ "crea clase Materia con nombre, edad, creditos y que herede de Curso"

4. **Usa nombres claros**
   - ✅ "clase Materia", "clase Alumno"
   - ❌ "clase m", "clase a"

### 🎯 Frases Naturales que Funcionan Bien

- "vamos a hacer..."
- "necesito..."
- "quiero que..."
- "ahora..."
- "también..."
- "mejor que sea..."
- "cambia a..."

---

## 🔧 Tipos de Relaciones UML 2.0

Puedes usar cualquiera de estas formas:

| Relación | Cómo Pedirla |
|----------|--------------|
| **Asociación** | "asociación", "relación", "se relaciona con" |
| **Composición** | "composición", "contiene", "está compuesto por" |
| **Agregación** | "agregación", "agrupa", "tiene" |
| **Herencia** | "herencia", "hereda de", "es un", "extiende" |
| **Dependencia** | "dependencia", "depende de", "usa" |
| **Realización** | "realización", "implementa", "realiza" |

---

## 🎓 Ejemplo Completo: Sistema Universitario

```
Tú: vamos a hacer un sistema universitario

Tú: crea una clase Universidad
IA: ✅ Clase Universidad creada

Tú: con nombre y dirección
IA: ✅ Atributos agregados

Tú: ahora una clase Facultad
IA: ✅ Clase Facultad creada

Tú: que tenga nombre y código
IA: ✅ Atributos agregados

Tú: que Universidad contenga Facultades, es una composición
IA: ✅ Relación de composición creada

Tú: ahora necesito una clase Persona
IA: ✅ Clase Persona creada

Tú: con nombre, edad y documento
IA: ✅ Atributos agregados

Tú: crea Estudiante que herede de Persona
IA: ✅ Clase Estudiante creada y herencia establecida

Tú: agrégale matrícula a Estudiante
IA: ✅ Atributo agregado

Tú: y también Profesor que herede de Persona
IA: ✅ Clase Profesor creada y herencia establecida

Tú: con especialidad
IA: ✅ Atributo agregado

Tú: muéstrame todo
IA: ✅ Clases: Universidad, Facultad, Persona, Estudiante, Profesor
```

---

## ⚡ Ventajas del Lenguaje Natural

- ✅ **No memorizar comandos** - Habla como quieras
- ✅ **Contexto conversacional** - La IA recuerda lo anterior
- ✅ **Flexible** - Muchas formas de decir lo mismo
- ✅ **Intuitivo** - Como hablar con un compañero
- ✅ **Correcciones fáciles** - "mejor que sea composición"

---

## 🚨 Solución de Problemas

### El backend no responde
```bash
# Verifica que esté corriendo
node backend.cjs

# Debe mostrar: Backend escuchando en http://localhost:3001
```

### La IA no entiende
- Sé más específico: "crea una clase llamada Materia"
- Menciona nombres completos: "agregar atributo a clase Materia"
- Una acción a la vez

### Error de API Key
Verifica tu archivo `.env`:
```
OPENAI_API_KEY=tu_api_key_aqui
```

---

## 🎉 ¡Empieza a Crear!

No hay comandos que memorizar. Solo habla naturalmente y construye tu diagrama UML 2.0 paso a paso.

**Ejemplo para empezar:**
```
crea una clase llamada Materia
```

¡Y la IA se encargará del resto! 🚀
