
# WarpSpeed Express Sample Application
[Sails.js](http://sailsjs.org) is an MVC pattern enterprise-grade Node.js framework. [WarpSpeed](https://warpspeed.io/) makes it incredibly simple to work with and deploy Sails.js and other Node.js based projects. This guide will help you get up and running with Sails and WarpSpeed.

## Vagrant Development Envrionment

This guide assumes that you are using the WarpSpeed Vagrant development environment. Doing so will help you follow best practices and keep your development and production environments as similar as possible. If you are not using WarpSpeed Vagrant, ignore the sections that involve using the VM.

## Fork and Clone the Sample Project
The best way to begin using this project is to fork the repository to your own GitHub account. This will allow you to make updates and begin using the project as a template for your own work. To fork the repository, simply click the "Fork" button for this repository.

Once you have forked the repository, you can clone it to your development environment or use pull-deploy to deploy it directly to a server configured with WarpSpeed.io.

Ideally, you should be using the WarpSpeed Vagrant development environment. The instructions below will assume this, although it isn't necessary if you already have a python environment set up.

To clone the repository to your local machine (not in your VM), use the following command:

```
# RUN THIS COMMAND FROM YOUR LOCAL ENVIRONMENT

cd ~/Sites
git clone git@github.com:YOUR_USERNAME/node-sails-sample.git warpspeed-sails.dev
```

## Create a Database

The sample project uses a [MongoDB](https://www.mongodb.org/) document-oriented database. Mongo and its interactive shell come preinstalled on the Warpspeed Vagrant box. With some effort, the sample project can be configured with a traditional SQL database, however, Node.js web applications conventionally operate with NoSQL databases such as MongoDB. To access the Mongo interactive shell, run the following commands: 

```
# if you aren't already in your VM then...
# cd to your warpspeed-vagrant directory
# and ssh into your VM
cd ~/warpspeed-vagrant
vagrant ssh

# activate the Mongo interactive shell
mongo

# list all existing MongoDB databases
show dbs

# create a dedicated database
use tasks_db

# create a dedicated collection
db.createCollection('tasks')

# exit and save
exit
```

This will create a database named "tasks_db" with a collection, roughly equivalent to an SQL database's table, named 'tasks', in which your Task objects will be stored. Explicitly creating the database through the Mongo interactive shell is not necessary for the sample project to function properly. The requisite database and collection are generated at run-time according to the specifications found in the `connections.js` file located in the `config/` directory.

## Configure your Evironment

Sails ships with richly documented configuration options found inside the `config/` directory. Moreover, Sails defaults to a development envrionment, providing you with verbose error logs. To change the MongoDB database to which your application is connected, run the following commands:

```
# RUN THESE COMMANDS FROM YOUR LOCAL MACHINE
  
# cd to your project's root directory
cd ~/sites/warpspeed-sails.dev

# edit the connections.js file
nano config/connections.js

# the MongoDB connection should
# resemble the following when complete:

 someMongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    user: '',
    password: '',
    database: 'tasks_db'
  },

# exit and save  
```  
Note that MongoDB does not require admin authentication by default.

## Create a WarpSpeed Site

We need to create the appropriate server configuration files to run the site. To configure NGINX and Passenger to run your site, perform the following:

```
# if you aren't already in your VM then...
# cd to your warpspeed-vagrant directory
# and ssh into your VM
cd ~/warpspeed-vagrant
vagrant ssh

# then, run the site creation command
# notice that --force is used because the site directory already exists
warpspeed site:create node warpspeed-sails.dev --force
```
Note that each time you edit a file in this sample project, you must reload the NGINX and Passenger configuration files for the changes to effectuate. See [Restart your Site and Celebrate](#site_reload).

## Install Sails.js

Sails.js utilizes Node Package Manager (npm) to manage its dependencies. To install the required libraries listed in the `package.json`, run the following commands: 

```
# RUN THESE COMMANDS FROM YOUR VM

# cd to the project's root directory
cd ~/sites/warpspeed-sails.dev

# install Sails.js
npm install
```

Note that installing Sails.js globally will provide you with some nifty command line functionality including automatic API generation. Moreover, you will have access to the `sails new sample-project` command, which configures your project's file structure as seen in this repository.

```
# RUN THESE COMMANDS FROM YOUR VM

# install Sails.js globally
sudo npm install sails -g

# ...to start a new project
# cd to your sites directory
cd ~/sites
sails new sample-project

``` 

## Add a Hosts File Entry

To access your new Sails site, you will need to add an entry to your hosts file on your local machine (not your VM). To do so, perform the following:

```
# RUN THESE COMMANDS FROM YOUR LOCAL MACHINE

# open a terminal and run the following command (for Mac)
sudo nano /etc/hosts

# add this line to the end of the file
192.168.88.10 warpspeed-sails.dev

# exit and save
```

Now, whenever you access "warpspeed-sails.dev" in the browser, you will be directed to your Express site within your VM.

## <a name="site_reload"></a>Restart your Site and Celebrate
Finally, we need to reload the site configuration to finalize and effectuate our changes. To do so, perform the following:

```
# RUN THESE COMMANDS FROM YOUR VM

# reload the site configuration
warpspeed site:reload warpspeed-sails.dev

# ... or touch the restart.txt file
cd ~/sites/warpspeed-sails.dev
touch tmp/restart.txt
```

Now you can access http://warpspeed-sails.dev on your local machine to view the site.

## Troubleshooting

If you have issues, chiefly a 500 Status Code Internal Error, and need to troubleshoot, view the NGINX error log for helpful clues.

```
# RUN THESE COMMANDS FROM YOUR VM

# open the NGINX error log
sudo nano /var/log/nginx/error.log

# ...or keep an open tab of the NGINX error log
sudo tail -f /var/log/nginx/error.log
```

NGINX and Passenger handle the `sails lift` or `node app.js` commands each time the site's configuration is reloaded. Manually running these commands from your site's root directory in your VM will provide stack-traces in the event of a run-time error as well as all `console.log()` data.

# License
This sample project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).


