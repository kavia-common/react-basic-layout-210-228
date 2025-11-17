#!/bin/bash
cd /tmp/kavia/workspace/code-generation/react-basic-layout-210-228/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

