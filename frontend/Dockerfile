FROM node:18.15-bullseye
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install
COPY ./public ./public
COPY ./src ./src
CMD ["npm", "start"]