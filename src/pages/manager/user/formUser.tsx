import { useListRole } from "@/api/manager/products";
import { UserPayload, useCreateUser, useUpdateUser } from "@/api/manager/user";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { useState } from "react";

export type UserCreateFormProps = {
  formData?: any;
  onClose: () => void;
};
export function FormUser({ formData, onClose }: UserCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreateUser();
  const { mutateAsync: updateMutate } = useUpdateUser();
  const { data: dataRole } = useListRole();
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandle = async () => {
    const values = await form.validateFields();
    try {
      setLoading(true);
      if (formData) {
        const updateData: UserPayload = {
          ...formData,
          userId: formData.userId,
        };
        await updateMutate(updateData);
        setLoading(false);
      } else {
        const createData: UserPayload = { ...values };
        await createMutate(createData);
        setLoading(false);
      }
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };
    const onChange = (_value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const prepareSelectOptions = (
    data: any[],
    idField: string,
    nameField: string
  ) => {
    if (!data) return [];
    return data.map((item) => ({
      value: item[idField],
      label: item[nameField],
    }));
  };


  return (
    <Modal
      title={formData?.id ? "Edit User" : "Create User"}
      open
      onOk={submitHandle}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={submitHandle}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        initialValues={formData}
        form={form}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 18 }}
        layout="vertical"
      >
        <Form.Item
          label="User Name"
          name="userName"
          required
          rules={[{ required: true, message: "Please input userName" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="fullName"
          required
          rules={[{ required: true, message: "Please input fullName" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          required
          rules={[
            { required: true, message: "Please input phoneNumber" },
            {
              pattern: /^[0-9]{10}$/,
              message:
                "The input is not a valid phone number (must be 10 digits)",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          required
          rules={[
            { required: true, message: "Please input email" },
            { type: "email", message: "The input is not a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          required
          rules={[{ required: true, message: "Please input password" }]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          required
          rules={[{ required: true, message: "Please input address" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="roleId"
          required
          rules={[{ required: true, message: "Please input role" }]}
        >
          <Select
            showSearch
            placeholder="Select a role"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            options={prepareSelectOptions(dataRole, "roleId", "roleName")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
