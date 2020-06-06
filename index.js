/*Este es nuestro servidor*/
/*npm start - iniciar servidor*/

const mongoose = require('mongoose');   /*cargamos libreria mongoose de node_modules*/
const app = require('./app');           /*cargamos app.js a nuestro servidor*/
const port = process.env.PORT || 3977;  /*configuramos un puerto (3977) para nuestro servidor*/
const MONGODB_URI = 'mongodb://localhost:27017/spotifyApp';



/*conectarservidor*/
mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    },(err,res) => {
    
    if(err){
        throw err;
    }else{
        console.log('la BaseDeDatos Funciona Perfectamente Sr. Daniel')
    }

    /*ponemos a nuestro servidor a escuchar*/
    app.listen(port, () =>{
        console.log('servidor escuchando en http://localhost:'+port);
    });

});

