const express = require('express')
const User = require('../models/users')
const router = express.Router()
const bcrypt = require('bcrypt')

//isemail
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
//sign up
router.post('/', (req, res)=>{

    bcrypt.hash(req.body.pass, 10, (err, hash)=> {
        if(err){
            console.log(err)
        }

        User.findOne({ email: req.body.email })
        .then(email=>{
            if(email){
                res.json({message: "email already exist"})
                return
            }else if(req.body.pass !== req.body.pass2){
                res.json({message: "password didn't match"})
            }else if(!isEmail(req.body.email)){
                res.json({message: "email isn't valid"})
            }else{
                const user = new User({
                    email: req.body.email,
                    pass: hash
                })
                user.save()
                .then(userItem=>{
                    res.json({message: "user created successfully"})
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })

        

    })

    

// res.send("you're in users room")

})

router.get('/', (req, res)=>{
    User.find()
    .then(users=>{
        res.json(users)
    }).catch(err=>{
        console.log(err)
    })
})


router.post('/login', (req, res)=>{
    const email = req.body.email
    const pass = req.body.pass
    User.findOne({email})
    .then(user=>{
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=>{
                if(err){
                    res.json({message: "error occured"})
                }
                if(result){
                    res.json({message: "login succesfully"})
                }else{
                    res.json({message: "password didn't match"})
                }
            })




        }else{
            res.json({message: "invalid email"})
        }




    })
})

       


    
module.exports = router