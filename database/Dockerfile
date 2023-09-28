FROM postgres:alpine as blog_database

COPY migrations/*.sql docker-entrypoint-initdb.d/

ENTRYPOINT ["docker-entrypoint.sh", "postgres"]
