import { Model, Schema, model } from "mongoose";

interface IConversation {
  authors: [string, string];
  messages: IMessage[];
}

interface IMessage {
  author: string;
  message: string;
  time: string;
}

const conversationSchema = new Schema<IConversation>({
  authors: [],
  messages: [],
});

export const Conversation = model<IConversation>("Conversation", conversationSchema);
