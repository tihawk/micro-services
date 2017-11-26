module.exports.timeService =  function(input){
	//if input is in unix time, multilpy by 1000 before making a date object
	if(Number(input) == input) {input *= 1000;}
	//attempt to make a date
	var date = new Date(input);
	//make month into string
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  	var monthName = months[date.getMonth()];
  	//validate if real date, and return appropriately
  	var response = {};
  	if(monthName!==undefined){
  		response.natural = date.getDate() + ' of ' + monthName + ', ' + date.getFullYear();
  		response.unixtime = date.getTime()/1000;
  	}
  	else{
  		response.natural = null;
  		response.unixtime = null;
  	}
  	return response;
};