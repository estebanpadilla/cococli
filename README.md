# cococli
A small cli tool to help me develop.


## Installation
To install just run the following command on your terminal. I usually install it on my machine globally but can change that removing the -g
```bash
sudo npm i -g cococli 
```

## Usage
Here a simple table that show how to use it.
```

---------------------------------------------------------------------------------------     
             ██████╗ ██████╗  ██████╗ ██████╗      ██████╗██╗     ██╗
            ██╔════╝██╔═══██╗██╔════╝██╔═══██╗    ██╔════╝██║     ██║
            ██║     ██║   ██║██║     ██║   ██║    ██║     ██║     ██║
            ██║     ██║   ██║██║     ██║   ██║    ██║     ██║     ██║
            ╚██████╗╚██████╔╝╚██████╗╚██████╔╝    ╚██████╗███████╗██║
             ╚═════╝ ╚═════╝  ╚═════╝ ╚═════╝      ╚═════╝╚══════╝╚═╝                               
---------------------------------------------------------------------------------------
                          Using this CLI is very simple!                               
---------------------------------------------------------------------------------------
     Commands      |   Parameters     |  Description                                   
---------------------------------------------------------------------------------------
   -js      |  	   |   filename       |  Creates a javascript file                      
   -html    |  	   |   filename       |  Creates a html file                           
   -css     |	      |   filename       |  Creates a css file                            
   -proj    |  -p    |   name           |  Creates a basic web project                   
   -game    |  -g    |   name           |  Creates a basic game project                  
   -class   |  	   |   name           |  Creates a ES6 class                           
   -htmljs  |        |                  |  Add html helper file		               
   -email   |  	   |   yourEmail      |  Adds your email to config file                
   -author  |        |   name lastName  |  Adds your name and last name to config file.   
   -config  |        |     			    |  Small wizard to setup your information you.   
   -help    |  -h    |                  |  Shows this information                        
   -version |  -v    |                  |  Shows the version		                       
---------------------------------------------------------------------------------------
Example:
coco -js main

When running -config you may need to use sudo due to permissions on your OS.

Update to the latest version using this command: npm update -g cococli
For Webpack project you will need to run: npm install on the root folder after creation
To run the Webpack project on the browser use: npm start
For support or comments send an email to ep@estebanpadilla.com
Thank you for using this tool!
```
If you add author and email, they will be automatically added to the files comments when created.
When running -config you may need to use sudo due to permissions on your OS also if you install this tool globally, you may need to
use sudo when adding author and email. 

## Update
If you want to update to the latest version use the follow command.
```bash
npm update -g cococli
```

## Greetings
For support or comments email me.
ep@estebanpadilla.com
