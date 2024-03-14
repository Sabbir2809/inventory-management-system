import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const IInput = ({ type, name, label, disabled, rows, required = false, addonBefore }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label} required={required}>
            {type === "textarea" ? (
              <Input.TextArea {...field} id={name} disabled={disabled} rows={rows} />
            ) : addonBefore ? (
              <Input {...field} addonBefore={addonBefore} id={name} disabled={disabled} size="large" />
            ) : (
              <Input {...field} type={type} id={name} disabled={disabled} size="large" />
            )}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default IInput;
