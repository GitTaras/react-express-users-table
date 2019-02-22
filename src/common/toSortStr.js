/*
*
* Conwert Map to string
* like "asc:login,desc:FirstName,asc:LastName,desc:LastLogin"
* @param sort_by {Map}
* @returns {String}
*
*/

const toSortStr = (sort_by) => {
  let size = sort_by.size;
  let iter = sort_by.entries();
  let sortStr = "";
  for (let i = 0; i < size; i++) {
    if(i===size-1) {
      let val = iter.next().value;
      sortStr = sortStr.concat(`${val[1]}:${val[0]}`);
      continue;
    }
    //[key, value];
    let val = iter.next().value;
    sortStr = sortStr.concat(`${val[1]}:${val[0]},`);
  }
  console.log('sorted string', sortStr);
  return sortStr;
}

export default toSortStr;