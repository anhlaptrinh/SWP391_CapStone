import { useCreateInvoice, useUpdateInvoice } from "@/api/staff/listInvoice";
import { useListGems, useListJwelery, uselistGold } from "@/api/staff/listProduct";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { useEffect, useState } from "react";

export type OrderCreateFormProps={
    formData?:any;
    onclose: ()=> void;
}


export default function OrderForm({formData,onclose}:OrderCreateFormProps) {
    const [loading,setloading]=useState<boolean>(false);
    const [form]=Form.useForm();
    const {data: dataJewelry}=useListJwelery();
    const {data: dataGold}=uselistGold();
    const {data:dataGems}=useListGems();
    const {mutateAsync: updateInvoice}=useUpdateInvoice();
    const {mutateAsync: createInvoice}=useCreateInvoice();

    if(dataJewelry?.items.length>0){
      for(let i=0; i<dataJewelry?.items.length;i++){
        dataJewelry.items[i].value=dataJewelry.items[i].productId;
        dataJewelry.items[i].label=`JW${dataJewelry.items[i].productId}`;
      }
    }
    if(dataGems?.items.length>0){
      for(let i=0; i<dataGems?.items.length;i++){
        dataGems.items[i].value=dataGems.items[i].gemId;
        dataGems.items[i].label=`GE${dataGems.items[i].gemId}`;
      }
    }
    if(dataGold?.items.length>0){
      for(let i=0; i<dataGold?.items.length;i++){
        dataGold.items[i].value=dataGold.items[i].productId;
        dataGold.items[i].label=`GO${dataGold.items[i].productId}`;
      }
    }
    useEffect(() => {
      if (formData) {
        const { invoiceDetailsJewelry, invoiceDetailsGems, invoiceDetailsGold } = formData;
        const convertedJewelry = invoiceDetailsJewelry?.map((item: any) => item.productId);
        const convertedGems = invoiceDetailsGems?.map((item: any) => item.gemId);
        const convertedGold = invoiceDetailsGold?.map((item: any) => item.productId);
  
        form.setFieldsValue({
          invoiceDetailsJewelry: convertedJewelry,
          invoiceDetailsGems: convertedGems,
          invoiceDetailsGold: convertedGold,
          ...formData, // Set other form fields from formData
        });
      }
    }, [formData, form, dataJewelry, dataGems, dataGold]);
  
    const submitHandle= async ()=>{
      const values=await form.validateFields();
      try{
        setloading(true);
        const invoiceDetails = [];
        if (values.invoiceDetailsJewelry) {
          invoiceDetails.push(...values.invoiceDetailsJewelry);
        }
        if (values.invoiceDetailsGems) {
          invoiceDetails.push(...values.invoiceDetailsGems);
        }
        if (values.invoiceDetailsGold) {
          invoiceDetails.push(...values.invoiceDetailsGold);
        }
        // console.log("invoiceDetails:", invoiceDetails);
        if(formData){
          const updateData:any={
            ...formData,
            invoiceId: formData.invoiceId,
          }
          await updateInvoice(updateData);
          setloading(false);
        }else{
          const createData:any={
            ...values,
            invoiceDetails,
          };
          await createInvoice(createData);
          setloading(false);
          
        }
      } catch (error) {
        message.error(error.message || error);
        console.log(error);
        setloading(false);
      }
    }
    const onChange = (_value: string) => {};
    const filterOption = (
      input: string,
      option?: { label: string; value: string }
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Modal
        title={formData?.invoiceId?"Edit Order":"Create Order"}
        open
        onOk={submitHandle}
        onCancel={()=> onclose()}
        footer={[
            <Button key="back" onClick={onclose}>
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
            layout="vertical"
        >
           
                <Form.Item
                  label="User Id"
                  name='userId'
                  required
                  rules={[{required: true, message: "Please input User ID"}]}
                >
                  <Input />
                </Form.Item>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
               <Form.Item
                  label="Customer Name"
                  name="customerName"
                  required
                  rules={[{required: true, message: "Please input Customer Name"}]}
                >
                  <Input/>

                </Form.Item>
                <Form.Item
                  label="Discount"
                  name='perDiscount'
                >
                  <Input addonAfter="%"/>
                </Form.Item>
                <Form.Item
                  label="Warranty Id"
                  name='warrantyId'
                  required
                  rules={[{required: true, message: "Please input Warranty ID"}]}
                >
                   <Input/>
                </Form.Item>
                <Form.Item
                  label="Jwelery Id"
                  name="invoiceDetailsJewelry"
                >
                  <Select
                    mode="multiple"
                    
                    showSearch
                    placeholder='Select Jwelery Id'
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={dataJewelry?.items}
                  />
                </Form.Item>
                <Form.Item
                  label="Gems Id"
                  name="invoiceDetailsGems"
                >
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder='Select Gems Id'
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={dataGems?.items}
                  />
                </Form.Item>
                <Form.Item
                  label="Gold Id"
                  name="invoiceDetailsGold"
                >
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder='Select Gold Id'
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={dataGold?.items}
                  />
                </Form.Item>
            </div>


        </Form>

    </Modal>
  )
}
