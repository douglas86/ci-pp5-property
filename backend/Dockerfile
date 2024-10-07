#Docker file for Django
#Use official Python image as a base
FROM python:3.12

RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    python3-dev \
    build-essential

#Set work directory
WORKDIR /app

#Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

#Copy project files
COPY . /app/

#Expose the port Django will run on
EXPOSE 8000

#Run Django Server
CMD ["python", "manage.py", "runserver"]