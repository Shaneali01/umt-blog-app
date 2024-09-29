const express=require('express');
const cloudinary = require('cloudinary').v2;
const cookieparser=require('cookie-parser')

const app=express();
const registerroute=require('./Routes/userroute');
const blogroute=require('./Routes/blogroute')
const mongoose=require('mongoose')
const fileupload=require('express-fileupload')
const cors=require('cors')
dotenv=require('dotenv')
dotenv.config();

const port=process.env.PORT
const MONGO_URI=process.env.MONGO_URI;
console.log(MONGO_URI)
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:process.env.FRONTEND_URL, // Update this to your frontend URL
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Add methods as needed
}));
  app.use(express.urlencoded({extended:false}))
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

mongoose.connect(MONGO_URI)
.then(()=>console.log("SUCCESSFULLY CONNECTED WITH DATABASE"))
.catch((err)=>console.log(err,'NOT CONNECTED WITH DATABASE'))
app.get('/ping', (req, res) => {
    res.status(200).send('Server is alive');
  });
app.use('/api/users',registerroute);
app.use('/blog',blogroute)

app.listen(port,()=>{
    console.log('SERVER STARTED');
})
