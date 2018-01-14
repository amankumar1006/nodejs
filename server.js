const express=require('express');
const hbs = require('hbs');
const fs= require('fs');
const port=process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partial')
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
})
app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
  var now= new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n');
next();
});
app.use((req,res,next)=>{
res.render('maintenance.hbs');
})

app.get('/',(req,res)=>{
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    currentYear: new Date().getFullYear()
  });
  // res.send({
  //   name: 'Abhishek',
  //   likes: ['cricket',
  //     'movies']
  // })
});

app.get('/about',(req,res)=>{
  // res.send('About page');
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/home',(req,res)=>{
  // res.send('About page');
  res.render('about.hbs',{
    pageTitle:'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  })
});

app.listen(3000,()=>{
  console.log(`Server is up  on port ${port}`);
});
