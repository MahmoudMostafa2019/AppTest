const expect = require('expect');
var {User} = require('./user');

describe('Users Class',()=>{
  //var users;
  		beforeEach(()=>{
  			users=new User();
  			users.users=[{
  			id:20
  			,name:'enter name_1'
  			,room:'dev-room'
      },{
      id:203
      ,name:'enter name_2'
      ,room:'dev-room'
    },{
    id:204
    ,name:'enter name_3'
    ,room:'dev-room_2'
  }];
  		}
  		);

  it('Add user',()=>{
    var userData={id:20,name:'Andrew' ,room:'dev'};
    var newUser=new User();
    var adduser= newUser.addUser(userData.id,userData.name,userData.room);
    expect(newUser.users).toEqual([userData]);
  });

it('get User List',()=>{
  //getUserList(room)
  var adduser= users.getUserList('dev-room');
  expect(adduser).toEqual(['enter name_1','enter name_2']);
});

it('get User by id',()=>{
//getUser
var adduser= users.getUser(204);
expect(adduser).toEqual(['enter name_3']);
});

it('remove User by id',()=>{
var adduser= users.removeUser(204);
// expect(adduser.id).toBe(203);
expect(adduser.length).toBe(2);});
});

// expect(adduser.id).toNotExist();
