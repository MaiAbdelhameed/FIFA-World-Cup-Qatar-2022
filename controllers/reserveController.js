const Reserve = require('../models/reserve');

exports.addReserve= async (req, res)=>{
    try {
        /* const reserve = await Reserve.create({ ...req.body});
        if (!(reserve.numTickets && reserve.matchID && reserve.userID)) {
            res.status(400).send("Please fill all required inputs");
        } */
        const userID=req.params.userID;
        const matchID=req.params.matchID;
        const numTickets=req.body.numTickets;
        if (!numTickets)
        {
            res.status(400).send("Please enter the number of tickets.");
        }
        const reserve= new Reserve({
            numTickets,
            matchID,
            userID
        });

        reserve.save()
        .then((result)=>{
            console.log(result)
            res.send(result)
        })
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
    const userID=req.params.userID;
    await Reserve.find({
        "userID":userID
    })
    .then((result)=>{
        console.log(result);
        res.send(result);
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).send(err);
    });
};


exports.deleteReserve=  async (req,res)=>{
    const userID=req.params.userID;
    const matchID=req.params.matchID;

    await Reserve.findOneAndDelete({
        "matchID": matchID,
        "userID":userID
    })
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
