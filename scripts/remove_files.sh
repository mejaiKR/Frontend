#!/bin/bash

if [ -d "/home/ubuntu/build" ]; then
    rm -rf /home/ubuntu/build/*
else
    echo "/home/ubuntu/build directory does not exist."
fi