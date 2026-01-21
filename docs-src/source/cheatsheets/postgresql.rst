Configuración de Django con PostgreSQL
======================================

En este tutorial se muestra cómo configurar **PostgreSQL** como base de datos para
un proyecto **Django**, sustituyendo la base de datos SQLite que se utiliza por
defecto. Este tipo de configuración es común en entornos profesionales y se acerca
más a un escenario de producción.

Se asume que previamente se instaló PostgreSQL y se creó un usuario utilizando el
`playbook de Ansible
<https://github.com/mariosky/webdev-playbooks/blob/main/playbooks/postgres.yml>`_
visto en clase.

Verificar el servicio de PostgreSQL
-----------------------------------

Como primer paso, verifica que el servidor de PostgreSQL esté instalado y en
ejecución. Para ello, lista los servicios del sistema:

.. code-block:: bash

   sudo systemctl --type=service | grep postgresql

Ejemplo de salida:

.. code-block:: text

   postgresql.service               loaded active exited  PostgreSQL RDBMS
   postgresql@14-main.service       loaded active running PostgreSQL Cluster 14-main

Si no aparece ningún servicio, significa que PostgreSQL no está instalado o no se
ha iniciado correctamente. En ese caso puedes:

- Ejecutar el playbook correspondiente de Ansible, o
- Instalarlo manualmente con:

.. code-block:: bash

   sudo apt install postgresql

Conectarse al servidor PostgreSQL
---------------------------------

Una vez instalado el servidor, prueba la conexión utilizando ``psql``:

.. code-block:: bash

   psql -h localhost -U ubuntu -d django_bootstrap

El comando solicitará la contraseña del usuario. Esta contraseña se definió en el
archivo ``db_vars.yml`` del playbook de Ansible.  
Por defecto:

.. code-block:: text

   thisissomeseucrepassword

Una vez conectados, es posible ejecutar comandos SQL y comandos propios de ``psql``.

Comandos útiles de ``psql``
---------------------------

Además de SQL estándar, ``psql`` incluye comandos internos que comienzan con ``\``.

.. list-table::
   :header-rows: 1

   * - Comando
     - Acción
   * - ``\l``
     - Lista las bases de datos
   * - ``\du``
     - Muestra los usuarios (roles)
   * - ``\c``
     - Conectarse a otra base de datos
   * - ``\dt``
     - Lista las tablas
   * - ``\d+ objeto``
     - Información detallada del objeto
   * - ``\pset format wrapped``
     - Mejora el despliegue de tablas
   * - ``\e``
     - Abre un editor para escribir consultas
   * - ``\q``
     - Salir de ``psql``

Acceso como usuario administrador
---------------------------------

PostgreSQL crea por defecto un usuario del sistema llamado ``postgres``. Para
acceder como administrador:

.. code-block:: bash

   sudo -u postgres psql

Desde aquí se pueden administrar usuarios y permisos.

Ejemplos comunes:

Asignar permisos de superusuario:

.. code-block:: sql

   ALTER USER ubuntu WITH SUPERUSER;

Permitir inicio de sesión:

.. code-block:: sql

   ALTER ROLE ubuntu WITH LOGIN;

Crear un nuevo usuario:

.. code-block:: sql

   CREATE ROLE ubuntu;

Cambiar o asignar contraseña:

.. code-block:: sql

   ALTER USER user_name WITH PASSWORD 'new_password';

.. note::

   En entornos reales, otorgar privilegios de superusuario debe hacerse con
   cuidado y solo cuando sea estrictamente necesario.

Instalación de librerías en Django
----------------------------------

Para utilizar PostgreSQL con Django se requieren dos librerías principales:

- `psycopg2 <https://www.psycopg.org/docs/>`_: driver para PostgreSQL.
- `django-environ <https://django-environ.readthedocs.io/>`_: manejo de variables
  de entorno y configuración sensible.

Activa el ambiente virtual e instala las librerías:

.. code-block:: bash

   pip install psycopg2
   pip install django-environ

Si tienes problemas al instalar ``psycopg2`` debido a dependencias del sistema,
puedes usar:

.. code-block:: bash

   pip install psycopg2-binary

Ejemplo básico de conexión con psycopg2
---------------------------------------

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
-----------------------

Modifica el parámetro ``DATABASES`` en ``settings.py`` de acuerdo con la
`documentación oficial
<https://docs.djangoproject.com/en/4.2/ref/settings/#databases>`_.

Ejemplo de configuración:

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

Una vez configurado, ejecuta las migraciones:

.. code-block:: bash

   python manage.py migrate

Verifica que las tablas se hayan creado correctamente en la base de datos.

Autenticación de pares (peer authentication)
--------------------------------------------

Por defecto, PostgreSQL utiliza **autenticación por pares (peer)** en conexiones
locales. Esto significa que el usuario del sistema operativo se utiliza para
autenticar al usuario de la base de datos, sin requerir contraseña.

Este comportamiento se define en el archivo ``pg_hba.conf``:

.. code-block:: text

   # TYPE  DATABASE  USER  ADDRESS  METHOD
   local   all       all            peer

Para forzar el uso de contraseña, cambia el método a ``md5``:

.. code-block:: text

   # TYPE  DATABASE  USER  ADDRESS  METHOD
   local   all       all            md5

Métodos de autenticación comunes:

- ``peer``: confía en el usuario del sistema operativo.
- ``md5``: requiere contraseña (hash MD5).
- ``trust``: no solicita autenticación (no recomendado).

Para editar el archivo:

.. code-block:: bash

   sudo su postgres
   cd /etc/postgresql/14/main/

Después de modificarlo, reinicia el servicio:

.. code-block:: bash

   sudo systemctl restart postgresql

Respaldo y restauración de bases de datos
-----------------------------------------

Crear un respaldo:

.. code-block:: bash

   pg_dump -U user_name -h remote_host -p remote_port name_of_database > backup.sql

Restaurar un respaldo:

.. code-block:: bash

   psql -h localhost -U user_name name_of_database < backup.sql

Tarea
-----

Utilizando ``django-environ``, protege tu archivo ``settings.py`` para que las
credenciales de la base de datos se obtengan desde **variables de entorno**.

.. important::

   En producción, toda la configuración sensible (usuarios, contraseñas, hosts)
   debe manejarse como **secretos**, nunca directamente en el código fuente.

