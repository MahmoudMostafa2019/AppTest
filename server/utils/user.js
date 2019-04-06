// - array of users
// 	- addUser(id,name,room)
// 	  removeUser(id)
// 	  getUser(id)
// 	  getUserList(room)


class User {
  constructor() {
  console.log('constructor here inside');
  this.users = [];
  }

  addUser(id,name,room){
    var user={id,name,room};
     this.users.push(user);
     return user;
  }
  removeUser(id){
    //remove from array pull
    var userFiltered=this.users.filter((user)=>{return user.id===id;  });//return array of object
    if (userFiltered) {
      return this.users.filter((userFiltered)=>{return userFiltered.id !==id;  });
    }
  //  return userFiltered;
  }
  getUser(id){
    //filter/search by id
    var userFiltered=this.users.filter((user)=>{return user.id===id;  });//return array of object
    var userNames=userFiltered.map((user)=>user.name);//return array of string
    return userNames;
  }

  getUserList(room){
    var userFiltered=this.users.filter((user)=>{return user.room===room;  });//return array of object
    var userNames=userFiltered.map((user)=>user.name);//return array of string
    return userNames;
//filter/search by room

  }
}

module.exports = {User};
