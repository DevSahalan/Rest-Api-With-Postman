const express = require('express')
const router = express.Router()
const members = require('../members') 

//body parser json
router.use(express.json())

//gets all members
router.get('/', (req, res)=>{
    res.json(members)
})

//get single member
router.get('/:id', (req, res)=>{
    
    const member = members.find( m=> m.id === parseInt(req.params.id))
    if(!member) {
         res.status(404).send("id didn't found")}
         else{
    res.json(member)}
})



//add member
router.post('/', (req, res)=>{
const newMember = {
    id: members.length + 1,
    name: req.body.name,
    email: req.body.email
} 
if(!newMember.name || !newMember.email){
    res.status(404).send('enter both name and email')
}
else{
    members.push(newMember)
    res.json(members)
}
})



//update member

router.put('/:id', (req, res)=>{

    const member = members.find( m=> m.id === parseInt(req.params.id))
    if(!member) {
         res.status(404).send("id didn't found")}
         else{
    member.name = req.body.name? req.body.name : member.name 
    member.email = req.body.email? req.body.email : member.email 
    res.json(member)
}

})


//delete member

router.delete('/:id', (req, res)=>{

    const member = members.find( m=> m.id === parseInt(req.params.id) )
    if(!member){
        res.status(404).json({message: "id didn't found"})
    }
    else{
        const index = members.indexOf(member)
        members.splice(index, 1)
        res.json(member)
    }

})










module.exports = router