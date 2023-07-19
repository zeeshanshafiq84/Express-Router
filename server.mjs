import express from 'express';
import cors from 'cors';  
import path from 'path';
const __dirname = path.resolve()

const app = express()
app.use(cors())

app.get('/profile',(req, res) =>{
  console.log('this is profile!', new Date());
  res.send('this is profile' + new Date());
})

app.get('weather/:cityName', (req, res) => {
  console.log('this is profile!', new Date());

  console.log("req.params.cityName: ", req.params.cityName);


    

})

app.use('/', express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})  
