/*
*
*Convert string to sort object
*@param sort {String} req.sort query string
*like "asc:login,desc:FirstName,asc:LastName,desc:LastLogin"
*@returns {Object} Object -> `
*{ fild1Name: diraction, fild2Name: diraction, ... }`
* or Null if input string is empty
*
*/
module.exports.toSortObj = (sort_by) => {
	if (sort_by.length && typeof(sort_by) === "string") {
		let orderWithFildsName = [];
		let res={};
		let foo = sort_by.split(/,/);
		//["acs:login", "desc:FirstName"]
		for (let i = 0; i < foo.length; i++) {
			// nested array
			// orderWithFildsName.push(foo[i].split(/:/));
			// one level array
			//["acs","login","desc","FirstName"]
			orderWithFildsName = [...orderWithFildsName, ...foo[i].split(/:/)];
			orderWithFildsName[i*2] ==='asc' ? orderWithFildsName[i*2]=1 : orderWithFildsName[i*2]=-1;
			console.log("o",orderWithFildsName);
			// skip cycle
			if (i===foo.length-1) {
				res = orderWithFildsName.reduce((result, item, index)=> {
					if (!(index%2)) {
						result[orderWithFildsName[index+1]] = Number(item);

					}

					// console.log("it",item);
					// console.log("res",result);
					return result;
				}, {});
			}
			// console.log("order", orderWithFildsName);
		}
		// console.log("oren",orderWithFildsName);
		//console.log("baren",bar);
		return res;
	}
	return null;
};