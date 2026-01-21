Claves SSH para Git y GitHub
============================

En este curso se utilizará **SSH** para ejecutar comandos de ``git`` sobre
repositorios almacenados en GitHub. El uso de SSH permite autenticarse de forma
segura sin necesidad de escribir el usuario y la contraseña en cada operación.

Para ello es necesario generar un **par de llaves SSH** en el servidor o equipo
desde el cual se trabajará, y registrar la **llave pública** en la cuenta de
GitHub.

.. note::

   Como alternativa a la configuración manual de llaves SSH, también es posible
   utilizar **GitHub CLI (``gh``)**. Esta herramienta puede guiar de forma
   interactiva el proceso de autenticación con GitHub y configurar automáticamente
   el acceso mediante SSH o HTTPS.

   GitHub CLI resulta especialmente útil para usuarios que trabajan por primera vez
   con GitHub o que desean simplificar la configuración inicial del entorno.


Verificar si ya existen llaves SSH
----------------------------------

Una vez en la terminal (local o remota), revisa si ya existen llaves SSH.
Estas se almacenan en un directorio oculto llamado ``.ssh`` dentro del directorio
``HOME`` del usuario.

.. code-block:: bash

   ls -al ~/.ssh

.. note::

   - El comando ``ls`` lista el contenido de un directorio.
   - La opción ``-a`` muestra archivos ocultos.
   - La opción ``-l`` muestra información detallada.
   - El símbolo ``~`` es un alias del directorio ``HOME``.

Si el directorio no existe o está vacío, será necesario generar un nuevo par de
llaves.

Generación de un par de llaves SSH
----------------------------------

Para generar un nuevo par de llaves se recomienda usar el algoritmo **Ed25519**:

.. code-block:: bash

   ssh-keygen -t ed25519 -C "tu_email@example.com"

Durante el proceso, acepta las opciones por defecto (ubicación del archivo y
contraseña vacía).

.. note::

   El comentario (``-C``) suele ser el correo asociado a la cuenta de GitHub y
   sirve únicamente como identificador.

Si tu sistema no soporta el algoritmo Ed25519, puedes utilizar RSA:

.. code-block:: bash

   ssh-keygen -t rsa -b 4096 -C "tu_email@example.com"

Agregar la llave al agente SSH
------------------------------

El **ssh-agent** mantiene las llaves cargadas en memoria para que puedan usarse
automáticamente durante la sesión.

Inicia el agente SSH:

.. code-block:: bash

   eval "$(ssh-agent -s)"

Asumiendo que se utilizó Ed25519, agrega la llave privada al agente:

.. code-block:: bash

   ssh-add ~/.ssh/id_ed25519

.. note::

   Si utilizaste RSA, el archivo será ``id_rsa`` en lugar de ``id_ed25519``.

Agregar la llave pública a GitHub
----------------------------------

Para registrar la llave en GitHub es necesario copiar el contenido de la **llave
pública**:

.. code-block:: bash

   cat ~/.ssh/id_ed25519.pub

Copia la salida completa del comando y pégala en el formulario para agregar
llaves SSH en tu cuenta de GitHub:

- https://github.com/settings/ssh/new

.. tip::

   Nunca compartas tu **llave privada** (``id_ed25519`` o ``id_rsa``).  
   Solo la llave pública (``.pub``) debe copiarse a GitHub.

Configurar usuario y correo en Git
----------------------------------

Es importante que Git tenga configurado el nombre de usuario y el correo que
corresponden a tu cuenta de GitHub:

.. code-block:: bash

   git config --global user.name "Tu Nombre"
   git config --global user.email "tu_email@example.com"

Estos datos se utilizan para identificar al autor de los *commits*.

Cambiar un repositorio de HTTPS a SSH
-------------------------------------

Si un repositorio fue clonado originalmente usando HTTPS, es posible cambiarlo
para que utilice SSH.

Ejemplo:

.. code-block:: bash

   git remote set-url origin git@github.com:mariosky/ProgWeb.git

A partir de este momento, las operaciones como ``git pull`` o ``git push`` se
realizarán utilizando SSH.

