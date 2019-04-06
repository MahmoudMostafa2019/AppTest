var isRealString = (str) =>{
  return typeof str ==='string' && str.trim().length > 0;
};

///console.log('mahmoud'.trim().length);
//console.log(isRealString('Mahmoud'));
module.exports = {isRealString};
