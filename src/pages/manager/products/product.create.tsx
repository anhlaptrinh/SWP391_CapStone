import {
  Button,
  Form,
  Input,
  Modal,
  message,
  Upload,
  UploadFile,
  UploadProps,
  Select,
  TreeSelect,
} from "antd";
import { useState } from "react";
import {
  beforeUpload,
  fakeUpload,
  normFile,
  // uploadFileToFirebase,
} from "@/utils/file";
export type ProductCreateFormProps = {
  formData?: any;
  onClose: () => void;
};
export function FormProduct({ formData, onClose }: ProductCreateFormProps) {
  const [form] = Form.useForm();
  //   const { mutateAsync: createMutate } = useCreateProduct();
  //   const { mutateAsync: updateMutate } = useUpdateProduct(productId);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [gender, setGender] = useState<any>([
  //   { value: "male", label: "Male" },
  //   { value: "female", label: "Female" },
  //   { value: "other", label: "Other" },
  // ]);
  const submitHandle = async () => {
    setLoading(true);
    // const values = await form.validateFields();
    try {
      if (formData) {
        // const updateData: UserPayload = {
        //   ...formData,
        //   id: formData.id,
        // };
        // if (values.image.imageUrl) {
        //   const updateImageUrl: string = await uploadFileToFirebase(
        //     values?.image?.imageUrl[0]
        //   );
        //   console.log(updateImageUrl);
        //   setLoading(false);
        // }
        // updateData.name = values.name;
        // updateData.phone = values.phone;
        // updateMutate(updateData);
        setLoading(false);
      } else {
        // const createData: UserPayload = { ...values };
        // createMutate(createData);
        setLoading(false);
      }
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };
  const onImageChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };
  const onChange = (_value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Modal
      title={formData?.id ? "Edit Product" : "Create Product"}
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
          label="Name"
          name="name"
          required
          rules={[{ required: true, message: "Please input name" }]}
        >
          <Input />
        </Form.Item>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Form.Item
            label="Category"
            name="category"
            required
            rules={[{ required: true, message: "Please input category" }]}
          >
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={[
                { value: "bracelet", label: "Bracelet" },
                { value: "ring", label: "Ring" },
                { value: "chain", label: "Chain" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            required
            rules={[{ required: true, message: "Please input gender" }]}
          >
            <Select
              showSearch
              placeholder="Select a gender"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Material"
            name="material"
            required
            rules={[{ required: true, message: "Please input material" }]}
          >
            <TreeSelect
              onChange={onChange}
              treeData={[
                {
                  title: "Gold",
                  value: "gold",
                  children: [
                    {
                      title: "Gold - 24k",
                      value: "24k",
                    },
                    {
                      title: "Gold - 18k",
                      value: "18k",
                    },
                  ],
                },
                {
                  title: "silver",
                  value: "Silver",
                },
              ]}
              placeholder="Select a material"
              treeDefaultExpandAll
            />
          </Form.Item>
          <Form.Item
            label="Gem"
            name="gem"
            required
            rules={[{ required: true, message: "Please input gem" }]}
          >
            <Select
              showSearch
              placeholder="Select a gem"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={[
                { value: "diamond", label: "Diamond" },
                { value: "emerald", label: "Emerald" },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Package Images"
          name="avatarUrl"
          getValueFromEvent={normFile}
        >
          <Upload
            name="image"
            maxCount={4}
            className="UploadImage"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            customRequest={fakeUpload}
            onChange={onImageChange}
          >
            {fileList.length < 4 && "+ Upload"}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
