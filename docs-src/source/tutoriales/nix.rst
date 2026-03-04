============================================================
Guía de Configuración: Entorno de Desarrollo con Nix Flakes
============================================================

Introducción
------------

En este curso utilizaremos `Nix <https://nixos.org/>`_ para gestionar nuestro entorno de desarrollo de forma aislada y reproducible. 

Nix nos permite asegurar que todos tengamos exactamente las mismas versiones de Python, Node.js y PostgreSQL, evitando el clásico error de "en mi máquina funciona".

1. Instalación de Nix (Ubuntu / WSL)
------------------------------------

Si estás en una instalación limpia de Ubuntu o Windows Subsystem for Linux (WSL), ejecuta el instalador oficial en modo *daemon*:

.. code-block:: bash

    sh <(curl -L [https://nixos.org/nix/install](https://nixos.org/nix/install)) --daemon

* **Nota:** Responde "Yes" a las preguntas del instalador. Se te pedirá la contraseña de ``sudo``.
* Al finalizar, reinicia tu terminal o ejecuta el comando que te indique el instalador para cargar las variables de entorno.

2. Habilitar Nix Flakes
-----------------------

Nix Flakes es la característica que nos permite definir el entorno en un archivo. Para activarlo, ejecuta:

.. code-block:: bash

    mkdir -p ~/.config/nix
    echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf

3. Configuración del Proyecto
-----------------------------

Ahora prepararás la carpeta donde trabajarás. Sigue estos pasos:

1. Crea tu carpeta de trabajo y entra en ella:
   
   .. code-block:: bash

      mkdir mi-proyecto-web && cd mi-proyecto-web

2. Crea un archivo llamado ``flake.nix`` y pega el siguiente contenido:

.. code-block:: nix

    {
      description = "Entorno Curso ProgWeb";

      inputs = {
        nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
      };

      outputs = { self, nixpkgs }:
        let
          system = "x86_64-linux";
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          devShells.${system}.default = pkgs.mkShell {
            buildInputs = with pkgs; [
              # Backend & Frontend (Versiones actualizadas)
              python312 
              python312Packages.django
              nodejs_20 
              nodePackages.yarn

              # Infraestructura
              postgresql_15 
              redis

              # Herramientas
              tmux neovim git curl
            ];

            shellHook = ''
              # Configuración de Postgres Local
              export PGDATA="$PWD/.postgres_data"
              export PGHOST="/tmp" 
              
              # Inicialización automática de BD si no existe
              if [ ! -d "$PGDATA" ]; then
                initdb --auth=trust --no-locale --encoding=UTF8 > /dev/null
              fi
              
              # Alias de ayuda
              alias db-start="pg_ctl start -l $PGDATA/logfile -o '-k /tmp'"
              alias db-stop="pg_ctl stop"

              echo "--- Entorno de ProgWeb activado ---"
              echo "Python: $(python --version)"
              echo "Comandos: db-start (iniciar DB), db-stop (parar DB)"
            '';
          };
        };
    }

4. Entrar al Entorno
--------------------

Cada vez que quieras trabajar en el curso, entra a la carpeta y ejecuta:

.. code-block:: bash

    nix develop

La primera vez, Nix descargará todas las herramientas (esto puede tardar unos minutos). Las siguientes veces será instantáneo.

Tips:
-----

.. tip::

   **Base de Datos:** Al entrar al entorno, usa el comando ``db-start`` para iniciar PostgreSQL. Los datos se guardarán en la carpeta local ``.postgres_data/``.

.. warning::

   Si usas **Git**, asegúrate de ignorar los archivos temporales. Crea un archivo ``.gitignore`` y añade:
   
   * ``.postgres_data/``
   * ``.direnv/`` (si decides usarlo después)

.. note::

   Si usas **Tmux**, te recomendamos iniciarlo **después** de haber ejecutado ``nix develop`` para que todas las ventanas hereden el entorno de desarrollo automáticamente.

5. Personalización: Agregar más Software
----------------------------------------

Si necesitas herramientas adicionales, como ``pip`` para instalar librerías específicas o ``venv`` para crear entornos virtuales tradicionales dentro de Nix, sigue estos pasos:

1. Abre tu archivo ``flake.nix``.
2. Busca la sección ``buildInputs``.
3. Añade los paquetes necesarios. Para Python 3.12, los paquetes se llaman ``python312Packages.pip`` y el módulo ``venv`` ya viene incluido en el paquete base de Python en Nix.

Tu archivo debería verse así:

.. code-block:: nix

    buildInputs = with pkgs; [
      # Backend con herramientas de gestión de paquetes
      python312
      python312Packages.django
      python312Packages.pip  # <--- Agregamos PIP
      
      nodejs_20
      # ... resto de paquetes
    ];

4. **Configuración para venv:** Nix es un sistema de archivos de "solo lectura". Para que ``pip`` y ``venv`` funcionen sin errores de permisos, añade estas líneas a tu ``shellHook``:

.. code-block:: nix

    shellHook = ''
      # Crear un entorno virtual si no existe
      if [ ! -d ".venv" ]; then
        python -m venv .venv
      fi
      source .venv/bin/activate
      
      # ... resto de tu shellHook (Postgres, etc.)
    '';

5. Guarda el archivo y aplica los cambios:
   Para que Nix reconozca los nuevos paquetes, simplemente sal de la terminal actual (o presiona ``Ctrl+D``) y vuelve a entrar con:

   .. code-block:: bash

      nix develop

.. note::
   
   Al añadir el código de ``venv`` al ``shellHook``, cada vez que hagas ``nix develop``, tu entorno virtual se activará automáticamente y podrás usar ``pip install <paquete>`` de forma normal.

5. Salir del Entorno
--------------------

Cuando hayas terminado de trabajar y quieras volver a tu terminal normal (fuera del entorno de desarrollo), tienes dos opciones:

1. **Comando exit:** Escribe ``exit`` y presiona Enter.
2. **Atajo de teclado:** Presiona ``Ctrl + D``.

**¿Qué sucede al salir?**

* Tus variables de entorno (como el acceso a ``pg_ctl`` o ``python3.12``) desaparecerán de la sesión actual.
* Los servicios como Postgres o Redis **seguirán corriendo** en segundo plano a menos que los hayas detenido con ``db-stop``. 
* Tu terminal volverá a mostrar su aspecto original (sin los dobles paréntesis).

.. warning::

   Si usaste **Tmux** dentro de Nix, primero debes cerrar todas tus ventanas de Tmux o salir de la sesión de Tmux antes de que el comando ``exit`` te devuelva a tu terminal base.


