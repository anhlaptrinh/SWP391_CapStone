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
} from "antd";
import { useState } from "react";
import {
  beforeUpload,
  fakeUpload,
  normFile,
  uploadFileToFirebase,
  // uploadFileToFirebase,
} from "@/utils/file";
import { useListGem } from "@/api/manager/gem";
import { useListMaterial } from "@/api/manager/material";
import { useCreateProduct, useListCategory, useListColour, useListGender, useListProducttype, useUpdateProduct } from "@/api/manager/products";
export type ProductCreateFormProps = {
  formData?: any;
  onClose: () => void;
};
export function FormProduct({ formData, onClose }: ProductCreateFormProps) {
  const [form] = Form.useForm();
    const { mutateAsync: createMutate } = useCreateProduct();
    const { mutateAsync: updateMutate } = useUpdateProduct();
  const { data: dataProducttype } = useListProducttype();
  const { data: dataColour } = useListColour();
  const { data: dataGender } = useListGender();
  const { data: dataGem } = useListGem();
  const { data: dataMaterial } = useListMaterial();
  const { data: dataCategory } = useListCategory();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
    if (dataProducttype?.length > 0) {
      for (let i = 0; i < dataProducttype.length; i++) {
        dataProducttype[i].value = dataProducttype[i].id;
        dataProducttype[i].label = dataProducttype[i].name;
      }
    }
    if (dataCategory?.length > 0) {
      for (let i = 0; i < dataCategory.length; i++) {
        dataCategory[i].value = dataCategory[i].categoryId;
        dataCategory[i].label = dataCategory[i].categoryName;
      }
    }
    if (dataColour?.length > 0) {
      for (let i = 0; i < dataColour.length; i++) {
        dataColour[i].value = dataColour[i].colourId;
        dataColour[i].label = dataColour[i].colourName;
      }
    }
    if (dataGender?.length > 0) {
      for (let i = 0; i < dataGender.length; i++) {
        dataGender[i].value = dataGender[i].genderId;
        dataGender[i].label = dataGender[i].genderName
      }
    }
    if (dataGem?.items.length > 0) {
      for (let i = 0; i < dataGem?.items.length; i++) {
        dataGem.items[i].value = dataGem?.items[i].gemId;
        dataGem.items[i].label = dataGem?.items[i].gemName;
      }
    }
    if (dataMaterial?.items.length > 0) {
      for (let i = 0; i < dataMaterial?.items.length; i++) {
        dataMaterial.items[i].value = dataMaterial?.items[i].materialId;
        dataMaterial.items[i].label = dataMaterial?.items[i].materialName;
      }
    }
  const submitHandle = async () => {
    const values = await form.validateFields();
    try {
      setLoading(true);
      if (formData) {
        const updateData: any = {
          ...formData,
          id: formData.id,
        };
        if (values.featuredImage) {
          const updateImageUrl: string = await uploadFileToFirebase(
            values?.featuredImage[0]
          );
          updateData.featuredImage = updateImageUrl;
        }
        updateMutate(updateData);
        setLoading(false);
      } else {
        const updateImageUrl: string = await uploadFileToFirebase(
          values?.featuredImage[0]
        );
        const createData: any = {
          ...values,
          colourId:4,
          featuredImage: updateImageUrl,
        };
        createMutate(createData);
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
          label="Product Name"
          name="productName"
          required
          rules={[{ required: true, message: "Please input product Name" }]}
        >
          <Input />
        </Form.Item>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Form.Item
            label="product types"
            name="productTypeId"
            required
            rules={[{ required: true, message: "Please input producttypes" }]}
          >
            <Select
              showSearch
              placeholder="Select a producttypes"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={dataProducttype}
            />
          </Form.Item>
          <Form.Item
            label="data Colour"
            name="colourId"
            required
            rules={[{ required: true, message: "Please input Colour" }]}
          >
            <Select
              showSearch
              placeholder="Select a Colour"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={dataColour}
            />
          </Form.Item>
          <Form.Item
            label="Percent Price Rate"
            name="percentPriceRate"
            required
            rules={[
              { required: true, message: "Please input Percent Price Rate" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Production Cost"
            name="productionCost"
            required
            rules={[
              {
                required: true,
                message: "Please input Production Cost",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="categoryId"
            required
            rules={[{ required: true, message: "Please input category" }]}
          >
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={dataCategory || []}
            />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="genderId"
            required
            rules={[{ required: true, message: "Please input gender" }]}
          >
            <Select
              showSearch
              placeholder="Select a gender"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={dataGender}
            />
          </Form.Item>
          <Form.Item
            label="Material"
            name="materials"
            required
            rules={[{ required: true, message: "Please input material" }]}
          >
            <Select
              mode="multiple"
              showSearch
              placeholder="Select a gem"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={dataMaterial?.items}
            />
          </Form.Item>
          <Form.Item
            label="Gem"
            name="gems"
            required
            rules={[{ required: true, message: "Please input gem" }]}
          >
            <Select
              mode="multiple"
              showSearch
              placeholder="Select a gem"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={dataGem?.items}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Package Images"
          name="featuredImage"
          getValueFromEvent={normFile}
        >
          <Upload
            name="featuredImage"
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
