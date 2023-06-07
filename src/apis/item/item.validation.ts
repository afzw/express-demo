import Joi from 'joi'

const ItemValidation = {
  createItem: {
    body: Joi.object({
      name: Joi.string().required().messages({ 'any.only': 'sadfasd' })
    })
  }
}

export default ItemValidation
