FROM golang:1.18.4-alpine3.16 AS build-server
WORKDIR /app
COPY go.mod go.sum /app/
COPY api /app/api
RUN go mod download
RUN find .
RUN go build -o server api/cmd/main.go

FROM node:18-alpine3.16 AS build-front
WORKDIR /app
COPY ./web/package*.json ./web/tsconfig.json ./
RUN npm install
COPY ./web ./
RUN npm run build

FROM alpine:3.16
RUN apk --no-cache add ca-certificates
WORKDIR /root/
EXPOSE 8000
COPY --from=build-front /app/dist ./dist
COPY --from=build-server /app/server ./server
RUN find /root/
CMD [ "./server", "--port=8000" ]