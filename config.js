require('dotenv').config({path: 'variables.env'});
module.exports = {
    //LEER LOCAL HOST DE VARIABLES DE ENTORNO
    port: process.env.PORT || 3500,
    host: process.env.HOST || '0.0.0.0',
    db: process.env.MONGODB ||  process.env.DB_URL,
    urlParser: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex:true
    }
}