const expect = require('expect');
var {isRealString} = require('./validation.js');


describe('isRealString validation',()=>{

  it('should reject non-string value ',()=>{
var text=600 ;
var finalMess=isRealString(text);
//to be true
expect(finalMess).toBe(false);
  });

it('should reject string with only spaces',()=>{
  var text='   ';
  var finalMess=isRealString(text);
  expect(finalMess).toBe(false);
  //to be true

});

it('should allow string with non-spaces character',()=>{
  var text='Messtest';
  var finalMess=isRealString(text);
  //to be true
  expect(finalMess).toBe(true);

});

});
