HTML y XML
==========

`Ver presentación del curso <../_static/pdf/html-css.pdf>`_

En esta parte del curso se introducen **HTML y CSS** como las tecnologías base
para la construcción de interfaces web. Antes de hablar de estilos, animaciones o
frameworks, es fundamental comprender que la Web se apoya en documentos
**estructurados**, cuya organización permite que tanto las personas como los
programas puedan interpretar su contenido.

Introducción
------------
La estructura de un documento no es un detalle visual, sino un mecanismo para dar
significado a la información. Al igual que en un periódico o un libro, encabezados,
secciones y párrafos permiten entender qué información es más importante, cómo se
relaciona y en qué orden debe leerse. En la Web, esta estructura se expresa mediante
**lenguajes de marcas**, siendo HTML el estándar principal.

Desde el punto de vista de los datos, las aplicaciones web trabajan con distintos
niveles de estructuración. Los datos estructurados, típicos de bases de datos
relacionales, siguen esquemas rígidos y son fáciles de procesar con lenguajes como
SQL. Los datos semi estructurados, como JSON o XML, ofrecen mayor flexibilidad y
son ampliamente utilizados en la comunicación entre aplicaciones web. Por otro
lado, los datos no estructurados (como texto libre, imágenes o video) requieren
tratamiento adicional para ser procesados por programas. HTML se ubica en un punto
intermedio: es **semi estructurado**, lo que permite que sea legible tanto para
humanos como para máquinas.

HTML permite describir la **estructura lógica** de un documento web mediante
elementos y etiquetas. Estos elementos indican el propósito del contenido, no su
apariencia visual. Encabezados, párrafos, listas, enlaces, imágenes y formularios
permiten organizar la información de manera semántica, facilitando la accesibilidad,
el posicionamiento en buscadores y la reutilización del contenido en distintos
contextos.

Estructura global de un documento Web
-------------------------------------

El siguiente ejemplo muestra una estructura típica de un documento HTML5,
incluyendo encabezado, navegación, contenido principal, secciones y pie de página.
También incluye un formulario sencillo para ilustrar la interacción con el usuario.

.. code-block:: html
   :linenos:

   <!doctype html>
   <html lang="es">
     <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <title>Mi primera página</title>

       <!-- Hoja de estilos externa -->
       <link rel="stylesheet" href="styles.css" />
     </head>

     <body>
       <header>
         <h1>Programación Web</h1>
         <p>Ejemplo básico de estructura HTML5.</p>
       </header>

       <nav aria-label="Navegación principal">
         <ul>
           <li><a href="#introduccion">Introducción</a></li>
           <li><a href="#contenidos">Contenidos</a></li>
           <li><a href="#contacto">Contacto</a></li>
         </ul>
       </nav>

       <main>
         <section id="introduccion">
           <h2>Introducción</h2>
           <p>
             HTML describe la <strong>estructura</strong> del documento. CSS se
             utiliza para la <em>presentación</em>.
           </p>

           <figure>
             <img src="img/web.png" alt="Icono representando la Web" width="280" />
             <figcaption>Ejemplo de imagen con texto descriptivo.</figcaption>
           </figure>
         </section>

         <section id="contenidos">
           <h2>Contenidos</h2>
           <article>
             <h3>Elementos comunes</h3>
             <ol>
               <li>Encabezados (h1..h6)</li>
               <li>Párrafos (p)</li>
               <li>Enlaces (a)</li>
               <li>Listas (ul/ol)</li>
             </ol>

             <p>
               Un enlace a un sitio externo:
               <a href="https://developer.mozilla.org/" target="_blank" rel="noopener">
                 MDN Web Docs
               </a>
             </p>
           </article>
         </section>

         <section id="contacto">
           <h2>Formulario de contacto</h2>

           <form action="/contacto" method="post">
             <label for="nombre">Nombre</label>
             <input id="nombre" name="nombre" type="text" required />

             <label for="correo">Correo</label>
             <input id="correo" name="correo" type="email" required />

             <label for="mensaje">Mensaje</label>
             <textarea id="mensaje" name="mensaje" rows="4"></textarea>

             <button type="submit">Enviar</button>
           </form>
         </section>
       </main>

       <footer>
         <small>&copy; 2026 Programación Web</small>
       </footer>
     </body>
   </html>

Los formularios representan uno de los mecanismos más importantes de
interacción en la Web. A través de ellos, el navegador puede recolectar
información del usuario y enviarla al servidor utilizando métodos HTTP como
``GET`` o ``POST``. Comprender la estructura y los atributos de los formularios
permite entender cómo fluye la información entre el cliente y el servidor, y
por qué HTML y HTTP están estrechamente relacionados.

Lenguajes de presentación en documentos Web (*CSS, Tailwind CSS*)
-----------------------------------------------------------------
Una vez definida la estructura del documento, **CSS** se encarga de su
presentación. CSS permite controlar la apariencia visual y la distribución de los
elementos sin modificar la estructura HTML. Conceptos como el flujo normal del
documento, la propiedad ``display`` y los distintos modelos de layout permiten
entender cómo el navegador decide colocar los elementos en pantalla.

Herramientas modernas de CSS, como **Flexbox**, facilitan la construcción de
interfaces flexibles y adaptables, permitiendo alinear, distribuir y reorganizar
elementos de forma dinámica según el tamaño de la pantalla. A esto se suman las
*media queries*, que hacen posible el diseño responsivo y la adaptación del
contenido a distintos dispositivos y contextos de visualización.

El objetivo de esta unidad no es memorizar etiquetas o propiedades, sino comprender
la **separación de responsabilidades** entre estructura (HTML) y presentación
(CSS). Esta distinción es clave para construir interfaces mantenibles, accesibles y
preparadas para integrarse posteriormente con lógica del lado del cliente y del
servidor.

