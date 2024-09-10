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

### `ls -al [ruta]` 
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

### `mkdir <ruta>` 
Crea un directorio. Se utiliza la posición actual para 
no tener que escribir toda la ruta. Por ejemplo, si quiero crear un subidrectorio
solamente se escribe el nombre del directorio y se asume que es desde la posición actual.

Ejemplo:
```bash
$ mkdir directorio
$ ls
create_user.md directorio
```

### `cd <ruta>` 
Cambia nuestra posición a otro directorio. Se utiliza la posición actual para 
no tener que escribir toda la ruta. Por ejemplo, si quiero ir a un subidrectorio
solamente se escribe el nombre del directorio. Si no especificamos la ruta 
nos vamos a mover al directorio `HOME` del usuario.

Ejemplo:
```bash
$ cd directorio
$ ls -al
total 0
drwxr-xr-x  2 mario  staff   64 Sep 10 12:33 .
drwxr-xr-x  5 mario  staff  160 Sep 10 12:33 ..
```

### `mv <origen> <destino>`  
Mueve de lugar un directorio o archivo. También utilizamos el comando para renombrar un archivo o directorio.

Ejemplo:
```bash
$ ls
directorio
$ mv directorio directorio_nuevo
$ ls
directorio_nuevo
```

### `rm -rf <ruta>`  
Borra un directorio o archivo. En caso de que sea un directorio y no esté vacio
podemos forzar el borrar de manera recursiva con los parámetros `rf` 

Ejemplo:
```bash
$ ls
directorio
$ mv directorio directorio_nuevo
$ ls
directorio_nuevo
```

### `touch <archivo>` 
Actualiza la fecha de un archivo. Si no existe lo crea. Lo utilizamos para 
crear un archivo vacio de una manera rápida.

### `clear`
Borra la pantalla de la terminal.

### `grep <expresion-regular>`
Busca un patrón en líneas de texto o un archivo. Normalmente lo podemos
utilizar con el concepto de pipas (que reciba como entrada la salida de otro comando). 
Ejemplo:
```bash
$ ls | grep directorio
directorio_nuevo
```

### `history`
Nos regresa una lista de los comandos que hemos ejecutado recientemente. Podemos
volver a ejecutar el comando con el su número. Podemos utilizarlo en conjunto con 
`grep`.

Ejemplo:
```bash
$ history | grep directorio
 2932  mkdir directorio
 2934  cd directorio
```
Para ejecutar el comando le anteponemos el símbolo de exclamación.
Ejemplo:
```bash
$ !2932
```

### `df -h`
Nos muestra información sobre el espacio de disco utilizado. El 
parámetro `-h` nos muestra la información de manera "humana", desplegando 
las cantidades en giga o mega bytes.
Ejemplo:
```bash
$ df -h
Filesystem        Size    Used   Avail Capacity iused ifree %iused  Mounted on
/dev/disk3s1s1   926Gi   9.6Gi   591Gi     2%    404k  4.3G    0%   /
devfs            204Ki   204Ki     0Bi   100%     706     0  100%   /dev
```

### `env`
Muestra las variables de entorno. Estas variables son utilizadas 
para configurar nuestros programas o servicios.
Ejemplo:
```bash
$ env
TERM_SESSION_ID=w0t0p0:C6C9AD68-F229-4072-86B7-C330188EF23322
SSH_AUTH_SOCK=/private/tmp/com.apple.launchd.ArTrbeBCkR/Listeners
LC_TERMINAL_VERSION=3.5.4
COLORFGBG=15;0
ITERM_PROFILE=Default
XPC_FLAGS=0x0
LANG=en_US.UTF-8
PWD=/Users/mario
SHELL=/bin/zsh
```


### `export` 
Crea una variables de entorno.
Ejemplo:
```bash
$ export NOMBREVAR="valor"
$ env | grep NOMBREVAR
NOMBREVAR=valor
```
