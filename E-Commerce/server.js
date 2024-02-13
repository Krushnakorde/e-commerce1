
import app from "./index.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import { connectUsingMongoose } from "./src/config/mongoose.confing.js";


const port = 300;

app.listen(port,()=>{
    console.log("server is ported on "+ port);
    //  connectToMongoDB();
    connectUsingMongoose(); 
    
})
