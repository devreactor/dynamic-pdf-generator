const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const path = require('path');

const pdfTemplate = require(`./pdf`);

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.post('/api/createpdf', (req,res) => {
  pdf.create(pdfTemplate(), {}).toFile('result.pdf', err => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

app.get('/api/downloadpdf', (req,res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(`${__dirname}/build/index.html`));
});

app.listen(port,() => console.log(`Listening on port ${port}`));
