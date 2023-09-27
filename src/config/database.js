const mongoose = require('mongoose');
const config = require('.');

mongoose.connection.once('open', () => console.log('Connected to Database Server'));

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err.message);
    process.exit(1);
});

async function connectDatabase() {
    try {
        const URL = config.MONGODB_URL || 'mongodb://127.0.0.1:27017/weblify_database';
        await mongoose.connect(
            URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;