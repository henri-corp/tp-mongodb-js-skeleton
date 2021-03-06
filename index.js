const { exit } = require('process');
const { MongoClient } = require("mongodb");
const colors = require('colors');
require('dotenv').config();

(async () => {
    const client = new MongoClient(process.env.MONGO_URI);
  
    try {
        await client.connect();
        console.log(`👑 MongoDB connected`.green);

        const database = client.db(process.env.MONGO_DB);

        const cmd = process.argv.slice(2)[0];
        let exercice=null;
        try{
            exercice = require(`./exercices/${cmd}.js`);
            console.log(`🦊 Exercice ${cmd} found`.green);
    
        }catch(error){
            console.error(`😭 Cannot find ${cmd}.js in exercices or ${cmd} contains errors`.white.bgRed.bold);
            console.debug(error);
            exit(100)    
        }
        console.log(`🍣 Starting ${cmd}`.green);
        try{
            await exercice(database);
        }catch(error){
            console.log(`😱 An error occured`.red.bold);
            console.log(error);
        }
    }
    catch(error){
        console.error(`😱 Something went wrong`.white.bgRed.bold);
        console.error(error);
    


    } finally {
        console.log(`👋 Closing MongoDB`.gray);
        await client.close();
        exit(0);
    }
      
    
})();
