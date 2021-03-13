import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from './IUser';
import bcrypt from 'bcrypt';
import { Constants } from '../utils/Constants';

export interface IUserModel extends IUser, Document {
    fullName(): string;
    isValidPassword(password: string): Promise<boolean>;
};

export let UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: "default.png"
        },
        role: {
            type: String,
            required: true,
            default: Constants.ROLE_NORMAL
        }
    },
    {
        timestamps: true
    }
);

UserSchema.pre('save', async function (this: any, next) {
    const hash = await bcrypt.hash(
        this.password,
        +process.env.APP_SECRET_SALT_OR_ROUNDS_COUNT!
    );
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
    const user: any = this;
    const compare: boolean = await bcrypt.compare(password, user.password);
    return compare;
}

UserSchema.methods.fullName = function (): string {
    const user: any = this;
    return (user.name.trim() + " " + user.lastname.trim());
};

// //Hide password
UserSchema.methods.toJSON = function () {
    const obj: any = this.toObject();
    delete obj.password;
    return obj;
}

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);