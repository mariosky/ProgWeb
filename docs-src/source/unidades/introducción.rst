Introducción a las aplicaciones web
=============================================

`Ver presentación del curso <../_static/pdf/introduccion.pdf>`_

Evolución de las aplicaciones web.
------------------------------------

La Web que utilizamos hoy no apareció de manera inmediata ni fue diseñada desde el
inicio como una plataforma para aplicaciones complejas. Actualmente la usamos
para ver películas y series, informarnos y entretenernos a través de plataformas
como YouTube, realizar compras, efectuar operaciones bancarias y mantenernos en
contacto con otras personas mediante redes sociales. Sin embargo, detrás de estas
actividades cotidianas existe una evolución tecnológica que ha transformado a la
Web de un simple sistema de documentos enlazados en una plataforma completa para
el desarrollo de aplicaciones.

Su evolución está estrechamente ligada a la forma en que las personas han
buscado **acceder, organizar y relacionar información**. Desde ideas tempranas
como `As We May Think
<https://es.wikipedia.org/wiki/Como_podr%C3%ADamos_pensar>`_ de Vannevar Bush y
el concepto del *Memex*, pasando por proyectos de hipertexto como `Xanadú
<https://es.wikipedia.org/wiki/Proyecto_Xanad%C3%BA>`_ de Ted Nelson, hasta la
creación de la `World Wide Web <https://es.wikipedia.org/wiki/World_Wide_Web>`_ por Tim Berners-Lee y Robert
Cailliau, la Web surge como un sistema para conectar documentos y conocimiento.

En sus primeras etapas, la Web se basaba en un modelo sencillo: documentos
estáticos enlazados entre sí mediante hiperligas, accesibles a través de un
navegador.  

Protocolos como **HTTP**, formatos como **HTML** y conceptos como **URL** surgieron
a finales de los años ochenta como parte de una propuesta de Tim Berners-Lee en el
CERN, cuyo objetivo era facilitar el acceso y la organización de la gran cantidad
de información generada por investigadores distribuidos en distintas instituciones
y países. La solución planteada no buscaba imponer una arquitectura centralizada,
sino definir un conjunto mínimo de reglas y estándares que permitieran enlazar
documentos de manera simple y flexible a través de la red.

Este enfoque dio origen a un sistema **distribuido, descentralizado y abierto**, en
el que cualquier documento podía referenciar a otro sin depender de un repositorio
central o de un proveedor específico. Esta decisión fue clave para la adopción
masiva de la Web y explica por qué estos mismos principios siguen siendo la base de
la Web actual, aunque hoy se utilicen para construir aplicaciones mucho más
complejas que la simple publicación y consulta de documentos.

.. note::

   Como parte de esta unidad de *Introducción a las Aplicaciones Web* se
   implementará un servidor HTTP básico utilizando la librería estándar
   ``http`` de Python. El objetivo es comprender una implementación mínima y
   funcional del protocolo, que permita observar de forma directa cómo se
   reciben las peticiones y se generan las respuestas en un servidor web.

Con el paso del tiempo, los navegadores incorporaron la capacidad de ejecutar
código, y las aplicaciones web comenzaron a transformarse en sistemas
interactivos. Surgieron así aplicaciones que combinan **recursos estáticos y
dinámicos**, intercambian datos mediante APIs y utilizan formatos como **JSON**.
Este cambio marca la transición de la Web como sistema de hipermedia a la Web como
**plataforma de aplicaciones**, incluyendo enfoques modernos como las *Single Page
Applications*.


Arquitectura de las aplicaciones web
-------------------------------------

Para poder manejar esta complejidad, las aplicaciones web modernas se diseñan
siguiendo principios de **arquitectura de software**. Conceptos como la
separación en capas (interfaz de usuario, lógica de negocio y acceso a datos)
permiten construir sistemas más claros, mantenibles y escalables. En esta línea,
enfoques como la **arquitectura limpia** buscan reducir el acoplamiento con
frameworks, bases de datos o interfaces específicas, de modo que las reglas de
negocio permanezcan independientes del entorno tecnológico.

Además de las arquitecturas tradicionales, actualmente se emplean estilos
arquitectónicos orientados al **procesamiento distribuido**, como sistemas
basados en eventos, microservicios o el patrón *web–queue–worker*. Estos enfoques
permiten escalar aplicaciones, procesar grandes volúmenes de información y
desacoplar componentes, apoyándose en infraestructura y servicios de **cómputo en
la nube**.

Tecnologías para el desarrollo de aplicaciones web
--------------------------------------------------

El desarrollo de aplicaciones web no se limita al uso de un solo lenguaje o
herramienta. Existen múltiples **frameworks del lado del servidor** (como Django,
Flask o FastAPI) solo en Python, así como **frameworks del lado del cliente** (como React o Vue),
que abstraen tareas comunes y permiten al desarrollador concentrarse en la lógica
del sistema. A esto se suman herramientas para pruebas, control de versiones,
automatización, despliegue y monitoreo, que forman parte del ecosistema
profesional del desarrollo web.


Planificación de aplicaciones web
---------------------------------

Finalmente, la construcción de aplicaciones web modernas se apoya en
**metodologías de desarrollo ágiles**, que priorizan la colaboración, el software
funcionando y la capacidad de adaptación al cambio. El trabajo en equipo, la
división de responsabilidades y la mejora continua son elementos centrales en la
forma en que hoy se conciben y desarrollan estos sistemas.

Este curso se inserta en este contexto y no busca enseñar herramientas aisladas,
sino ofrecer una **visión integral** de cómo se diseñan, implementan y despliegan
aplicaciones web reales, similares a las que se desarrollan en un entorno
profesional.

