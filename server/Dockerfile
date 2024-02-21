FROM node:21-alpine3.18

# Create App Directory
COPY . /usr/src/app

# Working directory be app
WORKDIR /usr/src/app

# Installing dependencies.
RUN npm i -g nodemon
RUN npm i

EXPOSE 3001

CMD ["npm", "run", "dev"]