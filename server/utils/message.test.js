const expect = require('expect');
var {genMess,genLocMessage} = require('./message');

describe('generate message',()=>{
  it('should done in all cases',()=>{
var from='Admin';
var text='Mess test ';
var finalMess=genMess(from,text);
expect(finalMess.createAt).toBeA('number');
expect(finalMess).toInclude({from,text});
  });
});

//---
describe('generate genLocMessage',()=>{
  it('should done in all cases',()=>{
var from='Admin';
var lat=30.0499;
var lang=31.2486;
var url='https://www.google.com/maps?q=30.0499,31.2486';
var finalMess=genLocMessage(from,lat,lang);
expect(finalMess.createAt).toBeA('number');
expect(finalMess).toInclude({from,lat,lang,url});
expect(finalMess.url).toInclude(url);//`https://www.google.com/maps?q=${lat},${lang}
  });
});
