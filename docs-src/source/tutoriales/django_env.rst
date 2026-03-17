Uso de variables de entorno (.env) en Django
============================================

En aplicaciones reales de Django, es una **mala práctica** almacenar información sensible
directamente en el archivo ``settings.py``. Esto incluye datos como:

- Claves secretas (``SECRET_KEY``)
- Credenciales de base de datos
- Configuraciones específicas de despliegue

Para resolver este problema, se utilizan **variables de entorno**, comúnmente gestionadas
mediante un archivo ``.env``.

¿Por qué usar un archivo .env?
------------------------------

El uso de un archivo ``.env`` permite separar la configuración sensible del código fuente.

**Ventajas principales:**

- 🔒 **Seguridad**: evita exponer credenciales en repositorios (por ejemplo, en GitHub)
- 🔄 **Portabilidad**: permite cambiar configuraciones entre desarrollo, pruebas y producción
- 👥 **Trabajo en equipo**: cada desarrollador puede tener su propia configuración local
- ⚙️ **Buenas prácticas**: es el estándar en aplicaciones modernas (12-factor apps)

Ejemplo de problema sin ``.env``:

.. code-block:: python

    SECRET_KEY = "django-insecure-123456"
    PASSWORD = "masterkey"

Si este código se sube a un repositorio público, las credenciales quedan expuestas.

Uso de python-environ
---------------------

Para manejar variables de entorno en Django, utilizamos la librería
``django-environ``.

Instalación:

.. code-block:: bash

    pip install django-environ

Configuración en ``settings.py``
--------------------------------

Primero, importamos y configuramos el entorno:

.. code-block:: python

    from pathlib import Path
    import environ
    import os

    env = environ.Env(
        DEBUG=(bool, True)
    )

    BASE_DIR = Path(__file__).resolve().parent.parent
    environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

Luego, utilizamos las variables definidas en el archivo ``.env``:

.. code-block:: python

    SECRET_KEY = env('SECRET_KEY')
    DEBUG = env('DEBUG')
    ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')

Configuración de la base de datos con .env
------------------------------------------

En lugar de definir credenciales directamente en el código:

.. code-block:: python

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": "django_database",
            "USER": "django",
            "PASSWORD": "masterkey",
            "HOST": "127.0.0.1",
            "PORT": "5432",
        }
    }

Podemos usar variables de entorno:

.. code-block:: python

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env('DB_NAME'),
            "USER": env('DB_USER'),
            "PASSWORD": env('DB_PASSWORD'),
            "HOST": env('DB_HOST'),
            "PORT": env('DB_PORT'),
        }
    }

Ejemplo de archivo .env
-----------------------

El archivo ``.env`` se coloca en la raíz del proyecto:

.. code-block:: bash

    SECRET_KEY=django-insecure-abc123
    DEBUG=True
    ALLOWED_HOSTS=127.0.0.1,localhost

    DB_NAME=django_database
    DB_USER=django
    DB_PASSWORD=masterkey
    DB_HOST=127.0.0.1
    DB_PORT=5432


.. note::

    - El archivo ``.env`` **NO debe subirse al repositorio**.
    - Agregarlo al archivo ``.gitignore``:

    .. code-block:: bash

    .env

    - En producción, las variables de entorno suelen configurarse directamente en el sistema
    (por ejemplo, en Docker, AWS, o servidores Linux).


.. note::
   
    Buenas prácticas adicionales

    - Usar valores por defecto cuando sea apropiado:

    .. code-block:: python

        DEBUG = env.bool('DEBUG', default=False)

    - Separar configuraciones por entorno (development, staging, production)
    - Validar variables críticas al iniciar la aplicación

