const port = process.env.PORT || 3000
module.exports = {
    swaggerDefinition : {
        swagger: "2.0",
        info: {
            "title" : "API de ejemplo",
            "description" : "api de ejemplo epicness",
            "version": "1.0.0",
            "servers": ["http://localhost:" + port]
        }
    },
    apis: ['src/rutas/*.js']
}