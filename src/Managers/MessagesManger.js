import mongoose from 'mongoose'
import { schemaMessages } from '../models/messages.js';


export class MesaggesMongoose {
  #messagesDb;
  constructor() {
    this.#messagesDb = mongoose.model("messages", schemaMessages);
  }

  async saveMsg(messa) {
    const msgsave = await this.#messagesDb.create(messa);
    return msgsave;
  }

  async findMsg() {
    const msgDisp = await this.#messagesDb.find().lean();
    return msgDisp;
  }

  async reset() {
    this.#messagesDb.deleteMany();
  }
}
export const mensajesManager = new MesaggesMongoose()