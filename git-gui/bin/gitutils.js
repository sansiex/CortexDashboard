var location='c:/git/';

var gitutils={};

function execClone(res,url){
	var spawn = require('child_process').spawn;
	clone = spawn('git', ['clone', url], {cwd:location,  env: process.env, detached: true});
	clone.unref();
	var output='Output from git:\r\n';

	clone.stdout.on('data', function (data) {
	  console.log('stdout: ' + data);
	  output+=data;
	});

	clone.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);	
	  output+=data;	  
	});

	clone.on('close', function (code) {
	  console.log('child process exited with code ' + code);
	  res.send(output);
	});
}

gitutils.gitClone=function(url,res){
	var spawn = require('child_process').spawn;
	
	mkdir =  spawn('mkdir',['git'], {cwd:'c:/',  env: process.env})
	
	var clone;
	
	mkdir.on('close', function (code) {
		console.log('code: ' + code);
		execClone(res,url);
	});	
}

module.exports = gitutils;