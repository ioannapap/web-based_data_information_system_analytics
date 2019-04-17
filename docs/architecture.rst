################
Software details
################

The application consists of a database server, a web application API
server and a static frontend. In this chapter we will discus in depth
the application details.

**************
About datasets
**************

We collected datasets related to murders, homicides and political
culture index.


*********************
Datasets manipulation
*********************

Datasets had to be manipulated according to our database schema.
In order to transform them a python script was implemented.


******************
Importing datasets
******************

The datasets were imported...


************************
Application architecture
************************

The web application consists of two separate parts, the API that
is responsible for database communication and serving the data and
a static frontend that consumes the API and renders the results.

API
---
The API server is used for direct communication with the database. The API
is written in node.js.


Frontend
--------
A static server is used for serving the frontend files and consuming data from
the API. Frontend static files are html, css, javascript and media files.
