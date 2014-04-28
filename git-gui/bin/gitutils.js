var gitutils={};

function isWindows(){
	if(process.platform.indexOf('win') !=-1 ){
		return true;
	}
	return false;
}

gitutils.gitClone=function(url,res){
	//gitutils.execClone(res,url,'C:/Users/lenovo/git/');

	var exec = require('child_process').exec,child;

	var homedir='~';
	if(isWindows()){
		homedir='%userprofile%';
	}
	
	child = exec('echo '+homedir+'/git/',function (error, stdout, stderr) {
		
		var rep=stdout.replace(/\\/g,'/').trim();
		console.log('homedir: ' + rep);
		console.log(stdout);
		console.log(stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
		gitutils.mkdir(url,res,rep);
	});

}

gitutils.mkdir=function(url,res,dir){
	var spawn = require('child_process').spawn;
	console.log('mkdir '+dir);
	mkdir =  spawn('mkdir',['git'], {cwd:dir+'../',  env: process.env})

	
	mkdir.stdout.on('data', function (data) {
	  console.log('stderr: ' + data); 
	});
	
	mkdir.stderr.on('data', function (data) {
	  console.log('stderr: ' + data); 
	});
	
	mkdir.on('close', function (code) {
		console.log('code: ' + code);
		gitutils.execClone(res,url,dir);
	});	
}

gitutils.execClone=function(res,url,dir){
	console.log('clone '+url+' to '+dir);
	var spawn = require('child_process').spawn;
	clone = spawn('git', ['clone', url], {cwd:dir,  env: process.env, detached: true});
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

module.exports = gitutils;