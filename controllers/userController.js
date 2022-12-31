const Users = require('../models/users.js');


exports.allUsers= async (req, res)=> {
    await Users.find().sort({createdAt: -1})
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        return res.status(400).json({ message: err.message });
    });
};


exports.singleUser = async (req, res)=> {
    const user_id=req.params.id;
    await Users.findById(user_id)
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        return res.status(400).json({ message: err.message });
    });
};


exports.deleteUser = async (req,res)=>{
    const id = req.params.id;

    await Users.findByIdAndDelete(id)
    .then((result) =>{
        console.log(result)
        res.send(result)
    }).catch((err)=>{
        return res.status(400).json({ message: err.message });
    });
};


exports.editUser= async (req, res, next)=>{
    try{
        const user = await Users.findById(req.userData._id);

        const updates= Object.keys(req.body);

        updates.forEach((element)=> (user[element] = req.body[element]));
        await user.save();
        res.send(user);
    }
    catch(e){
        res.status(400);
        res.send({error: e.toString()});
    }
};
