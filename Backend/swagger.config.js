const port = process.env.PORT || 3000
module.exports = {
    swaggerDefinition : {
        swagger: "2.0",
        info: {
            "title" : "Diseño API, Slack",
            "description" : "Documentación rutas API del proyecto, aplicación tipo slack",
            "version": "1.0.0",
            "servers": ["http://localhost:" + port]
        }
    },
    apis: ['src/routes/*.js']
}