import mongoose, {Schema} from 'mongoose'

const ItemSchema = new Schema(
  {
  	title: {type: String, required: true},
  },
  {
    timestamps: true,
  },
)

ItemSchema.methods = {}

ItemSchema.statics = {}

export default mongoose.model('Item', ItemSchema)
