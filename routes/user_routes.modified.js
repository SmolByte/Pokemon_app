/**
 * The routes to access the different specific pokemon 
 * 
 * @authors: Nikhil Parikh, Xavier Williams 
 */
const express = require('express');
const router = express.Router();

router.get('/:userID', async (req, res, next) => {
    const userID = req.params.userID;
    
    if (userID == null){
        res.status(404).json({
            message: 'User not found!'
        });
    } else {
        res.status(200).json({
            message: "Welcome to your user page!"
        });
    }
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling POST requests to /user"
    });

});

module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn && !req.session.userinfo) {
        return res.redirect("/redirect/login.pug");
    }
    next();
}
  
router.get("/", (req, res) => {
    if (req.session && req.session.userinfo && req.session.isLoggedIn) {
      return res.redirect("/signup.pug");
    } else {
      return res.redirect("/redirect/login.pug");
    }
  });

  
  router.get("/redirect/login.pug", authController.redirectlogin.pug);
  router.get("/auth/login/callback", authController.callbacklogin.pug);
  router.get("/redirect/logout", authController.logOut);
  
  
  router.param('userID', function(req, res, next, value){
    console.log('Request for a User ' + value);
    next();
})

router.get('/userID', async function(req, res){
   try {
       let result = await _id.findOne({_id: ObjectID(req.params.userID)});
       console.log(result);

       res.render('name', {name: result.name})
   } catch(e){
       console.log(e.message);
   }
});


module.exports = router;