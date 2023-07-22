import Joi from 'joi'

const ItemValidation = {
  createItem: {
    body: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required()
    })
  }
}

export default ItemValidation
