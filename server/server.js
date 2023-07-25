const app=require('./app');
require('dotenv').config();
const cors=require('cors');

const PORT=process.env.PORT || 5005;



app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})