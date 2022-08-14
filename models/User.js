import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const schema = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  links: [{ type: Types.ObjectId, ref: 'Link' }],
  todos: [{ type: Types.ObjectId, ref: 'Todo' }]
})

export default model('User', schema)