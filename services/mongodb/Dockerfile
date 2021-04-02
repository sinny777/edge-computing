FROM mongo:4.4.4

LABEL author="Gurvinder Singh <sinny777@gmail.com>"
LABEL profile="http://www.gurvinder.info"

COPY init-mongo.sh /docker-entrypoint-initdb.d/

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 27017
CMD ["mongod"]