FROM dogada/microchain_shared:latest

WORKDIR /home/node/microchain/api

USER root

COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . ./
# remove dir from docker-compose volumes if it's present
RUN rm -rf ./shared && ln -s ../shared .

# run process as user node
USER node
CMD ["npm", "run", "start"]
EXPOSE 10010

# check health
HEALTHCHECK --interval=1m --timeout=3s \
  CMD curl -f http://localhost:10010/v1/swagger/?healthcheck || exit 1
