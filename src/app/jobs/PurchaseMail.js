const Mail = require('./../services/Mail')

class PurchaseMail {
    get key() {
        return 'PurchaseMail'
    }

    async handle(job, done) {

        const { ad, user, content } = job.data

        setTimeout(async () => {
            await Mail.sendMail({
                from: '"Cleyton Gama" <cleytongama@gmail.com>',
                to: ad.author.email,
                subject: `Solicitação de compra: ${ad.title}`,
                template: 'purchase',
                context: { user, content, ad: ad }
            })

            return done()
        }, 10000)

    }
}
module.exports = new PurchaseMail()
