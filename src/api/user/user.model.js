import mongoose, {Schema} from 'mongoose'

const UserSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
  },
  {
    timestamps: true,
  },
)

UserSchema.methods = {}

UserSchema.statics = {

export default mongoose.model('User', UserSchema)
