Arquitecturas en la nube y contenedores Docker
==============================================

Introducción
------------

Como parte de la evolución de la computación en la nube, surgió la necesidad de
desplegar aplicaciones de manera más rápida, consistente y eficiente.
En este contexto, los contenedores Docker se han convertido en una pieza fundamental.

Los contenedores son paquetes ejecutables de software que son:

* ligeros
* aislados
* rápidos de iniciar

Esto los hace ideales para aplicaciones modernas, especialmente en sistemas
distribuidos.

Una forma intuitiva de entender los contenedores es compararlos con un "jail"
(como en sistemas BSD
https://docs.freebsd.org/es/books/handbook/jails/#jails-intro) o una "sandbox".

En este sentido, un contenedor es:

    Un proceso aislado que cree que corre dentro de su propio sistema.

Cada contenedor:

* Tiene su propio sistema de archivos
* Tiene su propio espacio de procesos
* Tiene su propia red (virtual)
* No ve directamente otros contenedores

Esta analogía es útil para entender el aislamiento.

Sin embargo, es importante notar que:

    Un contenedor NO es una máquina virtual.

Tecnología subyacente en Linux
------------------------------

Los contenedores Docker se apoyan en características del kernel de Linux.
Las dos más importantes son:

Namespaces
^^^^^^^^^^

Los *namespaces* permiten aislar distintos aspectos del sistema:

* PID namespace → procesos aislados
* NET namespace → red aislada
* MNT namespace → sistema de archivos
* UTS namespace → hostname
* IPC namespace → comunicación entre procesos

Gracias a esto, cada contenedor "cree" que está solo en el sistema.

cgroups (Control Groups)
^^^^^^^^^^^^^^^^^^^^^^^^

Los *cgroups* permiten limitar y controlar recursos:

* CPU
* Memoria
* I/O
* Número de procesos

Esto evita que un contenedor consuma todos los recursos del sistema.

Sistema de archivos en capas
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Docker utiliza un sistema de archivos por capas (*layered filesystem*).

Cada imagen se construye como una pila de capas:

.. code-block:: text

    Layer 1: Sistema base (Linux mínimo)
    Layer 2: Librerías
    Layer 3: Aplicación (Redis, Python, etc.)

Esto permite:

* Reutilización eficiente
* Menor uso de espacio
* Construcción rápida de imágenes

Diferencia con máquinas virtuales
---------------------------------

.. code-block:: text

    Máquina virtual:
        Hardware virtual → Kernel → Aplicaciones

    Contenedor:
        Kernel compartido → Aplicaciones aisladas

Los contenedores:

* Comparten el kernel del host
* Son más ligeros
* Arrancan más rápido


Contenedores e imágenes
-----------------------

Un contenedor se construye a partir de una **imagen**. Una imagen incluye todo
lo necesario para ejecutar una aplicación:

* Código fuente
* Runtime de Linux
* Librerías
* Variables de entorno
* Archivos de configuración

Podemos representar esta relación como:

.. code-block:: text

    Imagen → Contenedor en ejecución

El contenedor es una instancia activa de la imagen.


Aislamiento y comunicación
--------------------------

Aunque los contenedores están aislados entre sí y del sistema anfitrión, pueden
comunicarse mediante canales bien definidos, por ejemplo:

* redes internas de Docker
* puertos expuestos
* sockets

Esta capacidad permite construir arquitecturas distribuidas incluso dentro de
una misma máquina.

Por ejemplo:

.. code-block:: text

    [ API ] ↔ [ Redis ] ↔ [ Base de datos ]

Cada componente puede ejecutarse en su propio contenedor.

Infraestructura como código con Docker
======================================

Una ventaja muy importante de
:contentReference[oaicite:0]{index=0}
es la capacidad de expresar la infraestructura como código (*Infrastructure as Code*, IaC).

Esto significa que podemos definir cómo debe ejecutarse nuestra aplicación utilizando archivos de texto,
en lugar de configuraciones manuales.

Motivación
----------

Tradicionalmente, configurar un entorno implicaba:

* instalar dependencias manualmente
* configurar servicios uno por uno
* ajustar variables de entorno
* documentar pasos (muchas veces incompletos)

Esto generaba problemas como:

* inconsistencias entre entornos
* errores difíciles de reproducir
* dependencia del conocimiento individual

Con Docker, todo esto se describe de manera declarativa.

Dockerfile como infraestructura
-------------------------------

Un **Dockerfile** define cómo construir una imagen:

.. code-block:: dockerfile

    FROM python:3.11

    WORKDIR /app

    COPY requirements.txt .
    RUN pip install -r requirements.txt

    COPY . .

    CMD ["python", "app.py"]

Este archivo describe completamente:

* el entorno base
* las dependencias
* la aplicación
* el comando de ejecución

Docker Compose como orquestación
--------------------------------

Para múltiples servicios utilizamos
:contentReference[oaicite:1]{index=1}:

.. code-block:: yaml

    version: "3.9"

    services:

      api:
        build: .
        ports:
          - "8000:8000"

      redis:
        image: redis:7
        ports:
          - "6379:6379"

Este archivo define:

* qué servicios existen
* cómo se conectan
* qué puertos exponen
* qué imágenes utilizan

Reproducibilidad
----------------

Una gran ventaja es que cualquier persona puede ejecutar:

.. code-block:: bash

    docker compose up

y obtener exactamente el mismo entorno.

Esto garantiza:

* consistencia entre desarrollo y producción
* facilidad de despliegue
* reducción de errores

Versionamiento
--------------

Al ser archivos de texto, estos pueden versionarse con herramientas como Git.

Esto permite:

* rastrear cambios en la infraestructura
* revertir configuraciones
* colaborar en equipo


¿Qué es Docker Hub?
------------------

DockerHub es un repositorio de imágenes.

Permite:

* Descargar imágenes
* Compartir configuraciones
* Versionar entornos

Ejemplo:

.. code-block:: bash

    docker pull redis

Ejecutando contenedores con docker run
--------------------------------------

El comando más básico:

.. code-block:: bash

    docker run redis

Ejemplo práctico:

.. code-block:: bash

    docker run -d -p 6379:6379 --name mi-redis redis

Parámetros:

* ``-d``: segundo plano
* ``-p``: mapeo de puertos
* ``--name``: nombre del contenedor

Comandos básicos de Docker
--------------------------

Listar contenedores activos:

.. code-block:: bash

    docker ps

Listar todos los contenedores (incluyendo detenidos):

.. code-block:: bash

    docker ps -a

Listar imágenes disponibles:

.. code-block:: bash

    docker images

(Nota: a veces se confunde con ``docker ls``, pero el comando correcto es ``docker ps`` o ``docker images``.)

Detener un contenedor:

.. code-block:: bash

    docker stop mi-redis

Eliminar un contenedor:

.. code-block:: bash

    docker rm mi-redis

Forzar eliminación de un contenedor en ejecución:

.. code-block:: bash

    docker kill mi-redis

Eliminar una imagen:

.. code-block:: bash

    docker rmi redis

Ver logs de un contenedor:

.. code-block:: bash

    docker logs mi-redis

Docker Compose
--------------

Compose permite definir múltiples contenedores.

Ejemplo:

.. code-block:: yaml

    version: "3.9"

    services:
      redis:
        image: redis:7
        ports:
          - "6379:6379"

Ejecutar:

.. code-block:: bash

    docker compose up

Detener:

.. code-block:: bash

    docker compose down

Dockerfile
----------

Un **Dockerfile** define cómo construir una imagen personalizada.

Ejemplo:

.. code-block:: dockerfile

    FROM redis:7

    COPY redis.conf /usr/local/etc/redis/redis.conf

    CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]

Construir la imagen:

.. code-block:: bash

    docker build -t mi-redis .

Flujo de trabajo
----------------

.. code-block:: text

    Dockerfile → docker build → Imagen → docker run → Contenedor

o con Compose:

.. code-block:: text

    docker-compose.yml → docker compose up → servicios

Resumen
-------

Conceptos clave:

* Contenedor: instancia en ejecución
* Imagen: plantilla
* Docker Hub: repositorio
* docker run: ejecutar contenedores
* Docker Compose: múltiples servicios
* Dockerfile: construir imágenes

Docker permite crear entornos reproducibles, lo cual es fundamental en el desarrollo de
servicios modernos como APIs, bases de datos y sistemas distribuidos.
