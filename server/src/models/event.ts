import { Document, model, Schema } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  price: number;
  date: string;
  creator: Schema.Types.ObjectId;
}

const name = "Event";
const schema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true
  },
  description: {
    type: Schema.Types.String,
    required: true
  },
  price: {
    type: Schema.Types.Number,
    required: true
  },
  date: {
    type: Schema.Types.Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

export default model<IEvent>(name, schema);
