# 🚀 Ejemplos Rápidos para Probar

Copia y pega estos comandos uno por uno en el diagramador para ver cómo funciona.

---

## 📚 Ejemplo 1: Sistema Académico Básico

```
Crear clase Materia
Agregar atributo codigo:String a clase Materia
Agregar atributo nombre:String a clase Materia
Agregar atributo creditos:Integer a clase Materia
Agregar metodo calcularPromedio() a clase Materia

Crear clase Alumno
Agregar atributo matricula:String a clase Alumno
Agregar atributo nombre:String a clase Alumno
Agregar atributo edad:Integer a clase Alumno
Agregar metodo inscribirse() a clase Alumno

Crear relación de asociación entre Alumno y Materia
```

---

## 🏢 Ejemplo 2: Sistema Empresarial con Herencia

```
Crear clase Persona
Agregar atributo nombre:String a clase Persona
Agregar atributo edad:Integer a clase Persona
Agregar atributo documento:String a clase Persona

Crear clase Empleado
Agregar atributo salario:Double a clase Empleado
Agregar atributo cargo:String a clase Empleado
Agregar metodo trabajar() a clase Empleado

Crear clase Cliente
Agregar atributo codigo:String a clase Cliente
Agregar atributo tipo:String a clase Cliente
Agregar metodo comprar() a clase Cliente

Crear relación de herencia entre Empleado y Persona
Crear relación de herencia entre Cliente y Persona
```

---

## 🏫 Ejemplo 3: Universidad con Composición

```
Crear clase Universidad
Agregar atributo nombre:String a clase Universidad
Agregar atributo direccion:String a clase Universidad

Crear clase Facultad
Agregar atributo nombre:String a clase Facultad
Agregar atributo codigo:String a clase Facultad

Crear clase Departamento
Agregar atributo nombre:String a clase Departamento
Agregar atributo jefe:String a clase Departamento

Crear relación de composición entre Universidad y Facultad
Crear relación de composición entre Facultad y Departamento
```

---

## 🏥 Ejemplo 4: Sistema Hospitalario Completo

```
Crear clase Hospital
Agregar atributo nombre:String a clase Hospital
Agregar atributo direccion:String a clase Hospital

Crear clase Paciente
Agregar atributo nombre:String a clase Paciente
Agregar atributo edad:Integer a clase Paciente
Agregar atributo historial:String a clase Paciente

Crear clase Medico
Agregar atributo nombre:String a clase Medico
Agregar atributo especialidad:String a clase Medico
Agregar metodo atender() a clase Medico

Crear clase Cita
Agregar atributo fecha:Date a clase Cita
Agregar atributo hora:String a clase Cita
Agregar atributo motivo:String a clase Cita

Crear relación de composición entre Hospital y Medico
Crear relación de asociación entre Paciente y Cita
Crear relación de asociación entre Medico y Cita
```

---

## 🛒 Ejemplo 5: E-commerce con Todas las Relaciones

```
Crear clase Tienda
Agregar atributo nombre:String a clase Tienda
Agregar atributo url:String a clase Tienda

Crear clase Producto
Agregar atributo codigo:String a clase Producto
Agregar atributo nombre:String a clase Producto
Agregar atributo precio:Double a clase Producto
Agregar metodo aplicarDescuento() a clase Producto

Crear clase Cliente
Agregar atributo nombre:String a clase Cliente
Agregar atributo email:String a clase Cliente

Crear clase Pedido
Agregar atributo numero:String a clase Pedido
Agregar atributo fecha:Date a clase Pedido
Agregar atributo total:Double a clase Pedido

Crear clase CarritoCompras
Agregar atributo items:Integer a clase CarritoCompras
Agregar metodo agregar() a clase CarritoCompras

Crear relación de composición entre Tienda y Producto
Crear relación de asociación entre Cliente y Pedido
Crear relación de agregación entre Cliente y CarritoCompras
Crear relación de dependencia entre CarritoCompras y Producto
```

---

## 🎮 Ejemplo 6: Sistema de Videojuegos

```
Crear clase Juego
Agregar atributo titulo:String a clase Juego
Agregar atributo genero:String a clase Juego
Agregar metodo iniciar() a clase Juego

Crear clase Personaje
Agregar atributo nombre:String a clase Personaje
Agregar atributo nivel:Integer a clase Personaje
Agregar atributo vida:Integer a clase Personaje

Crear clase Heroe sin atributos
Agregar atributo poder:String a clase Heroe
Agregar metodo atacar() a clase Heroe

Crear clase Villano sin atributos
Agregar atributo debilidad:String a clase Villano
Agregar metodo defender() a clase Villano

Crear relación de composición entre Juego y Personaje
Crear relación de herencia entre Heroe y Personaje
Crear relación de herencia entre Villano y Personaje
```

---

## 💡 Tips para Probar

1. **Copia un ejemplo completo**
2. **Pega comando por comando** (uno a la vez)
3. **Observa cómo se construye el diagrama** paso a paso
4. **Revisa el historial** en el panel derecho
5. **Usa "Listar clases"** para ver todas las clases creadas

---

## 🎯 Comandos Útiles Durante las Pruebas

```
Listar clases
Eliminar clase NombreClase
```

---

## 🔄 Para Empezar de Nuevo

Simplemente haz clic en **"+ Nuevo chat"** en la barra lateral izquierda.
