Django con PostgreSQL
=====================

Una vez conectado al servidor podemos ejecutar comandos SQL. Además,
también hay comandos propios de ``psql``:

.. list-table:: Comandos útiles de psql
    :header-rows: 1

    * - Comando
      - Acción
    * - ``\l``
      - Lista las bases de datos
    * - ``\du``
      - Muestra los usuarios
    * - ``\c``
      - Conectarse a otra BD
    * - ``\q``
      - Salir de psql
    * - ``\dt``
      - Lista las tablas
    * - ``\d+ objeto``
      - Información detallada del objeto
    * - ``\pset format wrapped``
      - Mejora el despliegue de tablas
    * - ``\e``
      - Abre un editor para consultas


Crear un nuevo usuario:

.. code-block:: sql

    CREATE ROLE ubuntu;

Podemos asignar al usuario ``ubuntu`` el rol de administrador:

.. code-block:: sql

    ALTER USER ubuntu WITH SUPERUSER;

Permitir login:

.. code-block:: sql

    ALTER ROLE ubuntu WITH LOGIN;


Cambiar o agregar password:

.. code-block:: sql

    ALTER USER user_name WITH PASSWORD 'new_password';


Instalación de librerías
========================

Requerimos dos librerías para configurar PostgreSQL con Django:

- `psycopg2 <https://www.psycopg.org/docs/>`_: conexión eficiente a PostgreSQL
- `django-environ <https://django-environ.readthedocs.io/en/latest/quickstart.html>`_:
  manejo de variables de entorno

Activa el ambiente y ejecuta:

.. code-block:: bash

    pip install psycopg2
    pip install django-environ

En caso de problemas con dependencias, usar:

.. code-block:: bash

    pip install psycopg2-binary

Ejemplo de uso:

.. code-block:: python

    import psycopg2

    conn = psycopg2.connect(
        "dbname=django_bootstrap user=ubuntu password=thisissomeseucrepassword"
    )
    cur = conn.cursor()
    cur.execute("SELECT CURRENT_DATE")
    records = cur.fetchall()
    print(records)


Configuración de Django
=======================

Modifica el parámetro ``DATABASES`` en ``settings.py`` según la
`documentación oficial <https://docs.djangoproject.com/en/4.2/ref/settings/#databases>`_.

Ejemplo:

.. code-block:: python

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": "django_bootstrap",
            "USER": "ubuntu",
            "PASSWORD": "thisissomeseucrepassword",
            "HOST": "127.0.0.1",
            "PORT": "5432",
        }
    }

Ahora simplemente ejecutamos:

.. code-block:: bash

    python manage.py migrate

Verifica que las tablas se crearon correctamente en la base de datos.


Autenticación de Pares
======================

Por defecto, PostgreSQL utiliza autenticación de tipo ``peer``. Esto significa que
los programas que se conectan mediante sockets de Linux utilizan el usuario del sistema operativo.

Esto evita el uso de contraseñas, ya que la autenticación la realiza el sistema operativo.

Si necesitamos autenticación con contraseña, debemos modificar el archivo ``pg_hba.conf``:

.. code-block:: text

    # TYPE DATABASE USER ADDRESS METHOD
    local  all      all          peer

Cambiar a:

.. code-block:: text

    # TYPE DATABASE USER ADDRESS METHOD
    local  all      all          md5

Tipos de autenticación:

- ``peer``: confía en el usuario del sistema
- ``md5``: requiere contraseña (hash MD5)
- ``trust``: no requiere autenticación (no recomendado)

Para editar este archivo:

.. code-block:: bash

    sudo su postgres

Ejemplo de ubicación:

.. code-block:: bash

    cd /etc/postgresql/14/main/

Después de modificar:

.. code-block:: bash

    sudo systemctl restart postgresql


Backup
======

Respaldo de base de datos:

.. code-block:: bash

    pg_dump -U user_name -h remote_host -p remote_port name_of_database > backup.sql

Restaurar respaldo:

.. code-block:: bash

    psql -h localhost -U user_name name_of_database < backup.sql


Tarea
=====

Utilizando ``django-environ``, protege tu archivo ``settings.py`` para
usar variables de entorno en el password de la base de datos.

En producción, es recomendable que **toda la configuración de ``DATABASES``**
sea gestionada mediante variables de entorno.
