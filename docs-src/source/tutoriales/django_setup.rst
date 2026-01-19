Primeros pasos con Django
=========================

Este tutorial introduce el flujo básico para iniciar un proyecto con **Django**,
desde la preparación del entorno hasta la definición de modelos con el ORM.
El objetivo es construir una base sólida sobre la cual se desarrollarán
aplicaciones web más complejas a lo largo del curso.

.. note::

   Aunque se menciona Ubuntu 24.04, los ejemplos mostrados utilizan Ubuntu 22.04
   (*jammy*). Los pasos son equivalentes para ambas versiones.


Entorno, proyecto y servidor de desarrollo
==========================================

En esta primera parte se prepara el entorno de trabajo, se instala Django y se
crea un proyecto inicial. El enfoque debe estar en entender **qué se está creando** y
**por qué**, no solo en teclear (o pegar) los comandos.

Verificar el sistema operativo
------------------------------

Se asume que estamos trabajando en una instancia Linux (Ubuntu). Puedes verificar
la versión con:

.. code-block:: bash

   lsb_release -a

Crear un ambiente virtual
-------------------------

Un `ambiente virtual de Python
<https://docs.python.org/3/tutorial/venv.html>`_ permite aislar dependencias y
versiones de librerías por proyecto. Esto evita conflictos y facilita reproducir
el entorno en otros equipos o servidores.

Recomendaciones importantes:

- Cada proyecto debe tener su propio ambiente virtual.
- El ambiente virtual **no debe versionarse (agregar a git)**.
- Si vive dentro del repositorio, debe agregarse a ``.gitignore``.

En este ejemplo, el ambiente se crea en el directorio HOME y se llama
``django-venv``. Esto es para reutilizar el mismo ambiente en varios 
proyectos que utilizan las mismas librerías. Otra opción es ponerlo en 
el mismo directorio del proyecto.


.. code-block:: bash

   python3 -m venv django-venv

Activar y desactivar el ambiente
--------------------------------

Desde ``HOME``: 

.. code-block:: bash

   source django-venv/bin/activate

Para desactivarlo:

.. code-block:: bash

   deactivate

Cuando el ambiente está activo, suele aparecer en el prompt:

.. code-block:: text

   (django-venv) ubuntu@ip:~$

Instalar Django
---------------

Con el ambiente activado, instalamos Django usando ``pip``:

.. code-block:: bash

   pip install django

Para revisar las librerías instaladas:

.. code-block:: bash

   pip freeze

Ejemplo de salida:

.. code-block:: text

   Django==4.2.6
   asgiref==3.7.2
   sqlparse==0.4.4
   typing_extensions==4.8.0

Guardar dependencias
--------------------

Para documentar el entorno y poder reproducirlo más adelante, guarda las
dependencias en ``requirements.txt``:

.. code-block:: bash

   pip freeze > requirements.txt

.. important::

   No es necesario reinstalar dependencias en este momento. Este archivo se
   utilizará más adelante o en otros entornos. Al subir este proyecto a GitHub,
   nos permite clonarlo en otra máqiuina y recrear el ambiente con el comando: 
   ``pip install -r requirements.txt``.

Crear el proyecto Django
------------------------

Un **proyecto** en Django define la configuración global del sitio: ajustes,
URLs principales, servidor WSGI/ASGI, etc.

Para crear un proyecto llamado ``mymovies``:

.. code-block:: bash

   django-admin startproject mymovies

Para inspeccionar la estructura del proyecto:

.. code-block:: bash

   tree mymovies

Ejemplo:

.. code-block:: text

   mymovies/
   ├── manage.py
   └── mymovies
       ├── settings.py
       ├── urls.py
       ├── asgi.py
       └── wsgi.py

Configurar acceso remoto
------------------------

Si el proyecto se probará desde otra máquina o usando una IP pública, es necesario
agregar el host en ``ALLOWED_HOSTS`` dentro de ``settings.py``:

.. code-block:: python

   ALLOWED_HOSTS = ["otro.host.com", "web.ddns.net"]

Ejecutar el servidor de desarrollo
----------------------------------

Django incluye un servidor de desarrollo integrado. Para aceptar conexiones
externas:

.. code-block:: bash

   python3 manage.py runserver 0.0.0.0:8000

.. warning::

   El servidor de desarrollo **no está diseñado para producción**. Se utiliza
   únicamente con fines educativos y de desarrollo local.

.. note::

   Recuerda conectarte por ``http://``. El servidor de desarrollo de Django no
   soporta HTTPS en este modo. Al acceder desde el navegador es posible que se
   muestre un aviso indicando que la conexión **no es segura** o que el sitio no
   utiliza cifrado. Esto es **normal y esperado** en un entorno de desarrollo, ya
   que no se ha configurado un certificado SSL/TLS.

   En un entorno de producción, el uso de HTTPS es obligatorio y se gestiona a
   través de servidores web o servicios externos (por ejemplo Nginx, Apache,
   balanceadores de carga o servicios en la nube).


En esta primera parte se logró:

- Crear un ambiente virtual aislado.
- Instalar Django.
- Crear un proyecto base.
- Ejecutar el servidor de desarrollo.


