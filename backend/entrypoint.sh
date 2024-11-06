#!/bin/bash

#Wait for the database to be ready
echo "Waiting for the database..."
until nc -z -v -w30 $POSTGRES_HOST 5432
do
  echo "Waiting for Postgres connection..."
  sleep 1
done
echo "Postgres is up and running!"

#Run migrations
echo "Running migrations..."
python manage.py makemigrations
python manage.py migrate

#Start the Django Server
echo "Starting Django server..."
exec "$@"