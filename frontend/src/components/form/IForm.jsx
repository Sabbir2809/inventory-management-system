import { Form } from "antd";
import { FormProvider, useForm } from "react-hook-form";

const IForm = ({ onSubmit, children, defaultValues, resolver }) => {
  // form default value set
  const formConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);

  const submit = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form onFinish={methods.handleSubmit(submit)} layout="vertical">
        {children}
      </Form>
    </FormProvider>
  );
};
export default IForm;
