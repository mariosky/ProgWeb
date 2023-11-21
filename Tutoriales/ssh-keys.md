### Claves SSH 

En este curso vamos a utilizar SSH para ejecutar los comandos de git en 
nuestros repositorios almacenados en GitHub.com. Para esto, debemos 
generar claves SSH en nuestro servidor remoto, para después agregarlas 
en la página de GitHub.com.

Una vez que iniciamos sesión en nuestro servidor
vamos a revisar si ya tenemos claves SSH en nuestra instancia. 
Las claves se almacenan en un directorio oculto llamado `.ssh` dentro 
del directorio `home` de nuestro usuario. Listemos su contenido: 

```
ls -al ~/.ssh 
```

> **Nota:**
El comando `ls` lista los archivos del directorio miestras que el 
parámetro `-al` muestra los archivos ocultos (`a`) en formato largo (`l`). Recuerda 
que el símbolo `~` es un alias de nuestro directorio `home`. 

## Generación de un par de llaves SSH

El siguiente comando crea un par de llaves: 

```
ssh-keygen -t ed25519 -C "tu_email@example.com"
```

> **Nota:**
Si tu sistema no tiene soporte para el algoritmo Ed25529, utiliza el comando:
```
 ssh-keygen -t rsa -b 4096 -C "tu_email@example.com"
```

Al generar las llaves elige las opciones por defecto.

## Agrega la llave al agente SSH

Inicia el `ssh-agent`:
```
eval "$(ssh-agent -s)"
```

Asumiendo el algoritmo ed25519, añade la llave al agente:

```
ssh-add ~/.ssh/id_ed25519
```

## Agrega la llave pública a GitHub

Copia la clave pública (la salida del comando) al portapapeles: 

```
cat ~/.ssh/id_ed25519.pub
```

Pega la llave en el campo `key` de la forma para agregar [llaves](https://github.com/settings/ssh/new) en
tu cuenta de GitHub.

Agrega el archivo de configuración de tu instalación de git local
agrega tu usuario correo que correspondan a los de GitHub:

```
git config --global user.name "tu nombre"
git config --global user.email "tu email"
```

En caso de que tengas el repositorio `origin` utilizando el protocolo `https` 
lo pudes comabiar a ssh con el siguiente comando (en el ejemplo se agrega este repositorio):

```
git remote set-url origin git@github.com:mariosky/ProgWeb.git
```
