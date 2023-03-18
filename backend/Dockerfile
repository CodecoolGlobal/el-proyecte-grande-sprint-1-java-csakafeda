FROM maven:latest AS build
COPY . /app
WORKDIR /app
RUN mvn package

FROM openjdk:latest
COPY --from=build /app/target/quizio-0.0.1-SNAPSHOT.jar /home/bridgend/target/quizio-0.0.1-SNAPSHOT.jar
RUN useradd -ms /bin/bash bridgend
USER bridgend
WORKDIR /home/bridgend
ENTRYPOINT ["java","-jar","target/quizio-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080