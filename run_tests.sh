#!/bin/bash
docker-compose -f docker-compose.test.yml build
docker-compose -f docker-compose.test.yml up --abort-on-container-exit --exit-code-from logging_server
