# Configuración de Django con PostgreSQL

Se asume que previamente se instaló y creo un usuario utilizando el 
[playbook de Ansible](https://github.com/mariosky/webdev-playbooks/blob/main/playbooks/postgres.yml) visto en clase.


Como primer paso veamos si está instalado y se está ejecutando el servidor de base de datos en nuestra 
instancia. Para esto listamos los servicios del sistema, deberia estar listado:

```bash 
  sudo systemctl --type=service | grep postgresql
  (salida)
  postgresql.service                             loaded active exited  PostgreSQL RDBMS
  postgresql@14-main.service                     loaded active running PostgreSQL Cluster 14-main
```

Si no aparece significa que no está instalado. Debemos ejecutar el playbook correspondiente.

Una vez instalado el servidor, vamos a probar conectarnos al servidor:

```bash 
psql -h localhost -U ubuntu -d django_bootstrap
```
El comando nos pide el password, este password se especificó en el archivo db_vars.yml de ansible.
Por defecto es: `thisissomeseucrepassword`.

Una vez conectado al servidor podemos ejecutar algunos comandos de SQL. Además 
de los comandos de SQL, también hay comando propios de `psql`:

|comando | acción                   |
|--------|--------------------------|
| \l     | lista las bases de datos | 
| \du    | muestra a los usuarios   |
| \c     | conectarse a otra BD     |
| \q     | salimos de psql          |

Para conectarnos con el usuario administrador de PosgreSQL nos cambiamos de usuario a `postgres`.

```bash 
sudo -u postgres psql
```

Podemos asignar al usuario `ubuntu` el rol de administrador. 

``` 
ALTER USER ubuntu WITH SUPERUSER;
```




