FROM python:3.9-slim

WORKDIR /backend

COPY ./requirements.txt /backend/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./ /backend/

WORKDIR /backend/app

RUN apt-get update && apt-get install -y netcat-openbsd

ENTRYPOINT ["sh", "/backend/wait-for-db.sh"]

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
