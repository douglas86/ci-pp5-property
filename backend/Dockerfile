#Docker file for Django
#Use official Python image as a base
FROM python:3.13

ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    python3-dev \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    netcat-openbsd

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

#Run Django Server
CMD ["sh", "-c", "python -u -m daphne property.asgi:application --port $PORT --bind 0.0.0.0"]
