#!/bin/bash
(cd gameApi && npm start) &
(cd graphQLAPI && npm start) &
(cd reactApp && npm start) &