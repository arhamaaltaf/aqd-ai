FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY aqd-ai/package.json ./aqd-ai/package.json
COPY aqd-ai/bun.lock ./aqd-ai/bun.lock
COPY aqd-ai/package-lock.json ./aqd-ai/package-lock.json
WORKDIR /app/aqd-ai
RUN npm ci --legacy-peer-deps

WORKDIR /app
COPY . .

WORKDIR /app/aqd-ai
RUN npm run build

WORKDIR /app
EXPOSE 7860

CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--timeout", "300", "flask_app:app"]
