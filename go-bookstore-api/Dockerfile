# Use the official Golang image as a parent image
FROM golang:1.19

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files
COPY go.mod go.sum ./

# Download the dependencies
RUN go mod download
RUN go mod verify

# Copy the source code into the container
COPY . .

# Build the Go app
RUN go mod tidy
RUN go build -o main .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./main"]