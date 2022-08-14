import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const schema = new Schema({
  owner: {type: Types.ObjectId, ref: 'User'},
  text: {type: String},
  completed: false,
  important: false
})

export default model('Todo', schema)