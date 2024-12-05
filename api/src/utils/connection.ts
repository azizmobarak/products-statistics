import mongoose from 'mongoose';
const connectionString = process.env.MONGO_UR || 'mongodb://localhost:27017/products-statistics'

export const connection = async ()=> {
    await mongoose.connect(connectionString,{}).then(v=>{
        if(v) console.log('connected to : ',v.connections[0].name)
    })
.catch(error=>{
    console.log('could not connect to mongoDB due: ',error)
})
}