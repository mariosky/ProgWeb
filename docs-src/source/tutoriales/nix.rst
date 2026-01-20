Guía de Configuración: Entorno de Desarrollo con Nix Flakes
============================================================

Introducción
------------

En este curso utilizaremos `Nix <https://nixos.org/>`_ para gestionar nuestro entorno de desarrollo. 

¿Qué es Nix y Nix Flakes?
~~~~~~~~~~~~~~~~~~~~~~~~~

Nix es un gestor de paquetes que nos permite tener entornos aislados y
reproducibles. A diferencia de instalar el software que necesitamos utilizando
``apt`` o ``brew``, Nix no instala cosas "en tu sistema", sino en un almacén
inmutable.

**Nix Flakes** es la evolución moderna de Nix. Funciona mediante un archivo ``flake.nix`` que actúa como un contrato:

* **Reproducibilidad Pura:** Si funciona en mi máquina, funciona en la tuya.
  Garantiza las mismas versiones de Python, Node, Postgres y otros requerimentos byte por byte.

* **Sin Conflictos:** Puedes tener Python 3.11 en este proyecto y Python 3.8 en otro sin que choquen.

* **Efímeros:** El entorno existe solo mientras lo necesitas. Al salir, tu terminal vuelve a su estado original.

* **Declarativo:** Todo el entorno se define en código. No necesitas copiar y pegar comandos para 
  instalar lo necesario.

Instalación en Ubuntu (Paso a Paso)
-----------------------------------

Asumiendo una instalación nueva de Ubuntu (o WSL):

1. Instalación Multi-usuario
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Ejecuta el siguiente script oficial. Usamos el modo *daemon* para mayor seguridad y aislamiento.

.. code-block:: bash

    sh <(curl -L https://nixos.org/nix/install) --daemon

.. note::
    Responde "Yes" a las preguntas de confirmación y permite el uso de ``sudo`` cuando lo solicite.

2. Activar Nix
~~~~~~~~~~~~~~

Una vez terminada la instalación, reinicia tu terminal o ejecuta:

.. code-block:: bash

    . /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh

3. Habilitar Flakes
~~~~~~~~~~~~~~~~~~~

Por defecto, la funcionalidad de Flakes es experimental. Debemos activarla
permanentemente en el archivo de configuración:

.. code-block:: bash

    mkdir -p ~/.config/nix
    echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf

Estrategia de Trabajo: Capas y Herramientas
-------------------------------------------

Para mantener el orden, dividiremos las herramientas en dos capas:

* **Capa 1: Herramientas personales de trabajo (Taller):** `neovim`, `tmux`, `git`, `Github CLI`.
  Las herramientas no cambian de proyecto en proyecto, queremos que siempre esten disponibles.

* **Capa 2: Dependencias del Proyecto (Materiales):** Django, React, Postgres, Nginx.
  Las dependencias son particulares a un proyecto, aquí a veces utilizamos Django, otras Flask o FasrAPI.
  Además las versiones pueden cambiar por proyecto, por ejepmlo Django 4.1 o Django 5.3.

Uso Básico
~~~~~~~~~~

En cada repositorio del curso encontrarás un archivo ``flake.nix`` donde se especifican dependencias 
particulares para ese proyecto. Para activar el entorno, simplemente navega a la carpeta y ejecuta:

.. code-block:: bash

    nix develop

La primera vez tardará unos minutos descargando dependencias. Las siguientes veces será instantáneo.

Integración con Tmux y Postgres
-------------------------------

Para trabajar cómodamente con varios servicios como bases de datos, recomendamos usar **Tmux**.

Flujo de Trabajo
~~~~~~~~~~~~~~~~

Para evitar cargar el entorno en cada ventana nueva, sigue este orden:

1.  Abre tu terminal.
2.  Ejecuta ``nix develop`` (Carga Python, Node, Postgres y Tmux).
3.  Desde **dentro** de ese entorno, ejecuta ``tmux``.

Ahora, cualquier ventana o panel que abras en Tmux heredará automáticamente el acceso a las herramientas.

Persistencia de Base de Datos
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Nix es efímero, pero tus datos deben ser persistentes. Hemos configurado el entorno (archivo `flake.nix`) para que:

1.  Los datos de PostgreSQL vivan en la carpeta ``.postgres_data`` dentro de tu proyecto.
2.  El socket de conexión viva en ``/tmp`` (para evitar errores de permisos).

Comandos útiles (Alias):
************************

* ``db-start``: Inicia el servidor de base de datos en segundo plano.
* ``db-stop``: Detiene el servidor.
* ``psql``: Entra a la consola SQL (ya configurado para conectarse al socket correcto).
* ``serve``: Inicia un servidor web simple para el frontend.

Ejemplo de ``flake.nix`` (Referencia)
-------------------------------------

Este es el archivo de configuración que usamos en los proyectos del curso.

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
              # Backend & Frontend
              python311 python311Packages.django
              nodejs_20 nodePackages.yarn
              
              # Infraestructura
              postgresql_15 redis
              
              # Herramientas
              tmux neovim git curl
            ];

            shellHook = ''
              # Configuración de Postgres Local
              export PGDATA="$PWD/.postgres_data"
              export PGHOST="/tmp" 
              
              # Inicialización automática de BD
              if [ ! -d "$PGDATA" ]; then
                initdb --auth=trust --no-locale --encoding=UTF8 > /dev/null
              fi
              
              # Alias
              alias db-start="pg_ctl start -l $PGDATA/logfile -o '-k /tmp'"
              alias db-stop="pg_ctl stop"
            '';
          };
        };
    }

Tips Finales
------------

.. tip::

   Si usas **Git**, asegúrate de ignorar la carpeta de datos. Agrega ``.postgres_data/`` y ``.npm-global/`` a tu archivo ``.gitignore``.

.. warning::

    Si reinicias tu computadora, el servidor de Postgres se detendrá. Solo
    necesitas entrar a la carpeta, hacer ``nix develop`` y luego ``db-start``
    para continuar donde te quedaste.
