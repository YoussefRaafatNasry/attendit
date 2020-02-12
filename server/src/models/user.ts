import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  createdEvents: Schema.Types.ObjectId[];
}

const name = "User";
const schema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
});

export default model<IUser>(name, schema);
