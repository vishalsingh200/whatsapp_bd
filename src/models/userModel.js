import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please provide your name"],
    },
    email: {
        type: String,
        required: [true,"Please provide your email address"] , 
        unique: [true,"This email is already in use"],
        lowercase: true,
        Validate: [validator.isEmail,'Please provide a valid Email Address']
    },
    picture: {
        type: String,
        default: 
        'https://www.google.com/imgres?imgurl=https%3A%2F%2Ficon-library.com%2Fimages%2Fdefault-user-icon%2Fdefault-user-icon-13.jpg&tbnid=Byk67KLcb9rxwM&vet=12ahUKEwi6g8TM4bWEAxVicmwGHQnTClEQMygeegUIARC-AQ..i&imgrefurl=https%3A%2F%2Ficon-library.com%2Ficon%2Fdefault-user-icon-13.html&docid=hjB_xDCH9b89zM&w=400&h=400&q=default%20user%20image&ved=2ahUKEwi6g8TM4bWEAxVicmwGHQnTClEQMygeegUIARC-AQ',
    },
    status: {
        type: String,
        default: "Hey there ! I am using whatsapp",
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [6, "Please make sure that your password is atleast 6 character long"],
        maxLength: [128, "Please make sure that your password is not more than 128 character long"],

    }
}, {
    collection: "users",
    timestamps: true,
   }
);

userSchema.pre('save', async function(next){
    try{
        if(this.isNew){
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        }
        next();
    }
    catch(error){
        next(error);
    }
})

const UserModel = mongoose.models.UserModel || mongoose.model('UserModel',userSchema);

export default UserModel;