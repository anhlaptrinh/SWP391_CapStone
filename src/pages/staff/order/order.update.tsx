import { Modal, Button, Form, Input } from "antd";
import { useState } from "react";


type updateForm={
    formData?:any;
    onclose:()=>void;
}
export default function OrderUpdateForm({onclose,formData}:updateForm) {
    const [form]=Form.useForm(); 
    const [loading,setloading]=useState<boolean>(false);
    const submitHandle=()=>{
        console.log("submit")
    }
  return (
    <Modal
        title='Update Order'
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
