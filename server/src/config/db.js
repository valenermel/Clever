import mongoose from 'mongoose'

export const connectdb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cleverdb');
        console.log("Connected to database");
        
    }
    catch(error){
        console.log(error);
    }
    
}
