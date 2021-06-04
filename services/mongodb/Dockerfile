FROM mongo:4.4.4

ARG BUILD_DATE
ARG BUILD_VERSION
ARG BUILD_REF

LABEL org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.docker.dockerfile=".docker/Dockerfile" \
    org.label-schema.license="Apache-2.0" \
    org.label-schema.name="Edge-Mongodb" \
    org.label-schema.version=${BUILD_VERSION} \
    org.label-schema.description="Edge monogodb service" \
    org.label-schema.url="https://github.com/sinny777/edge-computing" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-type="Git" \
    org.label-schema.vcs-url="https://github.com/sinny777/edge-computing" \
    authors="Gurvinder Singh <sinny777@gmail.com>"

COPY init-mongo.sh /docker-entrypoint-initdb.d/
ENV TZ Asia/Kolkata

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 27017
CMD ["mongod"]