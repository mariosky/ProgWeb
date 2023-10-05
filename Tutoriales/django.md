## Primeros pasos con django

*Se asume que estamos en una instancia de ubuntu 24.04*

```
lsb_release -a

Distributor ID:	Ubuntu
Description:	Ubuntu 22.04.3 LTS
Release:	22.04
Codename:	jammy
```

Como primer paso vamos a crear un [ambiente virtual de Pyhton] (https://docs.python.org/3/tutorial/venv.html).
El ambiente virtual va a crear un directorio con los archivos necesarios para ejecutar 
una instalación de Python independiente. Este ambiente lo puedes utilizar en varios proyectos 
que tengan requerimientos similares. El directorio debe quedar fuera del control de versiones así
que asegurate que esté en tu `.gitignore` en caso de tener el directorio del ambiente dentro de 
tu repositorio local. En este caso el ambiente estará en nuestro directorio `HOME` y se llamará `django-venv`.

```
python3 -m venv django-venv
```

Una vez creado el ambiente lo activamos:

```
source django-venv\bin\activate  
```

Para desactivarlo simplemente ejecutamos el comando `deactivate`. Dependiendo del 
*theme* de tu terminal, es común que se indique en el prompt que el ambiente está activado:

```
(django-venv) ubuntu@ip:~$
```

Una vez activado el ambiente vamos a instalar django utilizando pip:



