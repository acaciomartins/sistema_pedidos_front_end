//Importa as dependências que acabamos de instalar
const express = require('express');
const path = require('path');
const multer = require('multer')

const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../api/src/assets/produtos/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var cors = require('cors');
app.use(cors());

// const upload = multer({ dest: 'produtos/uploads/' })
const upload = multer({ storage });

// Serve os arquivos estáticos da pasta dist (gerada pelo ng build)
app.use(express.static(__dirname + '/dist/api'));

// Rota para upload
app.post('/file/upload', upload.single('file'),
    (req, res) => {
        console.log('[server.js] /file/upload: ');
        // res.send('<h2>Upload realizado com sucesso</h2>')
        return res.status(200).end();
    }
);

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/api/index.html'));
});


// Inicia a aplicação pela porta configurada
console.log('Porta: ', process.env.PORT || 8080)
app.listen(process.env.PORT || 8080);
