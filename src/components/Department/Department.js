
import React from "react";
// import { useSelector } from "react-redux";
import { Form, Input, InputNumber, Button, PageHeader, Spin, Card, Row, Col } from "antd";
import "./Department.css";

function Department() {
  const [form] = Form.useForm();
  // const isLoading = useSelector((state) => state.department.isLoading);

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const onFinish = (values) => {
    console.log(values);
    // dispatch(
    //   addNewProduct({
    //     productDesc: values.productDesc,
    //     productImageId: productImageUploadId,
    //     productPrice: values.productPrice,
    //     productTitle: values.productTitle,
    //   })
    // );
    form.resetFields();
    // setDefaultFileListProductImage([]);
  };

  return (
    <div className="department-container">
      {/* <Spin size="large" spinning={isLoading}> */}
      <Spin size="large" spinning={false}>
        <div className="screen-main">
          <div>
            <PageHeader title="Banks" className="screen-main-item animated bounce" />
          </div>
          <div>
            {/* <Button type="primary" onClick={this.showAddNewBankModal}>Add New Bank</Button> */}
          </div>
        </div>
        
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
          >
            <Card className="product-card-class">
              <div>
                <Form
                  form={form}
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="productTitle"
                    label="Product Title"
                    rules={[
                      {
                        required: true,
                        message: "Please Input Product Title",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Product Title" />
                  </Form.Item>
                  <Form.Item
                    name="productDesc"
                    label="Product Description"
                    rules={[
                      {
                        required: true,
                        message: "Please Input Product Description",
                      },
                    ]}
                  >
                    <Input.TextArea
                      type="text"
                      placeholder="Product Description"
                    />
                  </Form.Item>

                  <Form.Item
                    name="productPrice"
                    label="Product Price"
                    rules={[
                      {
                        required: true,
                        message: "Please Input Product Price",
                      },
                    ]}
                  >
                    <InputNumber
                      type="number"
                      placeholder="Product Price"
                      className="addproduct_productprice"
                    />
                  </Form.Item>


                  <Form.Item className="addproduct-formitem-button">
                    <Button
                      type="primary"
                      htmlType="AddProduct"
                      className="addproduct-button-className"
                    >
                    Add Product
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}
  
export default Department;
