# 🎯 Flechas UML 2.0 - Guía Visual

## 📐 Tipos de Flechas Implementadas

### 1. **Asociación** (Association)
```
Clase1 ────────────> Clase2
```
- **Línea**: Sólida
- **Flecha**: Simple →
- **Color**: Azul (#a5b4fc)
- **Significado**: Relación general entre clases
- **Ejemplo**: "Alumno se relaciona con Materia"

---

### 2. **Herencia** (Inheritance/Generalization)
```
ClaseHija ──────────▷ ClasePadre
```
- **Línea**: Sólida
- **Flecha**: Triangular vacía ▷
- **Color**: Morado (#8b5cf6)
- **Significado**: "Es un" - La clase hija hereda de la clase padre
- **Ejemplo**: "Estudiante hereda de Persona"

---

### 3. **Realización/Implementación** (Realization)
```
Clase - - - - - - -▷ Interfaz
```
- **Línea**: Punteada
- **Flecha**: Triangular vacía ▷
- **Color**: Rosa (#ec4899)
- **Significado**: Una clase implementa una interfaz
- **Ejemplo**: "ClaseRepositorio implementa IRepositorio"

---

### 4. **Dependencia** (Dependency)
```
Clase1 - - - - - - -> Clase2
```
- **Línea**: Punteada
- **Flecha**: Simple →
- **Color**: Gris (#6b7280)
- **Significado**: Uso temporal, una clase depende de otra
- **Ejemplo**: "Controlador usa Servicio"

---

### 5. **Agregación** (Aggregation)
```
Todo ◇──────────── Parte
```
- **Línea**: Sólida
- **Símbolo**: Rombo vacío ◇ (en el lado del "todo")
- **Color**: Verde (#10b981)
- **Significado**: Relación débil "tiene un" - Las partes pueden existir independientemente
- **Ejemplo**: "Departamento agrupa Empleados" (los empleados pueden existir sin el departamento)

---

### 6. **Composición** (Composition)
```
Todo ◆──────────── Parte
```
- **Línea**: Sólida
- **Símbolo**: Rombo relleno ◆ (en el lado del "todo")
- **Color**: Naranja (#f59e0b)
- **Significado**: Relación fuerte "contiene" - Las partes no pueden existir sin el todo
- **Ejemplo**: "Universidad contiene Facultades" (las facultades no existen sin la universidad)

---

## 🗣️ Cómo Pedirlas en Lenguaje Natural

### Asociación
```
que Alumno tenga una asociación con Materia
Alumno se relaciona con Materia
crea una relación entre Alumno y Materia
```

### Herencia
```
que Estudiante herede de Persona
Estudiante es un Persona
crea una herencia de Estudiante a Persona
Estudiante extiende Persona
```

### Realización
```
que ClaseRepositorio implemente IRepositorio
ClaseRepositorio realiza IRepositorio
crea una realización entre ClaseRepositorio e IRepositorio
```

### Dependencia
```
que Controlador dependa de Servicio
Controlador usa Servicio
crea una dependencia de Controlador a Servicio
```

### Agregación
```
que Departamento agrupe Empleados
crea una agregación entre Departamento y Empleado
Departamento tiene Empleados (agregación)
```

### Composición
```
que Universidad contenga Facultades
crea una composición entre Universidad y Facultad
Universidad está compuesta por Facultades
Universidad contiene Facultades (composición)
```

---

## 📊 Comparación Visual

```
ASOCIACIÓN:        A ────────────> B
                   Relación general

HERENCIA:          Hijo ─────────▷ Padre
                   "Es un"

REALIZACIÓN:       Clase - - - -▷ Interfaz
                   Implementa

DEPENDENCIA:       Cliente - - -> Servicio
                   Usa temporalmente

AGREGACIÓN:        Todo ◇────── Parte
                   Tiene (débil)

COMPOSICIÓN:       Todo ◆────── Parte
                   Contiene (fuerte)
```

---

## 🎯 Diferencias Clave

### Agregación vs Composición

| Característica | Agregación ◇ | Composición ◆ |
|----------------|--------------|---------------|
| **Relación** | Débil | Fuerte |
| **Independencia** | Las partes pueden existir solas | Las partes NO pueden existir solas |
| **Ciclo de vida** | Independiente | Dependiente del todo |
| **Ejemplo** | Departamento - Empleado | Universidad - Facultad |

### Herencia vs Realización

| Característica | Herencia ▷ | Realización ▷ |
|----------------|------------|---------------|
| **Línea** | Sólida | Punteada |
| **Uso** | Clase hereda de clase | Clase implementa interfaz |
| **Ejemplo** | Estudiante → Persona | Repositorio → IRepositorio |

### Asociación vs Dependencia

| Característica | Asociación → | Dependencia → |
|----------------|--------------|---------------|
| **Línea** | Sólida | Punteada |
| **Duración** | Permanente | Temporal |
| **Ejemplo** | Alumno - Materia | Controlador - Servicio |

---

## 💡 Ejemplos Prácticos

### Sistema Académico
```
Persona (clase base)
   ▲
   │ herencia (▷)
   │
   ├── Estudiante
   │      │
   │      │ asociación (→)
   │      ▼
   │   Materia
   │
   └── Profesor
          │
          │ agregación (◇)
          ▼
       Departamento
```

### Sistema Empresarial
```
Universidad
   │
   │ composición (◆)
   ▼
Facultad
   │
   │ agregación (◇)
   ▼
Profesor
```

### Sistema con Interfaces
```
IRepositorio (interfaz)
   ▲
   │ realización (- - -▷)
   │
ClaseRepositorio
   ▲
   │ dependencia (- - ->)
   │
Controlador
```

---

## 🚀 Prueba las Flechas

### Ejemplo Completo
```
Tú: crea una clase Persona
Tú: crea una clase Estudiante
Tú: que Estudiante herede de Persona
     → Verás una flecha triangular vacía (▷) con línea sólida morada

Tú: crea una clase Universidad
Tú: crea una clase Facultad
Tú: que Universidad contenga Facultades (composición)
     → Verás un rombo relleno (◆) con línea sólida naranja

Tú: crea una clase Departamento
Tú: crea una clase Empleado
Tú: que Departamento agrupe Empleados
     → Verás un rombo vacío (◇) con línea sólida verde
```

---

## 📋 Resumen Rápido

| Relación | Línea | Símbolo | Color | Cuándo Usar |
|----------|-------|---------|-------|-------------|
| **Asociación** | Sólida | → | Azul | Relación general |
| **Herencia** | Sólida | ▷ | Morado | "Es un" |
| **Realización** | Punteada | ▷ | Rosa | Implementa interfaz |
| **Dependencia** | Punteada | → | Gris | Uso temporal |
| **Agregación** | Sólida | ◇ | Verde | "Tiene" (débil) |
| **Composición** | Sólida | ◆ | Naranja | "Contiene" (fuerte) |

---

¡Todas las flechas están implementadas según el estándar UML 2.0! 🎉
