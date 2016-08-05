FROM instructure/node:6

ENV APP_HOME /usr/src/app/
ENV PATH /usr/src/app/node_modules/.bin:$PATH
WORKDIR $APP_HOME
#
# COPY package.json $APP_HOME
RUN mkdir -p ${APP_HOME}node_modules \
    && chown -R docker:docker ${APP_HOME}
#
# USER docker
# RUN npm install
#
# COPY public $APP_HOME/public
#
# USER root
# RUN npm run webpack \
#     && chown -R docker:docker ${APP_HOME}
#
# USER docker
CMD ["bin/startup"]
EXPOSE 8000
