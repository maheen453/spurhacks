# Stage 1: Build React frontend
FROM node:18 as frontend
WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Stage 2: FastAPI backend
FROM python:3.11-slim

WORKDIR /app
COPY backend ./backend
COPY --from=frontend /app/frontend/dist ./frontend/dist 
RUN pip install --no-cache-dir -r backend/requirements.txt

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
