Uso de Telnet para realizar solicitudes HTTP
--------------------------------------------

Es posible realizar solicitudes HTTP **manualmente** utilizando ``telnet``,
ya que HTTP es un protocolo de **texto plano**, basado en un modelo de
*petición–respuesta* que opera sobre **TCP**. Aunque no es una técnica utilizada
en aplicaciones modernas, resulta una **herramienta de diagnóstico muy útil**
para comprender el funcionamiento del protocolo HTTP y para probar la
conectividad y el comportamiento básico de un servidor web.

Este enfoque permite observar directamente cómo se construyen y se interpretan
las solicitudes HTTP, sin la abstracción que introducen navegadores o
bibliotecas cliente.

Requisitos previos
~~~~~~~~~~~~~~~~~~

Antes de comenzar, es necesario contar con los siguientes elementos:

- **Cliente Telnet**  
  ``telnet`` suele estar disponible por defecto en sistemas Linux y macOS.
  En Windows, el *Telnet Client* es una característica opcional que debe
  habilitarse desde *Turn Windows features on or off*.

- **Servidor objetivo**  
  Se requiere el nombre del host o la dirección IP del servidor web, así como
  el puerto en el que está escuchando.

  - El puerto por defecto para HTTP es **80**.
  - ``telnet`` **no puede utilizarse con HTTPS** (puerto 443), ya que este
    protocolo requiere cifrado TLS. Para ese caso se utilizan herramientas como
    ``openssl``.

Guía paso a paso
~~~~~~~~~~~~~~~~

1. **Abrir una terminal o símbolo del sistema.**

2. **Conectarse al servidor web** utilizando el comando ``telnet``, indicando
   el host y el puerto:

   .. code-block:: bash

      telnet example.com 80

   Sustituye ``example.com`` por el nombre del servidor o su dirección IP, y
   ``80`` por el puerto correspondiente si es distinto.

3. **Verificar la conexión.**  
   Si la conexión es exitosa, normalmente se mostrará un mensaje como:

   ::

      Connected to example.com

   o bien una pantalla en blanco con un cursor parpadeando.

   .. note::

      En algunos clientes Telnet de Windows puede que no se muestren los
      caracteres que escribes (eco local deshabilitado), pero la información se
      envía correctamente al servidor.

4. **Escribir la solicitud HTTP**, presionando *Enter* al final de cada línea.

   Una solicitud HTTP/1.1 **requiere obligatoriamente** el encabezado ``Host``,
   así como una línea vacía final que indica el fin de la solicitud.

   Ejemplo de una solicitud **GET** (para obtener el contenido de una página):

   .. code-block:: text

      GET /path/to/page.html HTTP/1.1
      Host: example.com

   (Presiona *Enter* dos veces después de la línea ``Host``).

   Ejemplo de una solicitud **HEAD** (para obtener únicamente los encabezados):

   .. code-block:: text

      HEAD /path/to/page.html HTTP/1.1
      Host: example.com

   (Presiona *Enter* dos veces después de la línea ``Host``).

5. **Observar la respuesta del servidor.**  
   El servidor enviará el código de estado HTTP, los encabezados y, en el caso
   de ``GET``, el contenido solicitado. Toda esta información se mostrará
   directamente en la terminal.

6. **Cerrar la conexión.**  
   Para cerrar la sesión Telnet, presiona la combinación de escape
   (normalmente ``Ctrl + ]``) y luego escribe:

   ::

      quit

Ejemplo completo
~~~~~~~~~~~~~~~~

El siguiente ejemplo muestra una solicitud ``GET`` manual a la página principal
de un servidor web:

.. code-block:: bash

   telnet www.google.com 80

Salida típica:

::

   Connected to www.google.com.
   Escape character is '^]'.
   GET / HTTP/1.1
   Host: www.google.com

Después de presionar *Enter* por segunda vez, el servidor enviará los
**encabezados HTTP** y el **contenido HTML crudo**, que se imprimirá
directamente en la terminal.

Este ejercicio ilustra de manera clara que HTTP es un protocolo sencillo,
basado en texto, y ayuda a comprender cómo las herramientas de más alto nivel
(FastAPI, navegadores o bibliotecas cliente) abstraen estos detalles en el
desarrollo de servicios web modernos.

