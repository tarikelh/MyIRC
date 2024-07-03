import { mongoose } from "../lib";

const connectDB = async () => {
    const uri : string = process.env.MONGODB_URI!;

    try {
        const connection = await mongoose.connect(uri);
        console.log('MongoDB connected:', connection.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

connectDB();