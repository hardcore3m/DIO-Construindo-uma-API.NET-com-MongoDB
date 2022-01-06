const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

var logdate = new Date()
console.log(logdate);

MongoClient.connect('mongodb+srv://hardcore3m:401715@cluster0.cpxms.mongodb.net/deetwee?retryWrites=true&w=majority', (err, database) => {
  if (err) return console.log(err)
  db = database.db('deetwee-databases')
  app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor online na porta 3002\n\n')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static('public'))



app.get('/frameworks', (req, res) => {

  db.collection('frameworks').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('frameworks.ejs', {
      frameworks: result
    })
  })
  console.log(` ${logdate} - Acessando /frameworks`);
})

app.get('/frameworks/update', (req, res) => {
  res.render('sucess.ejs', {
    action: 'atualizado'
  })
})
app.get('/frameworks/erase', (req, res) => {
  res.render('sucess.ejs', {
    action: 'apagado'
  })
})

app.get('/api/frameworks', (req, res) => {

  db.collection('frameworks').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result)
  })
  console.log(` ${logdate} - Acessando api/frameworks`);
})

app.post('/frameworks', (req, res) => {
  db.collection('frameworks').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log(` ${logdate} - Objeto "${req.body.name}" inserido com sucesso`);
    res.redirect('/frameworks')
  })
})

app.post('/frameworks/update', (req, res) => {


  db.collection('frameworks')
    .updateOne({
      id: req.body.id
    }, {
      $set: {
        name: req.body.name,
        categories: req.body.categories,
        documentation: req.body.documentation
      }
    }, {
      sort: {
        id: -1
      },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)

    })
  console.log(` ${logdate} - Objeto "${req.body.name}" alterado com sucesso`);
  res.redirect('/frameworks/update')
})

app.post('/frameworks/erase', (req, res) => {
  db.collection('frameworks').deleteOne({
    id: req.body.id
  }, (erro, resultado) => {
    if (erro) throw erro
    console.log(` ${logdate} - Objeto "${req.body.name}" apagado com sucesso`);
  })
  res.redirect('/frameworks/erase')
})