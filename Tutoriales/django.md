# Primeros pasos con django

## Instalación

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
```
pip install django
```

Podemos ver que liberías están instaladas en el ambiente con el comando freeze:
```
pip freeze

asgiref==3.7.2
Django==4.2.6 
sqlparse==0.4.4
typing_extensions==4.8.0
```

Revisa que esté instalada la librería de Django.
Para volver a instalar las librerías que tenemos hasta ahora podemos almacenar la
salida del comando `freeze` en un archivo llamado `requeriments.txt`:
```
pip freeze > requirements.txt
```
En otro momento, podemos instalar las librerías de esta manera:

**No es necesario hacerlo en este momento** 
```
pip install -r requirements.txt
```

## Cómo crear un projecto y agregar una aplicación



