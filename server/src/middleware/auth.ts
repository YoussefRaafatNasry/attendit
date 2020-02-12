import * as jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server";
import { Schema } from "mongoose";

export interface AuthMetaData {
  userId: string;
}

export const authenticate = (authHeader: string): AuthMetaData | null => {
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  try {
    const meta = jwt.verify(token, process.env.PRIVATE_KEY!) as AuthMetaData;
    return meta;
  } catch (e) {
    throw new ApolloError("Invalid authentication token.");
  }
};
