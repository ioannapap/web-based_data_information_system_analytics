####################
Database information
####################

On this chapter we will discuss in depth the database details.
The DBMS of the application is a MySql server, specially configured
for the purpose of this web app.

*************
Configuration
*************

First we have to connect to MySql's CLI

.. code-block:: bash

    mysql -u root -p

Now we're going to create a new user that will be used by our web app.

.. code-block:: sql

    CREATE USER 'sysdba'@'%' IDENTIFIED BY '12345678aA!';
    GRANT ALL PRIVILEGES ON *.* TO 'sysdba'@'%' WITH GRANT OPTION;
    FLUSH PRIVILEGES;


*****************
Relational Schema
*****************

In the following picture we're presenting the database schema.


*******
Indexes
*******

Some database indexes had to be created on fields that are frequently
used by *WHERE* clauses. Indexing is really helpful for retreiving the
results faster. Below we're presenting the created indexes.


***************
Users and roles
***************

For the purpose of this web app only one user had to be created.


***********
DBMS Tuning
***********

The following parameters were configured in order to achieve better
performance.


*********
Changelog
*********

Below we can see the changes after the initial setup.
