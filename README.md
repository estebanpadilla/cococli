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
                          Using this CLI is very simple!                               
---------------------------------------------------------------------------------------
     Commands      |   Parameters     |  Description                                   
---------------------------------------------------------------------------------------
   -js      |  	   |   filename       |  Creates a javascrip file                      
   -html    |  	   |   filename       |  Creates a html file                           
   -css     |	   |   filename       |  Creates a css file                            
   -proj    |  -p  |   name           |  Creates a basic web project                   
   -webpack | -wp  |   name           |  Creates a basic webpack project               
   -game    |  -g  |   name           |  Creates a basic game project                  
   -class   |  	   |   name           |  Creates a ES6 class                           
   -email   |  	   |   yourEmail      |  Adds your email to config file                
   -author  |      |   name lastName  |  Adds your name and lastname to config file.   
   -config  |      |     			  |  Small wizard to setup your information you.   
   -help    |  -h  |                  |  Shows this information                        
   -version |  -v  |                  |  Shows the version		                       
---------------------------------------------------------------------------------------
```
If you add author and email, they will be automatically added to the files comments when created, like so.

When running -config you may need to use sudo due to permissions on your OS.

/**
* @name esteban.js
* @file Add a small description for this file.
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/

If you install this tool globally, you may need to use sudo when adding author and email. 

## Update
If you want to update to the latest version use the follow command.
```bash
npm update -g cococli
```

## Greetings
For support or comments send me an email
ep@estebanpadilla.com
Thank you for using this tool!
