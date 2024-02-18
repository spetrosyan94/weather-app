FROM node:20.10

WORKDIR /app

# COPY package*.json ./
COPY . .

RUN npm install

RUN npm run build

# RUN rm -r 

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
