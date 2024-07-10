import { useCreateInvoice, useUpdateInvoice } from "@/api/staff/listInvoice";
import { useOrderStore } from "@/store/order";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { useEffect, useState } from "react";

export type OrderCreateFormProps={
    status?:string,
    formData?:any;
    onclose: ()=> void;
}


export default function OrderForm({status,formData,onclose}:OrderCreateFormProps) {
    const [loading,setloading]=useState<boolean>(false);
    const [form]=Form.useForm();
    const userlocal=localStorage.getItem('user')||"";
    const user = JSON.parse(userlocal);

// Lấy username và id
    const { cartItems, clearCart } = useOrderStore();
    // const {mutateAsync: updateInvoice}=useUpdateInvoice();
    const {mutateAsync: createInvoice}=useCreateInvoice(clearCart);

    
    useEffect(() => {
      if(formData){
        form.setFieldsValue({
          customerName: formData?.name,
          phoneNumber: formData?.phone,
          perDiscount: formData?.discount,
          
        });
      } 
      
    }, [formData, form,user]);
  
    const submitHandle= async ()=>{
      const invoiceDetails = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      const values=await form.validateFields()
       const payload = {
        total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        perDiscount: form.getFieldValue('perDiscount')||values.perDiscount,
        customerName: form.getFieldValue('customerName') ||values.customerName,
        phoneNumber: form.getFieldValue('phoneNumber') || values.customerName ,
        userId:  user.id,
        invoiceDetails: invoiceDetails,
        invoiceStatus: status,
      };
      try{
        setloading(true);
        
          await createInvoice(payload);
          setloading(false);
          
          
        
      } catch (error) {
        message.error(error.message || error);
        console.log(error);
        setloading(false);
      }
    }
    
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
           
                {/* <Form.Item
                  label="User Id"
                  name='userId'
                  required
                  
                  rules={[{required: true, message: "Please input User ID"}]}
                >
                  <Input disabled />
                </Form.Item> */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
               <Form.Item
                  label="Customer Name"
                  name="customerName"
                  required
                  rules={[{required: true, message: "Please input Customer Name"}]}
                >
                  <Input disabled/>

                </Form.Item>
                <Form.Item
                  label="Discount"
                  name='perDiscount'
                >
                  <Input disabled addonAfter="%"/>
                </Form.Item>
                
                <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
                >
            <Input disabled />
          </Form.Item>
            </div>


        </Form>

    </Modal>
  )
}
