const Match = require('../models/matches');

exports.addMatch= async (req, res)=>{
    const newMatch = new Match(req.body);

    newMatch.save()
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    });
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
