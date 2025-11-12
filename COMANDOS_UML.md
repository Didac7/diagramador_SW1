# Guía de Comandos - Diagramador UML 2.0

## 📋 Descripción
Este diagramador UML 2.0 funciona completamente mediante **comandos de texto**. El usuario construye el diagrama paso a paso sin tocar nada manualmente.

---

## 🎯 Comandos Disponibles

### 1️⃣ **Crear Clases**

#### Crear una clase vacía
```
Crear clase Materia
```

#### Crear una clase sin atributos (explícito)
```
Crear clase Alumno sin atributos
```

---

### 2️⃣ **Agregar Atributos**

#### Agregar atributo con tipo
```
Agregar atributo nombre:String a clase Materia
Agregar atributo creditos:Integer a clase Materia
Agregar atributo promedio:Double a clase Alumno
```

#### Agregar atributo sin especificar tipo (por defecto String)
```
Agregar atributo descripcion a clase Materia
```

---

### 3️⃣ **Agregar Métodos**

#### Agregar método sin parámetros
```
Agregar metodo calcular() a clase Materia
```

#### Agregar método con parámetros
```
Agregar metodo setNombre(String nombre) a clase Alumno
Agregar metodo calcularPromedio(Double nota1, Double nota2) a clase Alumno
```

---

### 4️⃣ **Crear Relaciones UML 2.0**

#### Asociación
```
Crear relación de asociación entre Alumno y Materia
```

#### Composición
```
Crear relación de composición entre Universidad y Facultad
```

#### Agregación
```
Crear relación de agregación entre Departamento y Empleado
```

#### Herencia
```
Crear relación de herencia entre Estudiante y Persona
```

#### Dependencia
```
Crear relación de dependencia entre Controlador y Servicio
```

#### Realización
```
Crear relación de realización entre ClaseImpl y Interface
```

---

### 5️⃣ **Comandos Auxiliares**

#### Listar todas las clases creadas
```
Listar clases
Mostrar clases
```

#### Eliminar una clase
```
Eliminar clase Materia
```

---

## 📝 Ejemplos Completos

### Ejemplo 1: Sistema Académico Simple

```
1. Crear clase Materia
2. Agregar atributo nombre:String a clase Materia
3. Agregar atributo creditos:Integer a clase Materia
4. Agregar metodo calcularPromedio() a clase Materia

5. Crear clase Alumno
6. Agregar atributo nombre:String a clase Alumno
7. Agregar atributo edad:Integer a clase Alumno
8. Agregar metodo inscribirse() a clase Alumno

9. Crear relación de asociación entre Alumno y Materia
```

### Ejemplo 2: Sistema con Herencia

```
1. Crear clase Persona
2. Agregar atributo nombre:String a clase Persona
3. Agregar atributo edad:Integer a clase Persona

4. Crear clase Estudiante
5. Agregar atributo matricula:String a clase Estudiante
6. Crear relación de herencia entre Estudiante y Persona

7. Crear clase Profesor
8. Agregar atributo departamento:String a clase Profesor
9. Crear relación de herencia entre Profesor y Persona
```

### Ejemplo 3: Composición

```
1. Crear clase Universidad
2. Agregar atributo nombre:String a clase Universidad

3. Crear clase Facultad
4. Agregar atributo nombre:String a clase Facultad

5. Crear relación de composición entre Universidad y Facultad
```

---

## 🎨 Tipos de Relaciones UML 2.0

| Relación | Color | Descripción |
|----------|-------|-------------|
| **Asociación** | Azul | Relación general entre clases |
| **Composición** | Naranja | Relación fuerte (el todo contiene las partes) |
| **Agregación** | Verde | Relación débil (el todo agrupa las partes) |
| **Herencia** | Morado | Relación "es un" (generalización) |
| **Dependencia** | Gris | Relación de uso temporal |
| **Realización** | Rosa | Implementación de interfaz |

---

## 💡 Tips

1. **Los nombres de clases se capitalizan automáticamente**
   - `crear clase materia` → `Materia`

2. **Puedes escribir de forma natural**
   - `Crear relación de composición entre Materia y Alumno`
   - `Crear composición entre Materia y Alumno`

3. **El historial se guarda automáticamente**
   - Cada chat mantiene su propio diagrama
   - Puedes crear múltiples diagramas usando el botón "+ Nuevo chat"

4. **Los comandos son flexibles**
   - No importa si usas mayúsculas o minúsculas
   - El sistema detecta las palabras clave

---

## 🚀 Flujo de Trabajo Recomendado

1. **Planifica tu diagrama** - Piensa qué clases necesitas
2. **Crea las clases una por una** - Sin atributos primero
3. **Agrega atributos a cada clase** - Uno por uno
4. **Agrega métodos si es necesario**
5. **Crea las relaciones** - Define cómo se conectan las clases
6. **Revisa y ajusta** - Usa "Listar clases" para verificar

---

## ⚠️ Notas Importantes

- **Todo se hace mediante comandos** - No hay edición manual
- **Un comando a la vez** - Construye paso a paso
- **Las relaciones requieren que ambas clases existan**
- **Los atributos y métodos se agregan después de crear la clase**

---

## 🎓 Buenas Prácticas UML 2.0

1. **Atributos**: Usa notación `nombre:Tipo`
2. **Métodos**: Usa notación `nombreMetodo(parametros)`
3. **Visibilidad**: 
   - `-` para atributos privados
   - `+` para métodos públicos
4. **Nombres**: CamelCase para clases, camelCase para atributos/métodos
