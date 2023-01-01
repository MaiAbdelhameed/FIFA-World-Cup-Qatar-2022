const Stadium = require('../models/stadium.js');


exports.addStadium= async (req, res)=>{
    try {
        const stadium = await Stadium.create({ ...req.body});
        if (!(stadium.venue && stadium.numRows && stadium.numSeats)) {
            res.status(400).send("Please fill all required inputs");
        }
        
        return res.json(stadium);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
      }
};


exports.allStadiums= async (req, res)=> {
    await Stadium.find().sort({createdAt: -1})
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        return res.status(400).json({ message: err.message });
    });
};


exports.singleStadium = async (req, res)=> {
    await Stadium.findById(req.params.id)
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        return res.status(400).json({ message: err.message });
    });
};


exports.deleteStadium = async (req,res)=>{
    await Stadium.findByIdAndDelete(req.params.id)
    .then((result) =>{
        res.send(result)
    })
    .catch((err)=>{
        return res.status(400).json({ message: err.message });
        });
};


exports.editStadium= async (req, res, next)=>{
    try{
        const stadium = await Stadium.findById(req.params.id);

        const updates= Object.keys(req.body);

        updates.forEach((element)=> (stadium[element] = req.body[element]));
        await stadium.save();
        res.send(stadium);
    }
    catch(e){
        return res.status(400).json({ message: err.message });
    }
};
