import mongoose, { Schema } from 'mongoose'
import mongoosePagine from 'mongoose-paginate-v2'

export const schemaCarts = new mongoose.Schema({
    id:{type:String, required:true},
    nombreProducts: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'product'
                },
                quantity: {
                  type: Number,
                  required: true,
                  default:0
                }
            }
        ],
        default: [], 
    },
},{versionKey:false})


/*schemaCarts.pre(/^find/, function (next) {
    this.populate("nombreProducts.product");
    next();
  });
  */

schemaCarts.plugin(mongoosePagine)
export const cartModel = mongoose.model('carts',schemaCarts)
