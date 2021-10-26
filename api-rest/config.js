module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || "mongodb+srv://admin:admin@cluster0.kxsmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    SECRET_TOKEN: 'miclavedetokens'

    
}