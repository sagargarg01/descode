const User = require('../models/user');

module.exports.searchUser = async function(req, res){

   let username = req.query.name;
   console.log(typeof(username))
   if(username != ''){
      let user = await User.find({name : username});
      console.log('user',user)
   }
   console.log(username);
   return res.status(200).json({
      message: 'ok good'
   });
}