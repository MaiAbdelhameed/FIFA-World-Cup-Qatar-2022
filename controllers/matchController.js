const Match = require('../models/matches');

exports.addMatch= async (req, res)=>{
    try {
        const match = await Match.create({ ...req.body});
        if (!(match.firstTeam && match.secondTeam && match.venue && match.date && match.time && match.referee && match.firstLinesmen && match.secondLinesmen)) {
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
        console.log(err)
    });
};


exports.singleMatch= async (req, res)=> {
    const matchid=req.params.id;
    await Match.findById(matchid)
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
};


exports.deleteMatch =  (req,res)=>{
    const matchid = req.params.id;

    Match.findByIdAndDelete(matchid)
    .then(result => {
        res.json({redirect: '/all-matches'})
    })
    .catch((err)=>console.log(err));
};

exports.editMatch= async (req, res, next)=>{
    try{
        const match = await Match.findById(req.matchData._id);

        const updates= Object.keys(req.body);

        updates.forEach((element)=> (match[element] = req.body[element]));
        await match.save();
        res.send(match)    ;
    }
    catch(e){
        res.status(400);
        res.send({error: e.toString()});
    }
};
