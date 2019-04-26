const Joi = require('joi')

module.exports = {
    body: {
        ad: Joi.string().required().error(errors => {
            return {
                message: "É obrigatório informar o id do anúncio"
            };
        }),
        content: Joi.string().required()
    }
}