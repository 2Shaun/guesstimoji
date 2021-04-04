FROM cypress/included:6.8.0

WORKDIR /

COPY ./cypress ./cypress
COPY ./cypress.json ./cypress.json
RUN cd cypress/support
RUN npm i
