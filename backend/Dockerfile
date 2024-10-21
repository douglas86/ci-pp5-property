#Docker file for Django
#Use official Python image as a base
FROM python:3.12

ENV PYTHONUNBUFFERED = 1

RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    python3-dev \
    build-essential \
    libjpeg-dev \
    zlib1g-dev

#Set work directory
WORKDIR /app

#Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

#Copy project files
COPY . .

EXPOSE 8000

#Expose the port Django will run on
ENV PORT=8000
#Expose variable for using print statments in docker
ENV PYTHONUNBUFFERED=1

#Run Django Server
CMD ["sh", "-c", "python -u -m daphne property.asgi:application --port $PORT --bind 0.0.0.0"]
