import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const IInput = ({ type, name, label, disabled, rows }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            {type === "textarea" ? (
              <Input.TextArea {...field} id={name} disabled={disabled} rows={rows} />
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
