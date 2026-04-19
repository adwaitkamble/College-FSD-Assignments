import mongoose from 'mongoose';

const uri = 'mongodb://Atharva-G38-ai%26ml:Atharva2715@ac-f0m2j46-shard-00-00.btiisfy.mongodb.net:27017,ac-f0m2j46-shard-00-01.btiisfy.mongodb.net:27017,ac-f0m2j46-shard-00-02.btiisfy.mongodb.net:27017/?ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Assignment5FSD';

mongoose.connect(uri)
  .then(() => {
    console.log('Connected directly using replica set!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to connect:', err.message);
    process.exit(1);
  });
