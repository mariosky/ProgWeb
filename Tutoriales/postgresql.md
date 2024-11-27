# Configuración de Django con PostgreSQL

Se asume que previamente se instaló y creo un usuario utilizando el [playbook de Ansible](https://github.com/mariosky/webdev-playbooks/blob/main/playbooks/postgres.yml) visto en clase.

Como primer paso veamos si está instalado y se está ejecutando el servidor de
base de datos en nuestra instancia. Para esto listamos los servicios del
sistema, deberia estar listado:

```bash
  sudo systemctl --type=service | grep postgresql
  (salida)
  postgresql.service                             loaded active exited  PostgreSQL RDBMS
  postgresql@14-main.service                     loaded active running PostgreSQL Cluster 14-main
```

Si no aparece significa que no está instalado. Debemos ejecutar el playbook correspondiente.
Otra opción es instalarlo directamente con:

```bash
sudo apt install postgresql
```

Una vez instalado el servidor, vamos a probar conectarnos al servidor:

```bash
psql -h localhost -U ubuntu -d django_bootstrap
```

El comando nos pide el password, este password se especificó en el archivo db_vars.yml de ansible.
Por defecto es: `thisissomeseucrepassword`.

Una vez conectado al servidor podemos ejecutar algunos comandos de SQL. Además
de los comandos de SQL, también hay comando propios de `psql`:

| comando              | acción                                                     |
| -------------------- | ---------------------------------------------------------- |
| \l                   | lista las bases de datos                                   |
| \du                  | muestra a los usuarios                                     |
| \c                   | conectarse a otra BD                                       |
| \q                   | salimos de psql                                            |
| \dt                  | lista las tablas                                           |
| \d+ objeto           | información detallada del objeto                           |
| \pset format wrapped | mejora el despligue de las tablas al envolver las columnas |
| \e                   | abre un editor para las consultas                          |

Para conectarnos con el usuario administrador de PosgreSQL nos cambiamos de usuario a `postgres`.

```bash
sudo -u postgres psql
```

Podemos asignar al usuario `ubuntu` el rol de administrador.

```
ALTER USER ubuntu WITH SUPERUSER;
```

Que pueda hacer login:

```bash
ALTER ROLE ubuntu WITH LOGIN;
```

Para crear un nuevo usuario:

```
CREATE ROLE ubuntu;
```

Cambiar o agregar un nuevo password:

```
ALTER USER user_name WITH PASSWORD 'new_password';
```

## Instalación de librerías

Requerimos de dos librerías para configurar PosgreSQL con Django.
La biblioteca [psycopg2](https://www.psycopg.org/docs/) nos permite conectarnos al servidor de PosgreSQL de manera eficiente y segura.
Por otro lado [django-environ](https://django-environ.readthedocs.io/en/latest/quickstart.html) nos va a permitir configurar los servicios que requieren variables de entorno,
ya sea porque son secretas o dependen del contexto.

Activa el ambiente y ejecuta la instalación:

```bash
pip install psycopg2
pip install django-environ
```

En caso de que tengas problemas por dependencias al instalar `psycopg2` intenta instalar la
versión: `psycopg2-binary`.

Ejemplo de uso:

```python
conn = psycopg2.connect("dbname=django_bootstrap user=ubuntu password=thisissomeseucrepassword")
cur = conn.cursor()
cur.execute("SELECT CURRENT_DATE")
records = cur.fetchall()
print(records)
```

## Configuración de Django

Modifica la configuración del parámetro `DATABASES` en el archivo `settings.py` del proyecto, según la [documentación](https://docs.djangoproject.com/en/4.2/ref/settings/#databases).
En nuestro caso:

```python
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
```

Ahora simplemente ejecutamos `migrate`.

Revisa que efectivamente las tablas se crearon en la base de datos.

## Autenticación de Pares

Por defecto PostgreSQL utiliza una autenticación de pares, lo que significa que
los programas que se conectan al servidor utilizando sockets de Linux utilizan
el usuario del sistema operativo y no requieren el uso de contraseñas para establecer
la autenticación ya que esa tarea la realiza el mismo sistema operativo. Al instalar
PostgreSQL utilizando `sudo apt install postgresql` el script de instalación crea
un usuario llamado `postgres` que tiene estos permisos. También podemos utilizar psql
con `sudo` como lo hicimos anteriormente. En caso de que necesitemos conectarnos utilizando
un usuario de la base de datos, el cual no existe como usuario del sistema operativo y
es miembro del grupo de usuarios de postgres debemos cambiar la configuración del servidor
para que utilice otro tipo de autenticación. Esto lo hacemos editando esta línea del archivo
`pg_hba.conf`:

```
# TYPE DATABASE USER ADDRESS METHOD
local  all      all          peer
```

Cambiando el método por `md5`:

```
# TYPE DATABASE USER ADDRESS METHOD
local  all      all          md5
```

Los métodos de autenticación validos son:

- `peer` especifíca que se debe confiar en la identidad (autenticación) del sistema
  operativo. Por lo que no es necesario pedir una contraseña.

- `md5` especifíca que siempre se debe comprobar la identidad por medio de una contraseña.
  En este caso la gestión de las contraseñas utiliza el algoritmo `md5` para realizar
  el _hashing_ necesario.

- `trust` especifíca que no es necesario solicitar una contraseña ya que confiamos
  que los usuarios con accesso a la computadora son todos de confianza.

El tipo de autenticación se puede especificar por cada base de datos o para todo el sistema.

Para editar este archivo debemos cambiarnos al usuario `postgres` utilizando `su`:

```
sudo su postgres
```

El archivo está en los directorios de configuración del sistema, por ejemplo en mi
sistema actual está en:

```
/home/ubuntu/mymovies/mymovies$ cd /etc/postgresql/14/main/
```

Una vez modificado el archivo debemos reiniciar el servidor:

```
sudo systemctl restart postgresql
```

### Backup

Para hacer un respaldo de tu base de datos:

```bash
pg_dump -U user_name -h remote_host -p remote_port name_of_database > name_of_backup_file
```

Para cargar el respaldo:

```bash
psql -h localhost -U user_name name_of_database < name_of_backup_file
```

## Tarea

Utilizando `django-environ` protege tu archivo de `settings.py` para
que utilice variables de entorno para guardar el password de la base de datos.
Cuando el sitio esté en producción es probable que tengas que guardar como secreto
toda la configuración de `DATABASES`.
