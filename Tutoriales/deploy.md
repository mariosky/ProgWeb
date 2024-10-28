Vamos a utilizar una combinación de servidores Web para desplegar nuestro
proyecto. NGINX servirá como nuestro servidor web para archivos estáticos y
también como Gateway, para delegar las peticiones que vayan a nuestra aplicación.
El servidor web (Gunicorn)[gunicorn.org] se encargará de las peticiones (WSGI) y las
va a pasar al código de Django.

Primero debemos instalar Gunicorn.

```bash
pip install gunicorn
```

Ahora servimos el proyecto utilizando el módulo `.wsgi` del proyecto.

```bash
cd ~/proyecto
gunicorn --bind 0.0.0.0:8000 proyecto.wsgi
```

Los procesos de NGINX y Gunicorn se van a comunicar por medio de sockets, pero
como la comunicación se hará localmente en el mismo sistema utilizaremos socket files.

Vamos a crear un archivo tipo socket para nuestro proyecto. Este archivo se va a
crear al momento de arranque (boot) y el controlador del sistema va a iniciar el proceso
de Gunicorn al recibir una conexión. Utilizaremos el nombre del proyecto para el nombre
del socket.

```bash
sudo vi /etc/systemd/system/proyecto.socket
```

El contenido del archivo es el siguiente:

```
[Unit]
Description= gunicorn socket de proyecto

[Socket]
ListenStream=/run/proyecto.sock

[Install]
WantedBy=sockets.target
```

Tambien debemos agregar el archivo de `systemd` llamado
`/etc/systemd/system/proyecto.service´:

```
[Unit]
Description=gunicorn daemon de proyecto
Requires=proyecto.socket
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/proyecto
ExecStart=/home/ubuntu/proyecto/venv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/proyecto.sock \
          proyecto.wsgi:application

[Install]
WantedBy=multi-user.target
```

Con los archivos creados podemos iniciar el archivo socket y verificar que se
genera el archivo, su estado y sus logs.

```bash
sudo systemctl start proyecto.socket
sudo systemctl enable proyecto.socket

sudo systemctl status proyecto.socket

file /run/proyecto.sock

sudo journalctl -u proyecto.socket
```

Podemos ver el estado del servicio de gunicorn, al principio no está activo,
recuerda que se va a activar cuándo reciba una petición:

```
sudo systemctl status proyecto
```

Vamos a utilizar `curl` para enviar una petición utilizando el socket:

```
curl --unix-socket /run/proyecto.sock localhost
```

Como salida del comando deberíamos ver la página web que nos entrega la aplicación de django.

Para recargar el servidor de gunicorn:

```
sudo systemctl daemon-reload
sudo systemctl restart proyecto
```
