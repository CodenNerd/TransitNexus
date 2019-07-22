import mongoose from 'mongoose';

const UsersSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  status: String,
  cv: String
});

const UsersModel = mongoose.model('Users', UsersSchema);
export default UsersModel;