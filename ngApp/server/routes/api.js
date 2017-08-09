const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const  video = require('../models/video');
const db = "mongodb://karan:karan1992@ds151060.mlab.com:51060/videoplayer";
mongoose.Promise = global.Promise;
mongoose.connect(db,function(err){
if(err){
    console.error("Error !"+ err);
}
});
router.get('/videos',function(req,res){

   console.log("GET ALL VIDEOS");
   video.find({})
   .exec(function(err,videos){
        if(err)
        {
            console.log("error");
        }
        else{
            res.json(videos)
        }
   });

});

router.get('/videos/:id',function(req,res){

   console.log("GET one video");
   video.findById(req.params.id)
   .exec(function(err,video){
        if(err)
        {
            console.log("error");
        }
        else{
            res.json(video)
        }
   });

});

router.post('/video',function(req,res){

   console.log("post one video");
   var newvideo = new video();
   newvideo.title = req.body.title;
    newvideo.url = req.body.url;
   newvideo.description = req.body.description;

   newvideo.save(function(err,insertvideo){
        if(err)
        {
            console.log('Error saving video');
        }
         else{
             res.json(insertvideo);
         }   
   })

   video.findById(req.params.id)
   .exec(function(err,video){
        if(err)
        {
            console.log("error");
        }
        else{
            res.json(video)
        }
   });

});

router.put('/video/:id',function(req,res){

   console.log("update one video");
   video.findByIdAndUpdate(req.params.id,{
        $set:{title: req.body.title,url: req.body.url,description: req.body.description}
   } ,
   {
       new:true 
   },
  
  function(err,updatevideo)
    {
        if(err)
            {
                res.send("EROR updating video");
            }
            else{
                res.json(updatevideo);
            }
    }
   )
});

router.delete('/video/:id',function(req,res){
        console.log('Deleted Video');
        video.findByIdAndRemove(req.params.id,function(err,deletedvideo){
            if(err)
            {
                res.send("EROR DELETING VIDEO");
            }
            else{
                res.json(deletedvideo);
            }
        })
});

module.exports = router;