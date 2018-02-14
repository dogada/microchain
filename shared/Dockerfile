FROM node:8
LABEL maintainer="dvd@dogada.org"

# Fix signals processing inside docker containers
# https://github.com/yelp/dumb-init
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64
RUN chmod +x /usr/local/bin/dumb-init

USER node
WORKDIR /home/node/microchain/shared

RUN npm config set prefix /home/node
RUN npm completion > ~/.bashrc
# add some dev only libs to shared image to reduce build time and total images size
RUN npm i -g jest standard
ENV PATH "${PATH}:/home/node/bin"

COPY . ./

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

CMD ['/bin/bash']
