FROM python:3.11-slim

WORKDIR /app

# install build deps and pip dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# copy source
COPY . .

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
