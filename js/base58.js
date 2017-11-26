//ommited 0 O o for readability
var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;

//convert a base 10 integer to a base58 string given the above alphabet
function encode(num){
	var encoded = '';
	while(num){
		var remainder = num % base;
		num = Math.floor(num / base);
		encoded = alphabet[remainder].toString() + encoded;
	}
	return encoded;
}

//decode base58 string to a base 10 integer
function decode(str){
	var decoded = 0;
	while(str){
		var index = alphabet.indexOf(str[0]);
		var power = str.length - 1;
		decoded += index*(Math.pow(base, power));
		str = str.substring(1);
	}
	return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;