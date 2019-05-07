#############
Project setup
#############

In this section we're going to see detailed setup instructions.
We're going to download our raw data, transform them,
install mysql server, load data and run our application server.

*********************
Transforming raw data
*********************

The raw data should be transformed to csv data that follow our
database schema format and are ready to be imported.

The collected raw data can be found on:
https://cdn.dimkouv.com/raw_murders_analytics_data.tar.gz

First we're going to install the dependecies required by the
transformation script.

The steps are targeting an arch-based distribution, but should be similar
for other linux distributions.

.. code-block:: bash

    # python3 and python3 package manager
    pacman -S python3 python-pip

    # python3 virtual environment
    pip install virtualenv

    # create and activate a virtual environment
    virtualenv -p python3 venv
    source venv/bin/activate

    # install python dependencies inside the virtual environment
    pip install pandas numpy

Now we're ready to transform our raw data.

.. code-block:: bash

    cd scripts
    ./transform_raw_to_fixed.py


At this point our data are fixed, in the next section we're going to
create a database and load them.


*********************
Database installation
*********************

Below we're going to present the steps for setting up a MySql database
server and creating our table from the provided schema. We're also installing
MySql workbench, a graphical tool for interacting with MySql.

.. code-block:: bash

    pacman -S mysql mysql-workbench
    systemctl start mysql
    systemctl enable mysql


*****************
Application setup
*****************

The application consists of an API server that handles communication with the
database and serves data to the frontend. The API is running on node.js and
below we're going to see the steps required for running the API server.

Install node.js, node.js is a javascript runtime environment that enables
javascript code to be executed on the server side. Npm is a package manager
for node.js.

.. code-block:: bash

    pacman -S nodejs npm
    cd app
    npm install # install dependencies

At this point we're ready to launch our API server. Database and other
configuration variables can be edited on *conf.js*.

.. code-block:: bash

    cd app
    npm run server

If everything went correctly you should see the following message

.. code-block:: bash

    API listening on http://localhost:xxxx/api
    Frontend is visible on http://localhost:xxxx/

You can now open your browser at the frontend url to interact with the app.
