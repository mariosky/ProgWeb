Notas del profesor – Introducción a las Aplicaciones Web
========================================================
(Generadas por ChatGPT)

Estas notas están pensadas como guía para la exposición en clase. No buscan
leerse de forma literal, sino servir como apoyo para estructurar el discurso,
resaltar ideas clave y conectar los conceptos con la experiencia práctica del
curso.

1. La Web antes de las aplicaciones
-----------------------------------

Abrir la clase aclarando que la Web **no nació como plataforma de aplicaciones**.
Esto ayuda a que los estudiantes entiendan por qué existen muchas de las
limitaciones y decisiones de diseño actuales.

Puntos a enfatizar:

- La Web surge como un sistema para **organizar y relacionar información**.
- Ideas como *As We May Think* y el *Memex* anticipan conceptos que hoy damos por
  sentados: enlaces, historial, anotaciones.
- Proyectos como *Xanadú* muestran que el hipertexto fue una preocupación central
  mucho antes de la Web moderna.

Mensaje clave para el alumno:
“Muchas de las ideas modernas ya existían, pero la tecnología aún no las podía
implementar de forma masiva.”

2. World Wide Web: una solución simple que escala
-------------------------------------------------

Aquí conviene remarcar que la WWW triunfa por su **simplicidad**, no por ser la
solución más sofisticada.

Puntos a enfatizar:

- HTTP, HTML y URL forman un sistema **mínimo pero poderoso**.
- La Web es:
  - descentralizada
  - basada en documentos
  - tolerante al cambio
- Los recursos son mutables y enlazables.

Conexión con el curso:
“El mismo protocolo HTTP que se usó para servir documentos estáticos es el que
usamos hoy para APIs, microservicios y aplicaciones complejas.”

3. HTTP como base de todo
-------------------------

Aquí es importante desacralizar HTTP: no es algo “mágico”, es un protocolo
sencillo.

Puntos a enfatizar:

- HTTP es un modelo **request–response**.
- Todo en la Web es un **recurso**:
  - archivos
  - datos
  - acciones
- Diferenciar recursos estáticos vs dinámicos.
- Introducir la idea de *API* como una extensión natural de HTTP.

Pregunta útil para el grupo:
“¿Qué diferencia real hay entre pedir un archivo HTML y pedir un JSON?”

4. De documentos a aplicaciones
--------------------------------

Este es un punto de quiebre conceptual.

Puntos a enfatizar:

- Los navegadores evolucionan y empiezan a ejecutar código.
- JavaScript cambia el rol del navegador: pasa de visor a **cliente activo**.
- Aparecen:
  - llamadas asíncronas
  - intercambio de JSON
  - aplicaciones que ya no ‘navegan’ entre páginas

Conexión con frameworks:
“Frameworks como React o Vue no cambian HTTP, cambian cómo usamos el navegador.”

5. Arquitectura: organizar la complejidad
-----------------------------------------

Aquí es importante que los alumnos no vean la arquitectura como algo “teórico”.

Puntos a enfatizar:

- Separar responsabilidades:
  - interfaz
  - lógica
  - datos
- Arquitectura limpia como una **idea**, no una receta.
- Independencia de:
  - frameworks
  - bases de datos
  - interfaces

Ejemplo útil:
“Si mañana cambiamos React por otra cosa, ¿qué parte del sistema debería cambiar?”

6. Sistemas distribuidos y nube
--------------------------------

Aquí conecta muy bien con tus proyectos finales.

Puntos a enfatizar:

- Procesamiento distribuido no es solo ‘moda’.
- Patrones como:
  - event-driven
  - microservicios
  - web–queue–worker
- La nube permite escalar, pero **también obliga a diseñar mejor**.

Mensaje importante:
“La nube no arregla malas decisiones de diseño.”

7. Herramientas y frameworks
----------------------------

Conviene evitar listas interminables y enfocarse en el criterio de elección.

Puntos a enfatizar:

- Frameworks existen para **reducir fricción**, no para pensar por nosotros.
- Diferencia entre:
  - librería
  - framework
- El curso no está atado a una herramienta específica.

Mensaje para tranquilizar:
“No están aprendiendo Django o React: están aprendiendo a construir sistemas web.”

8. Desarrollo ágil y trabajo en equipo
--------------------------------------

Este cierre conecta con la forma de trabajar durante el semestre.

Puntos a enfatizar:

- El Manifiesto Ágil pone el foco en:
  - colaboración
  - adaptación
  - software funcionando
- El trabajo se evalúa como **sistema**, no como archivos aislados.
- El proyecto final simula un entorno profesional.

Mensaje final del bloque:
“El objetivo del curso es que entiendan cómo se construye una aplicación web
real, no solo que pase un examen.”

Cierre sugerido
---------------

Cerrar la clase con una idea clara:

- Este curso une:
  - historia
  - fundamentos técnicos
  - arquitectura
  - práctica
- Todo lo que se verá después tiene sentido dentro de este marco.

Frase de cierre posible:
“Vamos a pasar de entender qué es la Web a construir aplicaciones que viven en
ella.”

