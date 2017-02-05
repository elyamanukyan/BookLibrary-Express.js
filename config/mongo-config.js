let conf = require('./config.js')
// console.log(conf)
module.exports = (mongoose) => {
    mongoose.Promise = global.Promise; //console log areci conf jokeci :D
    mongoose.connect(conf.db, (err, res) => { //choreles...dra hamarel tenca haaa
        if (err) {
            console.log(`ERROR connecting to : mongodb://localhost:27017/martakan_dev`)
        } else {
            console.log('Successfully connected to mongodb')
        }
    })
}