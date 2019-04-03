var genMess= (from,text)=>{
return {from,text,createAt:new Date().getTime()}
};

var genLocMessage= (from,lat,lang)=>{
return {  from,lat,lang,createAt:new Date().getTime(),url:`https://www.google.com/maps?q=${lat},${lang}`}
};

module.exports = {genMess,genLocMessage};
