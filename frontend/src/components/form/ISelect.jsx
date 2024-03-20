import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

const ISelect = ({ label, name, options, disabled, mode, placeholder, required = false }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} required={required}>
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
