module.exports = {
    development: {
        port: 3000,
        db: "mongodb://localhost:27017/martakan_dev",
        jwtSecret: "devJwtSecret",
        jwtSession: {
            "session": false
        },

    },
    production: {
        port: 4000,
        db: "mongodb://localhost:27017/martakan_prod", //_prod :/// stex tarbera..bayc uma petq ete ches ogtagorcum...ushadir...tesar ? haa ..himav uoshnai...ushadir
        jwtSecret: "prodJwtSecret",
        jwtSession: {
            "session": false
        },
    }
}