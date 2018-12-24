var config={};

config.staging={
port:3000
}

config.production={
	port:5000
}

var env=typeof(process.env.APP_ENV)=="string"?process.env.APP_ENV:'staging';



var configObject=typeof(config[env])!=="undefined"?config[env]:config.staging;


module.exports =configObject;