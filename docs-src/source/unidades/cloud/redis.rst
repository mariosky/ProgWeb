Redis
=====

Redis es un sistema de almacenamiento en memoria (*in-memory database*)
basado en estructuras de datos llave-valor (*key-value store*).

Originalmente fue diseñado como un sistema extremadamente rápido para
guardar y recuperar información en memoria RAM. Debido a su velocidad y
simplicidad, Redis se utiliza ampliamente como:

- Caché (*cache*)
- Base de datos temporal
- Sistema de sesiones
- Broker de mensajes
- Cola de tareas (*message queue*)
- Sistema Pub/Sub
- Almacenamiento distribuido

Redis almacena los datos principalmente en memoria RAM, por lo que las
operaciones suelen ejecutarse en microsegundos o milisegundos.

Aunque Redis trabaja en memoria, también puede persistir los datos a
disco.

Características principales
---------------------------

- Muy rápido
- Arquitectura cliente-servidor
- Basado en TCP/IP
- Maneja múltiples tipos de datos
- Ligero y fácil de instalar
- Ideal para aplicaciones distribuidas

Redis utiliza un modelo de datos tipo:

.. code-block:: text

   llave -> valor

Por ejemplo:

.. code-block:: text

   usuario:100 -> "Mario"
   contador -> 15

Instalación con Docker
----------------------

Podemos ejecutar Redis fácilmente utilizando Docker:

.. code-block:: bash

   docker run --name redis-server -p 6379:6379 redis

Esto descarga la imagen oficial de Redis desde Docker Hub y ejecuta un
contenedor exponiendo el puerto ``6379``.

Para verificar que el contenedor está ejecutándose:

.. code-block:: bash

   docker ps

Conectarse al cliente Redis
---------------------------

Podemos abrir una terminal dentro del contenedor:

.. code-block:: bash

   docker exec -it redis-server redis-cli

Esto abre el cliente interactivo de Redis:

.. code-block:: text

   127.0.0.1:6379>

Comandos básicos llave-valor
----------------------------

Guardar un valor
~~~~~~~~~~~~~~~~

.. code-block:: text

   SET nombre "Mario"

Obtener un valor
~~~~~~~~~~~~~~~~

.. code-block:: text

   GET nombre

Resultado:

.. code-block:: text

   "Mario"

Eliminar una llave
~~~~~~~~~~~~~~~~~~

.. code-block:: text

   DEL nombre

Verificar si existe una llave
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: text

   EXISTS nombre

Incrementar un contador
~~~~~~~~~~~~~~~~~~~~~~~

Redis puede utilizarse fácilmente para contadores:

.. code-block:: text

   SET visitas 0
   INCR visitas
   INCR visitas

Resultado:

.. code-block:: text

   2

Tiempo de expiración
~~~~~~~~~~~~~~~~~~~~

Las llaves pueden expirar automáticamente:

.. code-block:: text

   SET token "abc123"
   EXPIRE token 60

La llave será eliminada después de 60 segundos.

También puede hacerse en una sola operación:

.. code-block:: text

   SETEX token 60 "abc123"

Listas y colas (Queues)
-----------------------

Redis incluye estructuras tipo lista muy útiles para implementar colas
de mensajes (*message queues*).

Una lista en Redis puede utilizarse como:

- Cola FIFO
- Cola de tareas
- Sistema productor-consumidor
- Buffer de mensajes

Agregar elementos al final de una lista
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: text

   RPUSH tareas "procesar imagen"
   RPUSH tareas "enviar correo"
   RPUSH tareas "generar reporte"

Ver elementos
~~~~~~~~~~~~~

.. code-block:: text

   LRANGE tareas 0 -1

Resultado:

.. code-block:: text

   1) "procesar imagen"
   2) "enviar correo"
   3) "generar reporte"

Consumir mensajes de la cola
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: text

   LPOP tareas

Resultado:

.. code-block:: text

   "procesar imagen"

La lista ahora contiene:

.. code-block:: text

   1) "enviar correo"
   2) "generar reporte"

Esto implementa naturalmente una cola FIFO.

Blocking Queue
~~~~~~~~~~~~~~

Redis permite esperar mensajes de manera bloqueante.

Esto es muy útil para sistemas distribuidos y workers.

Consumidor:

.. code-block:: text

   BLPOP tareas 0

El ``0`` significa esperar indefinidamente hasta que llegue un mensaje.

Productor:

.. code-block:: text

   RPUSH tareas "nuevo trabajo"

En cuanto aparece un mensaje, el consumidor lo recibe inmediatamente.

Arquitectura Producer-Consumer
------------------------------

Redis es muy utilizado para implementar el patrón productor-consumidor.

.. code-block:: text

   Producer ---> Redis Queue ---> Worker/Consumer

Por ejemplo:

- Un servidor web recibe peticiones
- Las agrega a Redis
- Workers independientes procesan las tareas

Esto desacopla los componentes y mejora la escalabilidad.

Ejemplo típico:

- Generación de PDFs
- Envío de correos
- Procesamiento de imágenes
- Inferencia de modelos de IA
- Procesamiento distribuido

Persistencia
------------

Aunque Redis trabaja principalmente en memoria RAM, puede guardar datos
en disco utilizando:

- Snapshots (RDB)
- Append Only File (AOF)

Esto permite recuperar información después de reiniciar el servidor.

Redis como Message Queue
------------------------

Redis es una excelente opción para colas ligeras y rápidas.

Ventajas:

- Muy rápido
- Fácil de usar
- Baja latencia
- Ideal para sistemas pequeños y medianos

Limitaciones:

- No reemplaza completamente sistemas especializados como RabbitMQ o Kafka
- Los mensajes pueden perderse dependiendo de la configuración
- Menos garantías de entrega

Sin embargo, para muchos sistemas web y proyectos académicos,
Redis es una solución extremadamente práctica y eficiente.
