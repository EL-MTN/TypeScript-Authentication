import { config } from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';

config();

// Connect to Mongoose
if (process.env.MONGO_URI) {
	mongoose.connect(process.env.MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	});
}

// Starting application
// TODO: CHANGE LOGGING DOMAIN
app.listen(process.env.PORT, () => {
	console.log(`Server up and running on http://localhost:${process.env.PORT}`);
});
