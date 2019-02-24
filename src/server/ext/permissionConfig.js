const UsersModel = require("../models/usersCallbackToPromise.js");

module.exports.setRoles = (acl)=> {
  // Define roles, resources and permissions
  console.log("Define roles, resources and permissions")
  acl.allow([
    {
        roles: 'admin',
        allows: [
          { resources: '/api/user/', permissions: '*' },
          { resources: '/api/domain/', permissions: '*' },
          { resources: '/api/role/', permissions: '*' }
        ]
    }, {
        roles: 'user',
        allows: [
          {resources:'/api/user/:id', permissions:'get'},
          {resources:['/api/users','/api/users/:search'], permissions:'get'},
          {resources:['/api/checkmail/:mail/:id'], permissions:'get'},
          {resources:['/api/roles', '/api/domains'], permissions:['get']}
        ]
    }, {
        roles: 'guest',
        allows: [
          { resources: '/pub', permissions: '*' },
          { resources: '/favicon.ico', permissions: '*' },
        ]
    }
  ]);
  // Inherit roles
  //  Every user is allowed to do what guests do
  //  Every manager is allowed to do what user do
  //  Every admin is allowed to do what manager do
  acl.addRoleParents('user', 'guest');
  acl.addRoleParents('manager', 'user');
  acl.addRoleParents('admin', 'manager');

  const fn = (user) => {
    console.log(`Adding role ${user.role} for ${user.FirstName}`)
    return acl.addUserRoles(user._id.toString(), user.role)
  }


  const fn2 = (user) => {
    // console.log(`Checking role ${user.role} for ${user.FirstName}`)
    return acl.allowedPermissions(user._id.toString(), ['/api/user', '/api/user/:id', '/api/roles'])
  }

  let Gusers = null

  UsersModel.getUsersWithRoles()
  .then((users)=>{
    Gusers = users
    console.log('promise1 users', users[0])
    return Promise.all(users.map(fn))
  }).then((result)=>{
    console.log('Successfully added roles to users ', result)
    console.log('Chacking added roles to users')
    return Promise.all(Gusers.map(fn2))
  }).then((result)=>{
    console.log(`result of chacking`, result)
  }).catch((e)=>{
    console.log("acl.addUserRoles Error: ", e)
  });
}