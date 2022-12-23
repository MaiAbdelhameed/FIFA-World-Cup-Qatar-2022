

const register= async (req, res) =>{
     
    try {
        //const userID=getNextSequence("userID");
        const username = req.body.username;
        const pass=req.body.pass;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const birthDate=req.body.birthDate;
        const gender= req.body.gender;
        const nationality=req.body.nationality;
        const email = req.body.email;
        const role=req.body.role;
        if (!(username && pass && firstName && lastName && birthDate && gender && email && role)) {
            res.status(400).send("Please fill all required inputs");
            }

        // const saltPassword = await bcrypt.genSalt(12)
        // const securePassword = await bcrypt.hash(request.body.password, saltPassword)

        var oldUser = await Users.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
            }
        
        var oldUser = await Users.findOne({ username });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
            }

        const newUser = new Users({
           // userID,
            username,
            pass,
            firstName, 
            lastName,
            birthDate,
            gender,
            nationality,
            email,
            role
        });

        newUser.save()
        .then((result)=>{
            res.send(result)
        }).catch((err)=>{
            console.log(err)
        });

        //generating user token
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: 12,
        }

        const token = jwt.sign(data, jwtSecretKey);
        newUser.token=token;
        res.setHeader();
        res.send(token);
        }
    catch (err) {
        console.log(err);
    }
};



const login=





module.exports={register};
module.exports={login};
//module.exports={authenticate};