import React, { useEffect, useState } from "react";
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
import {
  beforeUpload,
  fakeUpload,
  normFile,
  uploadFileToFirebase,
} from "@/utils/file";
import { useListGem } from "@/api/manager/gem";
import { useListMaterial } from "@/api/manager/material";
import {
  useCreateProduct,
  useListCategory,
  useListColour,
  useListCounter,
  useListGender,
  useListProducttype,
  useUpdateProduct,
} from "@/api/manager/products";

type ProductCreateFormProps = {
  formData?: any;
  onClose: () => void;
};

export function FormProduct({ formData, onClose }: ProductCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreateProduct();
  const { mutateAsync: updateMutate } = useUpdateProduct();
  const { data: dataProducttype } = useListProducttype();
  const { data: dataCounter } = useListCounter();
  // const { data: dataColour } = useListColour();
  const { data: dataGender } = useListGender();
  const { data: dataGem } = useListGem();
  const { data: dataMaterial } = useListMaterial();
  const { data: dataCategory } = useListCategory();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (formData?.featuredImage) {
      const initialFileList = [
        {
          uid: "-1",
          name: "featuredImage.jpg",
          status: "done",
          url: formData.featuredImage,
        },
      ];
      setFileList(initialFileList);
    }
  }, [formData]);

  useEffect(() => {
    if (
      formData &&
      dataProducttype &&
      // dataColour &&
      dataGender &&
      dataCategory
    ) {
      form.setFieldsValue({
        ...formData,
        productTypeId: dataProducttype.find(
          (g) => g.name === formData?.productType
        ).id,
        // colourId: dataColour.find((g) => g.colourName === formData?.colour)
        //   .colourId,
        genderId: dataGender.find((g) => g.genderName === formData?.gender)
          .genderId,
        categoryId: dataCategory.find(
          (g) => g.categoryName === formData?.category
        ).categoryId,
        gems: formData?.gems.map((gem: any) => gem.gemId),
        materials: formData?.materials.map(
          (material: any) => material.materialId
        ),
      });
    };
  }, [form, formData]);

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

  const submitHandle = async () => {
    const values = await form.validateFields();
    try {
      setLoading(true);
      if (formData) {
        const updateData: any = {
          productId: formData.productId,
          productName: values.productName || formData.productName,
          percentPriceRate:
            values.percentPriceRate || formData.percentPriceRate,
          productionCost: values.productionCost || formData.productionCost,
          status: true,
          featuredImage: formData.featuredImage,
          // weight: values.weight || formData.weight,
          categoryId: values.categoryId || formData.category,
          counterId: values.counterId || formData.counter,
          genderId: values.genderId || formData.gender,
          gems: values.gems || formData.gems,
          materials: [
            {
              materialId:
                values.materials[0] || formData.materials[0].materialId,
              weight: values.weight || formData.materials[0].weight,
            },
          ],
        };
        if (values?.featuredImage[0].uid) {
          const updateImageUrl: string = await uploadFileToFirebase(
            values?.featuredImage[0]
          );
          updateData.featuredImage = updateImageUrl;
        }
        await updateMutate(updateData);
      } else {
        const updateImageUrl: string = await uploadFileToFirebase(
          values?.featuredImage[0]
        );
        const createData: any = {
          ...values,
          featuredImage: updateImageUrl,
          materials: [
            {
              materialId:
                values.materials,
              weight: values.weight,
            },
          ],
        };
        delete createData.weight;
        await createMutate(createData);
      }
      setLoading(false);
      onClose();
    } catch (error: any) {
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
      title={formData?.productId ? "Edit Product" : "Create Product"}
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
      <Form form={form} initialValues={formData} layout="vertical">
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Form.Item
            label="Product Name"
            name="productName"
            required
            rules={[{ required: true, message: "Please input product Name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Counter"
            name="counterId"
            required
            rules={[{ required: true, message: "Please input counter" }]}
          >
            <Select
              showSearch
              placeholder="Select a counter"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={prepareSelectOptions(
                dataCounter,
                "counterId",
                "counterName"
              )}
            />
          </Form.Item>
          {/* <Form.Item
            label="Colour"
            name="colourId"
            required
            rules={[{ required: true, message: "Please input colour" }]}
          >
            <Select
              showSearch
              placeholder="Select a colour"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={prepareSelectOptions([], "colourId", "colourName")}
            />
          </Form.Item> */}
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
            rules={[{ required: true, message: "Please input  Production Cost" }]}
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
              options={prepareSelectOptions(
                dataCategory,
                "categoryId",
                "categoryName"
              )}
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
              options={prepareSelectOptions(
                dataGender,
                "genderId",
                "genderName"
              )}
            />
          </Form.Item>
          <Form.Item
            label="Material"
            name="materials"
            required
            rules={[{ required: true, message: "Please input material" }]}
          >
            <Select
              // mode="multiple"
              // showSearch
              placeholder="Select a material"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={filterOption}
              options={prepareSelectOptions(
                dataMaterial?.items,
                "materialId",
                "materialName"
              )}
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
              options={prepareSelectOptions(dataGem?.items, "gemId", "gemName")}
            />
          </Form.Item>
          <Form.Item
            label="Weight"
            name="weight"
            required
            rules={[{ required: true, message: "Please input weight" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            required
            rules={[{ required: true, message: "Please input quantity" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          label="Featured Image"
          name="featuredImage"
          getValueFromEvent={normFile}
        >
          <Upload
            name="featuredImage"
            maxCount={1}
            className="UploadImage"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            customRequest={fakeUpload}
            onChange={onImageChange}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
