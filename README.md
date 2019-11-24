# cococli
A small cli tool to help me develop.


## Installation
To install just run the following command on your terminal. I usually install it on my machine globaly but can change that removing the -g.
```bash
npm i -g cococli 
```

##Usage
Here a simple table that show how to use it.
```
---------------------------------------------------------------------------------------
	                         Using this CLI is very simple!                            
---------------------------------------------------------------------------------------
	     Commands    |   Parameters     |  Description                                 
---------------------------------------------------------------------------------------
	   -js      |  	 |   filename       |  Creates a javascrip file                    
	   -html    |  	 |   filename       |  Creates a html file                         
	   -css     |	 |   filename       |  Creates a css file                          
	   -proj    | -p |   name           |  Creates a basic web project                 
	   -game    | -g |   name           |  Creates a basic game project                
	   -class   |  	 |   name           |  Creates a ES6 class                         
	   -email   |  	 |   yourEmail      |  Adds your email to config file              
	   -author  |    |   name lastName  |  Adds your name and lastname to config file  
	   -help    | -h |                  |  Shows this information                      
	   -version | -v |                  |  Shows the version		                   
---------------------------------------------------------------------------------------
```

##Update
If you want to update to the latest version use the follow command.
```bash
npm update -g cococli
```

##Greetings
For support or comments send me an email
Thank you for using this tool!

##Running on Developement
node cli.js Commands Parameters

##Update package to npm repo
Change the version number, commit all changes to Github and then run on terminal.
```bash
npm publish --access public
```