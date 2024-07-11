import { useUpdateStatus } from "@/api/manager/products";
import { useListCounters, useUpdateCounters } from "@/api/manager/user";
import {
  Button,
  Form,
  Modal,
  message,
  Select,
} from "antd";
import { useState } from "react";

export type GemCreateFormProps = {
  formData?: any;
  onClose: () => void;
};

export function Status({ formData, onClose }: GemCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: updateMutate } = useUpdateCounters();
  const { data: dataCounters } = useListCounters();
  const { mutateAsync: updateStatusMutate } = useUpdateStatus({
    name: formData.name,
    list: formData.list,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const submitHandle = async () => {
    try {
      setLoading(true);
        await updateStatusMutate(formData.id);
        setLoading(false);
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };

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
  const onChange = (_value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Modal
      title="Assign to counter"
      open
      onOk={submitHandle}
      onCancel={onClose}
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
      <Form initialValues={formData} form={form} layout="vertical">
        <Form.Item
          label="Counter"
          name="counterId"
          required
          rules={[{ required: true, message: "Please assign to counter" }]}
        >
          <Select
            showSearch
            placeholder="Select a counter"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            options={prepareSelectOptions(
              dataCounters,
              "counterId",
              "counterName"
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
