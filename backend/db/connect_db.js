import mongoose from 'mongoose';
import 'dotenv/config';

const uri = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;

const connect_DB = async () => {
    try {
        const connectionInstance = await mongoose.connect(uri);
        console.log(`DB connected successfully.`);
    } catch (error) {
        console.log('Error in db Connection => ', error.message);
        process.exit(1);
    }
};

export default connect_DB;
