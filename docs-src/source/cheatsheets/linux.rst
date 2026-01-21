Comandos básicos de Linux para Programación Web
===============================================

Como desarrolladores de aplicaciones web es común trabajar con herramientas de
línea de comandos (*CLI – Command Line Interface*). Estas herramientas permiten
automatizar tareas, crear scripts y trabajar de forma más eficiente que muchas
interfaces gráficas (*GUI*).

A continuación se presentan algunos de los comandos más utilizados en Linux
(también aplicables en macOS y, en muchos casos, en Windows a través de WSL).

.. note::

   El símbolo ``$`` indica el *prompt* de la terminal y **no forma parte del
   comando**.

Navegación y manejo de directorios
----------------------------------

``pwd``
^^^^^^^

Imprime la ruta completa del directorio actual.

.. code-block:: bash

   $ pwd
   /home/mariosky


``ls -al [ruta]``
^^^^^^^^^^^^^^^^^

Lista el contenido de un directorio.

- ``a``: muestra todos los archivos, incluidos los ocultos.
- ``l``: muestra información detallada (permisos, propietario, tamaño, fecha).

.. code-block:: bash

   $ ls -al
   total 8
   drwxr-xr-x    4 mario  staff   128 Sep  6 12:18 .
   drwxr-x---+ 155 mario  staff  4960 Sep 10 12:27 ..
   drwxr-xr-x   14 mario  staff   448 Sep  6 12:22 .git
   -rw-r--r--    1 mario  staff  2111 Sep  6 12:17 tutorial.md

- ``.`` representa el directorio actual.
- ``..`` representa el directorio padre.

.. tip::

   En muchas distribuciones existe el alias ``la`` que equivale a ``ls -al``.


``mkdir <ruta>``
^^^^^^^^^^^^^^^^

Crea un directorio. Si se proporciona solo el nombre, se crea dentro del directorio
actual.

.. code-block:: bash

   $ mkdir directorio
   $ ls
   create_user.md  directorio


``cd <ruta>``
^^^^^^^^^^^^^

Cambia el directorio actual.

- ``cd nombre``: entra a un subdirectorio.
- ``cd`` (sin argumentos): regresa al directorio ``HOME``.

.. code-block:: bash

   $ cd directorio
   $ ls -al
   total 0
   drwxr-xr-x  2 mario  staff   64 Sep 10 12:33 .
   drwxr-xr-x  5 mario  staff  160 Sep 10 12:33 ..


Manejo de archivos
------------------

``mv <origen> <destino>``
^^^^^^^^^^^^^^^^^^^^^^^^^^

Mueve o renombra archivos y directorios.

.. code-block:: bash

   $ ls
   directorio
   $ mv directorio directorio_nuevo
   $ ls
   directorio_nuevo


``rm -rf <ruta>``
^^^^^^^^^^^^^^^^^^

Elimina archivos o directorios.

- ``r``: recursivo.
- ``f``: forzar eliminación sin confirmación.

.. warning::

   Este comando es **destructivo**. No existe papelera de reciclaje.
   Úsalo con cuidado, especialmente como administrador.

.. code-block:: bash

   $ rm -rf directorio_nuevo


``touch <archivo>``
^^^^^^^^^^^^^^^^^^^

Actualiza la fecha de modificación de un archivo.  
Si el archivo no existe, lo crea vacío.

Uso común: crear archivos rápidamente.

``clear``
^^^^^^^^^

Limpia la pantalla de la terminal.


Búsqueda y utilidades
---------------------

``grep <expresión>``
^^^^^^^^^^^^^^^^^^^^

Busca patrones en texto o archivos.  
Se usa comúnmente con *pipes* para filtrar la salida de otros comandos.

.. code-block:: bash

   $ ls | grep directorio
   directorio_nuevo


``history``
^^^^^^^^^^^

Muestra el historial de comandos ejecutados.

Puede combinarse con ``grep``:

.. code-block:: bash

   $ history | grep directorio
    2932  mkdir directorio
    2934  cd directorio

Para ejecutar un comando del historial:

.. code-block:: bash

   $ !2932


``df -h``
^^^^^^^^^

Muestra información del uso de disco.

- ``-h``: formato legible para humanos (*human readable*).

.. code-block:: bash

   $ df -h
   Filesystem        Size  Used Avail Capacity Mounted on
   /dev/disk3s1s1   926Gi  9.6Gi 591Gi     2%   /


Variables de entorno
--------------------

``env``
^^^^^^^

Muestra las variables de entorno del sistema.  
Estas variables se usan para configurar programas, servicios y frameworks.

.. code-block:: bash

   $ env
   LANG=en_US.UTF-8
   SHELL=/bin/zsh
   HOME=/Users/mario


``export``
^^^^^^^^^^

Crea o modifica una variable de entorno.

.. code-block:: bash

   $ export NOMBREVAR="valor"
   $ env | grep NOMBREVAR
   NOMBREVAR=valor

.. note::

   Las variables creadas con ``export`` existen solo durante la sesión actual
   de la terminal.


Transferencia de archivos
-------------------------

``scp``
^^^^^^^

*Secure Copy* permite copiar archivos entre equipos usando **SSH**.

Sintaxis general:

.. code-block:: bash

   scp [opciones] origen destino

Ejemplos:

.. code-block:: bash

   $ scp archivo.txt ubuntu@10.0.1.2:/directorio/remoto
   $ scp "Proyecto/*.*" ubuntu@10.10.0.2:/home/ubuntu/Proyecto/

.. note::

   ``scp`` cifra la transferencia y autentica al usuario mediante SSH.


Usuarios y grupos
-----------------

Agregar un usuario existente a un grupo:

.. code-block:: bash

   sudo usermod -a -G groupName userName


Ver los usuarios que pertenecen a un grupo (requiere instalar ``members``):

.. code-block:: bash

   members groupName


Ver a qué grupos pertenece un usuario:

.. code-block:: bash

   groups userName


