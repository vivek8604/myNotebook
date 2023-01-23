const express=require('express')
const router=express.Router()
const { body, validationResult } = require('express-validator');
const Note = require('../modals/Note')
const fetchuser=require('../middleware/fetchuser')
// Route:1 Fetching all notes of the user using GET Login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
   //if there are error return bad request and error
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   try {
    let notes =await Note.find({user:req.user.id}) //in  the fetchuser  middleware req.user retutn whole user obj but we only user id for that we will use req.user.id
    res.json(notes)
    console.log(notes)
   } catch (error) {
    console.error(error.message)
    res.status(500).send("Some error occured")
  }
})
// Route:2 adding a notes of the user using GET Login required
router.post('/addnote',fetchuser,[
    body('title','enter a valid title').isLength({min:5}),// enter a valid title
    body('description','enter a valid description').isLength({min:7}),// enter a valid title
    
    ],async(req,res)=>{
      
      try {
        const {title,description,tag}=req.body
        //if there are error return bad request and error

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note =new Note({
        title,description,tag,user:req.user.id
      })
      const saveNote=await note.save()
      console.log(saveNote)
      res.json(saveNote)
      }catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
      }
    })
    // Route:3 updating an existing note of the user using put  Login required
    router.put('/updatenote/:id',fetchuser,
      async(req,res)=>{
          const {title,description,tag}=req.body
          // create a new note object
          const newNote={}
          if(title){newNote.title=title}
          if(description){newNote.description=description}
          if(tag){newNote.tag=tag}
          // find a note to be updated and update it
          let note =await Note.findById(req.params.id)
          if(!note){
            return res.status(401).send({err:"Note not found"})
          }
          // cheacking if userid inside notes is ===current user id (req.user.id) id matches then allow for updation process
          if(note.user.toString() !==req.user.id){
            return res.status(401).end({err:"Not allowed"})
          }
          note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true}) //this function takes id as 1st parameter,2 updated document ,3rd params return updated onject
          res.send(note)
      })  
      // Route:4 delete an existing note of the user using DELEte  Login required
    router.delete('/deletenote/:id',fetchuser,
    async(req,res)=>{
        const {title,description,tag}=req.body       
        // find a note to be delete and delete it
        let note =await Note.findById(req.params.id)
        if(!note){
          return res.status(401).send({err:"Note not found"})
        }
        // if note ki user is equals to current user id then proceed the deleation process
        if(note.user.toString() !==req.user.id){
          return res.status(401).end({err:"Not allowed"})
        }
        note =await Note.findByIdAndDelete(req.params.id) //this function takes id as 1st argument and delete it
        res.send({success:"your note had been successfully deleted"})
    })  

module.exports=router 