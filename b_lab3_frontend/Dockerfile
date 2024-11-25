FROM node:18-alpine

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем всё приложение внутрь контейнера
COPY . .

# Открываем порт, на котором будет работать приложение
EXPOSE 4848

# Команда для запуска приложения в режиме разработки
CMD ["npm", "start"]
