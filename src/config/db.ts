const dbUrl = (): string => `${process.env.MONGO_URL}`;
const options = () => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME
    }
}

export {
    dbUrl,
    options
}