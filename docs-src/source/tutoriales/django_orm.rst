Aplicaciones y ORM de Django
============================

En esta segunda parte se introduce el concepto de **aplicación** en Django y se
utiliza el **ORM** para definir el esquema de la base de datos.

Crear una aplicación
--------------------

Un proyecto Django puede contener múltiples **aplicaciones**, cada una encargada
de una funcionalidad específica. Las aplicaciones pueden reutilizarse en distintos
proyectos.

Para crear una app llamada ``movies``:

.. code-block:: bash

   python3 manage.py startapp movies

La estructura típica de una aplicación incluye archivos para modelos, vistas,
pruebas y administración.

.. note::

   Asegúrate de agregar a ``.gitignore`` archivos compilados de Python como
   ``*.pyc`` y directorios ``__pycache__/``.

Definir modelos con el ORM
--------------------------

El **ORM de Django** permite definir el esquema de la base de datos usando clases
Python. Django se encarga de traducir estas definiciones a tablas relacionales.

Ejemplo de modelos en ``movies/models.py``:

.. code-block:: python
   :linenos:

   from django.db import models
   from django.contrib.auth.models import User
   from django.core.validators import MaxValueValidator, MinValueValidator

   class Genre(models.Model):
       name = models.CharField(max_length=200)

       def __str__(self):
           return self.name

   class Movie(models.Model):
       title = models.CharField(max_length=200)
       overview = models.TextField()
       release_date = models.DateTimeField()
       running_time = models.IntegerField()

Agregar la aplicación al proyecto
---------------------------------

Para que Django reconozca la aplicación, debe agregarse en ``INSTALLED_APPS`` dentro
de ``settings.py``:

.. code-block:: python

   INSTALLED_APPS = [
       "movies.apps.MoviesConfig",
       "django.contrib.admin",
       "django.contrib.auth",
       "django.contrib.contenttypes",
       "django.contrib.sessions",
       "django.contrib.messages",
       "django.contrib.staticfiles",
   ]

.. note::

   Las aplicaciones incluidas por defecto proveen autenticación, sesiones y manejo
   de archivos estáticos, que se utilizarán más adelante en el curso.

Migraciones: sincronizar modelos y base de datos
------------------------------------------------

Django utiliza **migraciones** para sincronizar los modelos definidos en Python con
la base de datos real.

El flujo típico es:

.. code-block:: bash

   python manage.py makemigrations
   python manage.py migrate

Cargar datos de ejemplo
-----------------------

Para cargar datos iniciales se puede crear un **comando de administración**
personalizado. Este enfoque es útil para automatizar tareas repetitivas o
preparar entornos de prueba.

El comando ``load_movies`` inserta datos de ejemplo asumiendo una base vacía.

En esta parte logramos:

- Crear una aplicación Django.
- Definir modelos con el ORM.
- Entender el rol de las migraciones.
- Cargar datos iniciales mediante un comando personalizado.

