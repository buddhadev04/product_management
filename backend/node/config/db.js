const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect('mongodb+srv://monosworld0:Mono@1234@cluster0.okokb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('mongodb successfully connected');
    }
    catch (error){
        console.log(error);
    }
    
}

module.exports = connectDB;