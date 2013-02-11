var stringifyJSON = function(obj) {
  // {foo:'bar', this: 1, key3: Object } ---- Object is {"poo": 3]}
  // "{"foo":"bar","this":1,"key3":{"poo":3}}" ----- Final Stringify
  var stringifiedObj = '',
  		finalResult = '';

  // Stringifies an array
  var arrayString = function(array) {
  	stringifiedObj = '[';
  	var arrayContents = '';

  	for(var i = 0; i < array.length; i++){
  		if(typeof(array[i]) === 'object' && array[i]){
				arrayContents += '{' + objParser(array[i]) + '}';
			}
  		if(typeof(array[i]) === 'string'){
  			arrayContents += '\"' + array[i] + '\"';
  		}
  		if(typeof(array[i]) === 'number'){
  			arrayContents += array[i];
  		}
			if(typeof(array[i]) === 'boolean'){
        arrayContents += array[i].valueOf();
      }
      if(typeof(array[i]) === 'undefined'){
        arrayContents += 'undefined';
      }
      if(array[i] === null){
        arrayContents += 'null';
      }
  		arrayContents += ',';
  	}
  	stringifiedObj += arrayContents; 
  	stringifiedObj = stringifiedObj.substr(0, stringifiedObj.length-1);
  	return stringifiedObj += ']';
  };

  // returns stringified obj
  var objParser = function(obj) {
		var parsedObj = '';

		for (var key in obj) {
			if(Array.isArray(obj[key])){
				parsedObj += '\"' + key + '\"' + ':' + arrayString(obj[key]);
				parsedObj += ',';
				continue;
			}
			if(typeof(obj[key]) === 'object' && obj[key]){
				parsedObj += '\"' + key + '\"' + ':' + '{' + objParser(obj[key]) + '}';
				parsedObj += ',';
				continue;
			}
			if(typeof(obj[key]) === 'number'){
				parsedObj += '\"' + key + '\"' + ':' + obj[key];
				parsedObj += ',';
				continue;
			}
			if(typeof(obj[key]) === 'string'){
				parsedObj += '\"' + key + '\"' + ':' + '\"' + obj[key] + '\"';
				parsedObj += ',';
				continue;
			}
			if(typeof(obj[key]) === 'boolean'){
				parsedObj += '\"' + key + '\"' + ':' + obj[key].valueOf();
				parsedObj += ',';
				continue;
			}
			if(typeof(obj[key]) === 'undefined'){
				parsedObj += '\"' + key + '\"' + ':' + 'undefined';
				parsedObj += ',';
				continue;
			}
			if(obj[key] === null){
				parsedObj += '\"' + key + '\"' + ':' + 'null';
				parsedObj += ',';
				continue;
			}

			parsedObj += ',';
		}
		return parsedObj.substr(0, parsedObj.length-1);	
	};

  // handles all passed in arrays
  if(Array.isArray(obj)){

  	//handles empty arrays
  	if(obj.length === 0){
  		return finalResult = '[]';
  	}
  	return finalResult += arrayString(obj);
  }

  // handles obj with all sorts of types and nesting
	if(typeof(obj) === 'object'){
		stringifiedObj = '{';
 		return finalResult += stringifiedObj + objParser(obj) + '}';
	}


 }
