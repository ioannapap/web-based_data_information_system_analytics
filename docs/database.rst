####################
Database information
####################

On this chapter we will discuss in depth the database details.
The DBMS of the application is a MySql server, specially configured
for the purpose of this web app.

************
Installation
************

First we have to connect to MySql's CLI

.. code-block:: bash

    mysql -u root -p

And then create a new user

.. code-block:: python

    > CREATE USER 'sysdba'@'%' IDENTIFIED BY '12345678aA!';
    > GRANT ALL PRIVILEGES ON *.* TO 'sysdba'@'%' WITH GRANT OPTION;
    > FLUSH PRIVILEGES;


*****************
Relational Schema
*****************

In the following picture we can...

*******
Indexes
*******

The following indexes were configured...


***************
Users and roles
***************

A user was created for...


***********
DBMS Tuning
***********

The following parameters were configured...


*********
Changelog
*********

Below we can see the changes after the initial setup...
