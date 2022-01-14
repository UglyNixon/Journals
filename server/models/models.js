const sequelize =require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define( 'user',{
id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
login:{type:DataTypes.STRING,unique:true,allowNull:false},
password:{type:DataTypes.STRING,allowNull:false},
role:{type:DataTypes.STRING,defaultValue:'USER'},
isActivated: {type:DataTypes.BOOLEAN,defaultValue:false},
activationLink:{type:DataTypes.STRING},
code:{type:DataTypes.STRING,unique:true}
},{timestamps: false,})

const TokenSchema = sequelize.define('token',{
id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
refreshToken:{type:DataTypes.STRING,allowNull:false},
},{timestamps: false,})


const Make = sequelize.define( 'make',{
id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
},{timestamps: false,})

const Ruchka = sequelize.define('ruchka',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    series:{type:DataTypes.INTEGER,unique:true,allowNull:false},
    dateStart:{type:DataTypes.STRING,defaultValue:''},
    totalValue:{type:DataTypes.INTEGER,unique:false,allowNull:false},
    dolg:{type:DataTypes.INTEGER,defaultValue:0},
    status:{type:DataTypes.BOOLEAN,defaultValue:false},
    date:{type:DataTypes.STRING},
    brak:{type:DataTypes.INTEGER,defaultValue:0},
    brakInfo:{type:DataTypes.JSONB},
    docum:{type:DataTypes.STRING}
},{
    timestamps: false,
})

const RuchkaFS = sequelize.define('ruchkaFS',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    series:{type:DataTypes.INTEGER,unique:true,allowNull:false},
    date:{type:DataTypes.STRING},
    materials:{type:DataTypes.STRING},
    totalValue:{type:DataTypes.INTEGER,unique:false,allowNull:false},
    docum:{type:DataTypes.STRING}
},{
    timestamps: false,
})

const Notice = sequelize.define('notice',{
    
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        series:{type:DataTypes.STRING,allowNull:false},
        docum:{type:DataTypes.STRING},
        date:{type:DataTypes.STRING},
        totalValue:{type:DataTypes.INTEGER,unique:false,allowNull:false},
    },{
        timestamps: false,
    }
)

const RuchaFSNotice = sequelize.define('ruchkafsnotice',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true}
},{
        timestamps: false,
    },{
        timestamps: false,
    })
const RuchaRuchkaFS = sequelize.define('ruchkaruchkafs',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true}
},{
    timestamps: false,
})
const Journal = sequelize.define('journal',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
    formLink:{type:DataTypes.STRING},
    reportLink:{type:DataTypes.STRING},
    

},{
    timestamps: false,
})
User.hasOne(TokenSchema)
TokenSchema.belongsTo(User)

User.hasOne(Make)
Make.belongsTo(User)

Ruchka.belongsToMany(RuchkaFS,{through:RuchaRuchkaFS})
RuchkaFS.belongsToMany(Ruchka,{through:RuchaRuchkaFS})


Make.hasMany(RuchkaFS)
RuchkaFS.belongsTo(Make)

Make.hasMany(Ruchka)
Ruchka.belongsTo(Make)

Notice.belongsToMany(RuchkaFS,{through:RuchaFSNotice})
RuchkaFS.belongsToMany(Notice,{through:RuchaFSNotice})

module.exports ={
    User,
    Make,
    Ruchka,
    RuchkaFS,
    RuchaFSNotice,
    RuchaRuchkaFS,
    TokenSchema
}