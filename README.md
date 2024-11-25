
# Проект: Симуляция волнового уравнения

Этот проект реализует симуляцию волнового уравнения с использованием бэкенда на FastAPI и фронтенда на React (с Material-UI).

---

## **1. Общее руководство по запуску проекта**

### 1.1. Требования
- Убедитесь, что на вашем компьютере установлены:
  - Docker
  - Docker Compose

### 1.2. Запуск всего проекта

1. Склонируйте репозиторий:
   ```bash
   git clone <URL вашего репозитория>
   cd <название папки проекта>
   ```

2. Запустите `docker-compose`:
   ```bash
   docker-compose up --build
   ```

3. Откройте в браузере:
   - Бэкенд (документация API): [http://localhost:8000/docs](http://localhost:8000/docs)
   - Фронтенд (веб-приложение): [http://localhost:3000](http://localhost:3000)

4. Чтобы остановить проект:
   ```bash
   docker-compose down
   ```

---

## **2. Запуск компонентов по отдельности**

Если требуется запустить только бэкенд или только фронтенд, выполните следующие шаги:

---

### **2.1. Бэкенд (FastAPI)**

#### 2.1.1. Запуск бэкенда локально (без Docker)

1. Перейдите в папку `backend`:
   ```bash
   cd backend
   ```

2. Создайте виртуальное окружение:
   ```bash
   python -m venv .venv
   ```

3. Активируйте виртуальное окружение:
   - Для **Linux/Mac**:
     ```bash
     source .venv/bin/activate
     ```
   - Для **Windows**:
     ```bash
     .\.venv\Scripts\activate
     ```

4. Установите зависимости:
   ```bash
   pip install -r requirements.txt
   ```

5. Запустите сервер:
   ```bash
   uvicorn main:app --reload
   ```

6. Откройте в браузере документацию API: [http://localhost:8000/docs](http://localhost:8000/docs)

#### 2.1.2. Запуск бэкенда в Docker

1. Перейдите в папку `backend`:
   ```bash
   cd backend
   ```

2. Соберите Docker-образ:
   ```bash
   docker build -t fastapi-backend .
   ```

3. Запустите контейнер:
   ```bash
   docker run -d -p 8000:8000 --name fastapi_backend fastapi-backend
   ```

4. Откройте в браузере документацию API: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### **2.2. Фронтенд (React)**

#### 2.2.1. Запуск фронтенда локально (без Docker)

1. Перейдите в папку `frontend`:
   ```bash
   cd frontend
   ```

2. Убедитесь, что установлен Node.js. Установите зависимости:
   ```bash
   npm install
   ```

3. Запустите фронтенд:
   ```bash
   npm start
   ```

4. Откройте веб-приложение в браузере: [http://localhost:3000](http://localhost:3000)

#### 2.2.2. Запуск фронтенда в Docker

1. Перейдите в папку `frontend`:
   ```bash
   cd frontend
   ```

2. Соберите Docker-образ:
   ```bash
   docker build -t react-frontend .
   ```

3. Запустите контейнер:
   ```bash
   docker run -d -p 3000:3000 --name react_frontend react-frontend
   ```

4. Откройте веб-приложение в браузере: [http://localhost:3000](http://localhost:3000)

---

## **3. Структура проекта**

```
root
├── b_lab3_backend
│   ├── main.py              # Основной код бэкенда
│   ├── requirements.txt     # Зависимости для Python
│   └── Dockerfile           # Dockerfile для бэкенда
├── b_lab3_frontend
│   ├── src
│   │   ├── components       # Компоненты React
│   │   │   ├── ParameterForm.tsx
│   │   │   ├── GraphDisplay.tsx
│   │   │   ├── ResultsDisplay.tsx
│   │   ├── App.tsx          # Основной компонент приложения
│   ├── package.json         # Зависимости фронтенда
│   └── Dockerfile           # Dockerfile для фронтенда
├── docker-compose.yml        # Файл для запуска проекта через Docker Compose
└── README.md                 # Документация
```

---

## **4. Завершение работы**

Если вы запускали проект через Docker Compose, остановить все контейнеры можно командой:
```bash
docker-compose down
```
Если вы запускали компоненты по отдельности через Docker, используйте:
```bash
docker stop <container_name>
docker rm <container_name>
```

---

## **5. Вопросы и поддержка**

Если возникли вопросы или проблемы с запуском, создайте issue в репозитории или свяжитесь с разработчиком.
