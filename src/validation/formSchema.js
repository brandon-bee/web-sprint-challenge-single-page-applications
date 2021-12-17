import * as yup from 'yup';

const formSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, 'name must be at least 2 characters'),
  size: yup
    .string()
    .oneOf(['Small', 'Medium', 'Large', 'Extra Large', 'Extra EXTRA Large', 'Gargantuan'], 'Pizza size is required'),
  pepperoni: yup.boolean(),
  sausage: yup.boolean(),
  bacon: yup.boolean(),
  anchovies: yup.boolean(),
  special: yup
    .string()
    .trim()
  
})

export default formSchema;