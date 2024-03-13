import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

const ISelect = ({ label, name, options, disabled, mode, placeholder }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            style={{ width: "100%" }}
            options={options}
            disabled={disabled}
            mode={mode}
            size="large"
            placeholder={placeholder}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};
export default ISelect;
