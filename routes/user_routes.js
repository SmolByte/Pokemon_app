/**
 * The routes to access the differernt specific pokemon 
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

module.exports = router;