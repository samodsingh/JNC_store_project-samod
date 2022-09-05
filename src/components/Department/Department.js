
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, PageHeader, Spin, Card, Row, Col, Divider, Select, Table, Modal, Switch } from "antd";
const { TextArea } = Input;
const { Option } = Select;

import { EditOutlined } from "@ant-design/icons";

import "./Department.css";
import { getAllFacultyOrUser } from "../../redux/actions/user";
import { addNewDepartment, getAllDepartments, updateDepartment } from "../../redux/actions/department";
import { setSelectedItemForEdit, showHideModal } from "../../redux/actions/utils";

function Department() {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const dispatch = useDispatch();

  const [selectedDeptId, setSelectedDeptId] = useState(-1);

  const isLoadingDept = useSelector((state) => state.department.isLoading);
  const isLoadingUser = useSelector((state) => state.user.isLoading);
  const facultyOrUsersList = useSelector((state) => state.user.facultyOrUsersList);
  const departmentList = useSelector((state) => state.department.departmentList);
  const modalVisibleState = useSelector((state) => state.utils.modalVisibleState);
  // const selectedItemForEdit = useSelector((state) => state.utils.selectedItemForEdit);

  // console.log("facultyOrUsersList----", facultyOrUsersList);
  // console.log("selectedItemForEdit----", selectedItemForEdit);

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const onFinish = (values) => {
    dispatch(
      addNewDepartment(values)
    );
    form.resetFields();
  };

  const cancleModal = () => {
    // dispatch(setSelectedItemForEdit(undefined));
    dispatch(showHideModal(false));
  };

  const updateDepartmentInformation = (values) => {
    let updatedDepartment = {};
    updatedDepartment.departmentName = values.departmentNameModal;
    updatedDepartment.establishedYear = values.establishedYearModal;
    updatedDepartment.mission = values.missionModal;
    updatedDepartment.vision = values.visionModal;
    updatedDepartment.objectives = values.objectivesModal;
    updatedDepartment.departmentHeadId = values.departmentHeadIdModal;
    updatedDepartment.isActive = values.isActiveModal;

    dispatch(updateDepartment(updatedDepartment, selectedDeptId));
    dispatch(showHideModal(false));
  }
  const showModalAndEdit = (record) => {
    setSelectedDeptId(record.id);
    dispatch(showHideModal(true));
    dispatch(setSelectedItemForEdit(record));

    formModal.setFieldsValue({
      departmentNameModal: record && record.departmentName,
      establishedYearModal: record && record.establishedYear && record.establishedYear.toString(),
      isActiveModal: record && record.isActive,
      missionModal: record && record.mission,
      visionModal: record && record.vision,
      objectivesModal: record && record.objectives,
      departmentHeadIdModal: record && record.departmentHead && record.departmentHead.id,
    });
  }

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllFacultyOrUser());
  }, [dispatch]);

  const departmentColumn = [
    {
      title: "Department Name",
      dataIndex: "departmentName",
      key: "departmentName",
      width: "15%",
      filters: departmentList.map(dep => { return {text: dep.departmentName, value: dep.departmentName} }), 
      onFilter: (value, record) => record.departmentName.indexOf(value) === 0,
    },
    {
      title: "Establishment Year",
      key: "establishedYear",
      dataIndex: "establishedYear",
      width: "10%",
    },
    {
      title: "Created Date",
      key: "createdAt",
      dataIndex: "createdAt",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{ record && record.createdAt && new Date(record.createdAt).toISOString().split( "T" )[0] }</span>
          </>
        );
      },
    },
    {
      title: "Mission",
      key: "mission",
      dataIndex: "mission",
      width: "20%",
    },
    {
      title: "Vision",
      key: "vision",
      dataIndex: "vision",
      width: "20%",
    },
    {
      title: "Objectives",
      key: "objectives",
      dataIndex: "objectives",
      width: "20%",
    },
    {
      title: "Department Head",
      key: "departmentHead",
      dataIndex: "departmentHead",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.departmentHead && record.departmentHead.firstName } {record && record.departmentHead && record.departmentHead.surName }</span>
          </>
        );
      },
    },
    {
      title: "Active",
      key: "isActive",
      dataIndex: "isActive",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.isActive ? "Yes": "No"}</span>
          </>
        );
      },
    },
    {
      title: "Edit",
      key: "edit",
      dataIndex: "edit",
      width: "5%",
      render: (_, record) => {
        return (
          <>
            <EditOutlined onClick={ () => showModalAndEdit(record) } />
            <Modal
              className="mis-modal"
              mask={false}
              title="Edit Department"
              visible={modalVisibleState}
              onCancel={cancleModal}
              footer={[
                <Button key="cancel" onClick={cancleModal}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  // loading={confirmEditFacultyUserLoadingState}
                  onClick={() => {
                    formModal.validateFields().then((values) => {
                      updateDepartmentInformation(values);
                    });
                  }}
                >
                  Update Department
                </Button>,
              ]}
            >
              <Form
                form={formModal}
                {...layout}
                initialValues={{
                  remember: false,
                }}
              >
                <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="departmentNameModal"
                      label="Department Name"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Department Name",
                          min: 3
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Department Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="establishedYearModal"
                      label="Establishment Year"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Establishment Year",
                          pattern: /^(?:\d*)$/,
                        },
                        {
                          max: 4,
                          message: "Please input max 4 establishment year.",
                        },
                        {
                          min: 4,
                          message: "Please input min 4 establishment year.",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Establishment Year" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="missionModal"
                      label="Mission"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Mission",
                          min: 5
                        },
                      ]}
                    >
                      <TextArea rows={4} placeholder="Mission" maxLength={500} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="visionModal"
                      label="Vision"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Vision",
                          min: 5
                        },
                      ]}
                    >
                      <TextArea rows={4} placeholder="Vision" maxLength={500} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="objectivesModal"
                      label="Objectives"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Objectives",
                          min: 5
                        },
                      ]}
                    >
                      <TextArea rows={4} placeholder="Objectives" maxLength={500} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="departmentHeadIdModal"
                      label="Department Head"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Select placeholder="Select Department Head">
                        {facultyOrUsersList.map( fac => (
                          <Option key={fac.id} value={fac.id}>{`${fac.firstName} ${fac.surName}`}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="isActiveModal"
                      label="Is Active"
                      valuePropName="checked"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Switch defaultChecked={record && record.isActive} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    
                  </Col>
                </Row>
              </Form>
            </Modal>
          </>
        );
      }
    }
  ];

  return (
    <div className="content-container">
      <Spin size="large" spinning={isLoadingDept || isLoadingUser }>
        <Card className="card-main-form">
          <PageHeader title="Add Department" className="screen-main-item animated bounce" />
          <Divider className="divider-thickness" />
          <Form
            form={form}
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
          >
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="departmentName"
                  label="Department Name"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Department Name",
                      min: 3
                    },
                  ]}
                >
                  <Input type="text" placeholder="Department Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="establishedYear"
                  label="Establishment Year"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Establishment Year",
                      pattern: /^(?:\d*)$/,
                    },
                    {
                      max: 4,
                      message: "Please input max 4 establishment year.",
                    },
                    {
                      min: 4,
                      message: "Please input min 4 establishment year.",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Establishment Year" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="mission"
                  label="Mission"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Mission",
                      min: 5
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Mission" maxLength={500} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="vision"
                  label="Vision"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Vision",
                      min: 5
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Vision" maxLength={500} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="objectives"
                  label="Objectives"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Objectives",
                      min: 5
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Objectives" maxLength={500} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="departmentHeadId"
                  label="Department Head"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Select placeholder="Select Department Head">
                    {facultyOrUsersList.map( fac => (
                      <Option key={fac.id} value={fac.id}>{`${fac.firstName} ${fac.surName}`}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Divider />
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item className="submit-form-btn">
                  <Button
                    type="primary"
                    htmlType="AddDepartment"
                  >
                    SUBMIT
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <div>
          {window.innerWidth < 500 &&
            <Table
              bordered
              dataSource={departmentList}
              columns={departmentColumn}
              size="middle"
              pagination={true}
              scroll={{ x: "500vw", y: 600}}
            />
          }
          {window.innerWidth > 500 &&
            <Table
              bordered
              dataSource={departmentList}
              columns={departmentColumn}
              size="middle"
              pagination={true}
              scroll={{ x: "150vw", y: 600}}
            />
          }
        </div>
      </Spin>
    </div>
  );
}
  
export default Department;