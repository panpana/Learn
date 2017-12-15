'use strict'
function asyncFun(name){
	return new Promise(function(resolve){
		setTimeout(function (){
			resolve('my name is ' + name);
		}, 2000);
	});
}
function sum(a,b){
	return new Promise(function (resolve){
		setTimeout(function (){
			resolve(a+b);
		});
	});
}
function * fn (name){
	if(yield sum(3,5) > 6){
		asyncFun(name);
	} else {
		console.log("error ")
	}
	
}

let gf = fn("panpan");
function exec (gf,value){
	let result = gf.next(value);
	if (!result.done){
		if(result.value instanceof Promise){
			result.value.then(function (v){
				exec(gf,v);
			});
		}else {
			exec(gf,result.value);			
		}
	}
	
}

exec(gf);

