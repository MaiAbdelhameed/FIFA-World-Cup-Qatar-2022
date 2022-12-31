const Reserve = require('../models/reserve');

exports.addReserve= async (req, res)=>{
    try {
        const reserve = await Reserve.create({ ...req.body});
        if (!(reserve.creditCard && reserve.PIN && reserve.numTickets)) {
            res.status(400).send("Please fill all required inputs");
        }
        
        return res.json(reserve);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
      }
};


exports.allReserves = async (req, res)=> {
    await Reserve.find().sort({createdAt:-1})
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
};


exports.singleReserve = async (req, res)=> {
    await Reserve.findById(req.params.id)
    .then((result)=>{
        console.log(result);
        res.send(result);
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).send(err);
    });
};


exports.deleteReserve=  (req,res)=>{

    Reserve.findByIdAndDelete(req.params.id)
    .then(result => {
        res.json(result)
    })
    .catch((err)=>console.log(err));
};

exports.editReserve= async (req, res, next)=>{
    try{
        const reserve = await Reserve.findById(req.params.id);
        console.log(reserve);
        const updates= Object.keys(req.body);
        updates.forEach((element)=> (reserve[element] = req.body[element]));
        await reserve.save();
        res.send(reserve);
    }
    catch(e){
        res.status(400);
        res.send({error: e.toString()});
    }
};
