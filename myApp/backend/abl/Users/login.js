const Ajv = require("ajv");
const ajv = new Ajv();

const usersDao = require("../../dao/users-DAO");
const schema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password:{type:"string"},       
  },
  required: ["email","password"],
  additionalProperties: false,
};
async function Login(req,res)
{
    try{
        const user=req.body
        const valid=ajv.validate(schema,user)
        if(!valid)
        {
            return res.status(400).json({
                
                code: "dtoInIsNotValid",
                category: "dtoIn is not valid",
                validationError: ajv.errors,

            });
        }
        const loginUser=await usersDao.login(user)
        res.json(loginUser)



    }
    catch(e)
    {
        
        res.status(500).json({ error: e.message || "Nastala chyba." });
    }
}


module.exports=Login;