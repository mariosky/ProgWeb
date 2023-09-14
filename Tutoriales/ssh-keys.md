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
parámetro `-al` muestra todos los objetos en formato largo. Recuerda 
que el símbolo `~` es un alias de nuestro directorio `home`. 


