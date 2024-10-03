FROM node:lts
WORKDIR /app
COPY /server/ .
ENV MONGO_URI=mongodb://mongo:27017/nome_sobrenome
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]