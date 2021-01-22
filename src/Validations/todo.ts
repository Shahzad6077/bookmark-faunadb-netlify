import * as yup from "yup"

const crudSchema = yup.object().shape({
  title: yup.string().required("Title is required."),
  link: yup.string().required("Link name is required."),
})
export default crudSchema
