# Comandos de Linux (o la Terminal) que todo Desarrollador Web puede llegar a necesitar

Como desarrolladores de aplicaciones Web no es raro que nos guste utilizar 
aplicaciones CLI (de Interfaz de Línea de Comandos) ya que nos permiten crear scripts y
son más prácticas que la contraparte que utiliza GUI (Interfaz Gráfica de Usuario).

Estos son algunos de los comandos de Linux (macOS o Windows) que más utilizamos:
Nota: el símbolo de `$` indica el prompt de la terminal, no es parte del comando.

### `pwd` 
Imprime la ruta completa del directorio actual.
Ejemplo:
```bash
$ pwd
/home/mariosky
```

### `ls -al` 
Imprime el contenido del directorio. El parámetro `a` indica que queremos ver todos 
los archivos, incluso los ocultos. El parámetro `l` indica que queremos ver un listado 
con mayor detalle. También se puede ejecutar el comando sin parámetros. Algunas instalaciones 
de Linux incluyen el alias `la` que ejecuta el mismo comando.

Ejemplo:
```bash
$ ls -al 
total 8
drwxr-xr-x    4 mario  staff   128 Sep  6 12:18 .
drwxr-x---+ 155 mario  staff  4960 Sep 10 12:27 ..
drwxr-xr-x   14 mario  staff   448 Sep  6 12:22 .git
-rw-r--r--    1 mario  staff  2111 Sep  6 12:17 tutorial.md
```
El punto `.` indica el directorio actual y el doble punto `..` el directorio padre.

### `mkdir` 
Crea un directorio. Se utiliza la posición actual para 
no tener que escribir toda la ruta. Por ejemplo, si quiero crear un subidrectorio
solamente se escribe el nombre del directorio y se asume que es desde la posición actual.

Ejemplo:
```bash
$ mkdir directorio
$ ls
create_user.md directorio
```

### `cd` 
Cambia nuestra posición a otro directorio. Se utiliza la posición actual para 
no tener que escribir toda la ruta. Por ejemplo, si quiero ir a un subidrectorio
solamente se escribe el nombre del directorio.

Ejemplo:
```bash
$ cd directorio
$ ls -al
total 0
drwxr-xr-x  2 mario  staff   64 Sep 10 12:33 .
drwxr-xr-x  5 mario  staff  160 Sep 10 12:33 ..
```

