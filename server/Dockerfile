FROM node:17
  
WORKDIR /usr/src/app

# install deps
COPY package*.json ./
RUN npm install

# Setup workdir
COPY . .

# run
EXPOSE 3000
CMD npm start