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

/**
 * Methods
 */
UserSchema.methods = {}

export default mongoose.model('User', UserSchema)
