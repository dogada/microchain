FROM dogada/microchain_shared:latest

WORKDIR /home/node/microchain/webapp
COPY package.json package-lock.json ./
USER root
RUN npm install

# Copy source code
COPY . ./
# remove dir from docker-compose volumes if it's present
RUN rm -rf ./shared && ln -s ../shared .

RUN npm run build
# run process as user node
USER node
CMD ["npm", "run", "start"]
EXPOSE 3000

# check health
HEALTHCHECK --interval=1m --timeout=3s \
  CMD curl -f http://localhost:3000/?healthcheck || exit 1
