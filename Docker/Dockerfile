# Dockerfile with file modification capabilities when execing onto container

FROM python:3.12.3-slim

# Install dev tools like vim, bash, curl, etc.
RUN apt-get update && \
    apt-get install -y vim bash curl iputils-ping net-tools && \
    rm -rf /var/lib/apt/lists/*
    
ARG PIP_URL=""
ENV PIP_URL=$PIP_URL

# Create a user/group for the container
RUN mkdir /tests && \
    groupadd -r somegroup && \
    useradd -mrs /bin/bash someuser -G somegroup
USER someuser:somegroup

# Create an environment path
ENV PATH "$PATH:/home/someuser/.local/bin"
ENV PYTHONPATH=/home/someuseruser/.local/lib/python3.12/site-packages

# Cache the pip installs of requirements
COPY --chown=someuser:somegroup /requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# Copy the python code
COPY --chown=someuser:somegroup / /tests

WORKDIR /tests
# Run this command to run the tests in the container
CMD [ "./run-behave" ]
