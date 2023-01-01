const Match = require('../models/matches');

exports.addMatch= async (req, res)=>{
    try {
        const match = await Match.create({ ...req.body});
        if (!(match.firstTeam && match.secondTeam && match.venue && match.date && match.time && match.referee && match.firstLinesmen && match.secondLinesmen && match.seating)) {
            res.status(400).send("Please fill all required inputs");
        }
        
        return res.json(match);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
      }
};


exports.allMatches = async (req, res)=> {
    await Match.find().sort({createdAt:-1})
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        return res.status(400).json({ message: err.message });
    });
};


exports.singleMatch = async (req, res)=> {
    const match_id=req.params.id;
    await Match.findById(match_id)
    .then((result)=>{
        console.log(result);
        res.send(result);
    })
    .catch((err)=>{
        return res.status(400).json({ message: err.message });
    });
};


exports.deleteMatch =  (req,res)=>{
    const matchid = req.params.id;

    Match.findByIdAndDelete(matchid)
    .then(result => {
        console.log(result)
        res.json(result)
    })
    .catch((err)=>{
        return res.status(400).json({ message: err.message });
    });
};

exports.editMatch= async (req, res, next)=>{
    try{
        const match = await Match.findById(req.params.id);
        console.log(match);
        const updates= Object.keys(req.body);
        console.log(updates);
        updates.forEach((element)=> (match[element] = req.body[element]));
        await match.save();
        res.send(match);
    }
    catch(e){
        res.status(400);
        res.send({error: e.toString()});
    }
};
