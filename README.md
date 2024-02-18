"" Instalacion ""

$ sudo apt update && sudo apt upgrade -y

$ git clone https://github.com/savelasquezo/imagine.git


"""Postgresql Configuracion"""

$ sudo apt install postgresql-contrib

$ sudo -u postgres psql

$ CREATE DATABASE "dbimagine";

$ ALTER USER postgres WITH PASSWORD '4oPn2655Lmn';

*ctrl+D*

"""Redis Server"""

$ sudo apt install redis-server -y

$ sudo service redis-server start


"""Entorno Virtual Configuracion"""

$ cd imagine/core

$ sudo apt-get install virtualenv -y

$ virtualenv venv -ppython3

$ source venv/bin/activate

$ pip install -r requirements.txt

$ python3 manage.py makemigrations

$ python3 manage.py migrate

$ python3 manage.py createsuperuser

*Ingresamos los Datos- Tomar Nota del "email" & "contraseña" Usados*

$ python3 manage.py runserver

*Mantener esta Ventana Activa*


*Abrir Nueva Terminal el el Directorio "imagine" *

"""Frontend"""

$ cd public

$ sudo apt-get install nodejs npm

$ sudo npm install -g n

$ sudo n latest

$ sudo npm install -g npm@latest

$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

$ exec $SHELL

$ nvm install --lts

$ npm install

$ npm run dev

*Mantener esta Ventana Activa*



""Administrador"

URL Backend: http://localhost:8000/app/admin/

*Ingresamos los datos de Usuario "email" & "contraseña"*


""WEB""

URL Frontend: http://localhost:3000

*Agregamos un Nuevo Usuario desde la Opcion "Inscribirse"*



¿Necesitas Ayuda con la instalacion? Escribeme
Simon Velasquez
savelasquezo@gmail.com
https://wa.me/573228009275


