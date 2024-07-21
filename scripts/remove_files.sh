#!/bin/bash

if [ -d "/home/ec2-user/build" ]; then
    rm -rf /home/ec2-user/build/*
else
    echo "/home/ec2-user/build directory does not exist."
fi