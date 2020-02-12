import { Document, model, Schema } from "mongoose";

export interface IBooking extends Document {
  event: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

const name = "Booking";
const schema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

export default model<IBooking>(name, schema);
