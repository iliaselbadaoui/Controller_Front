'user strict';

function bridge(o)
{
	var xhr = new XMLHttpRequest(),
		promise,
		fd = new FormData();
	xhr.open(o.method, o.url, true);
	promise = new Promise((resolve, reject)=>{
		let time = setInterval(function(){
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4)
				{
					if (xhr.status === 200)
					{
						resolve("Done");
						o.good(xhr.response, xhr.status)
					}
					else{
						reject("Fail");
						o.bad(xhr.response, xhr.status);
					}
				}
			};
		}, 1);
	});
	for (const key in o.data) {
		if (o.data.hasOwnProperty(key)) {
			fd.append(key, o.data[key])
		}
	}
	xhr.send(fd);
	return promise;
}