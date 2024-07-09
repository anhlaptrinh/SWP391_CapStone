import { useCreateInvoice, useUpdateInvoice } from "@/api/staff/listInvoice";
import { useOrderStore } from "@/store/order";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { useEffect, useState } from "react";

export type OrderCreateFormProps={
    formData?:any;
    onclose: ()=> void;
}


export default function OrderForm({formData,onclose}:OrderCreateFormProps) {
    const [loading,setloading]=useState<boolean>(false);
    const [form]=Form.useForm();
    const userlocal=localStorage.getItem('user')||"";
    const user = JSON.parse(userlocal);

// Lấy username và id
    const id = user?.id;
    const { cartItems, clearCart } = useOrderStore();
    // const {mutateAsync: updateInvoice}=useUpdateInvoice();
    const {mutateAsync: createInvoice}=useCreateInvoice(clearCart);

    
    useEffect(() => {
      form.setFieldsValue({
        customerName: formData?.name,
        phoneNumber: formData?.phone,
        perDiscount: formData?.discount,
        userId: user.id,
      });
    }, [formData, form,user]);
  
    const submitHandle= async ()=>{
      const invoiceDetails = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
      }));
       const payload = {
        total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        perDiscount: form.getFieldValue('perDiscount'),
        customerName: form.getFieldValue('customerName'),
        phoneNumber: form.getFieldValue('phoneNumber'),
        userId: form.getFieldValue('userId'),
        invoiceDetails: invoiceDetails,
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
           
                <Form.Item
                  label="User Id"
                  name='userId'
                  required
                  
                  rules={[{required: true, message: "Please input User ID"}]}
                >
                  <Input disabled />
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
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input />
          </Form.Item>
            </div>


        </Form>

    </Modal>
  )
}
