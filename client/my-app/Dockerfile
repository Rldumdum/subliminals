FROM node:21-alpine3.18

# copy local files to app folder
COPY . /usr/src/app

# Working directory be app
WORKDIR /usr/src/app

RUN npm i

EXPOSE 3000

CMD ["npm", "run", "start-build"]