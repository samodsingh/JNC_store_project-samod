import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, PageHeader, Spin, Card, Row, Col, Divider, Select, Table, Modal, Switch } from "antd";
const { Option } = Select;

import { EditOutlined } from "@ant-design/icons";

import "./Course.css";
import { showHideModal } from "../../redux/actions/utils";
import { getAllProgrammes } from "../../redux/actions/programme";
import { addNewCourse, getAllCourse, getAllCourseType, getAllPreRequisite, updateCourse } from "../../redux/actions/course";

function Course() {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const dispatch = useDispatch();

  const [selectedCourseId, setSelectedCourseId] = useState(-1);

  const isLoadingCourse = useSelector((state) => state.course.isLoading);
  const isLoadingProgramme = useSelector((state) => state.programme.isLoading);
  const programmeList = useSelector((state) => state.programme.programmeList);
  const courseTypeList = useSelector((state) => state.course.courseTypeList);
  const preRequisiteList = useSelector((state) => state.course.preRequisiteList);
  const courseList = useSelector((state) => state.course.courseList);
  const modalVisibleState = useSelector((state) => state.utils.modalVisibleState);
  
  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const onFinish = (values) => {
    values.isActive = values.isActive ? true : false;
    dispatch(addNewCourse(values));
    form.resetFields();
  };

  const cancleModal = () => {
    dispatch(showHideModal(false));
  };

  const updateCourseInformation = (values) => {
    let updatedCourse = {};
    updatedCourse.courseCode = values.courseCodeModal;
    updatedCourse.courseTitle = values.courseTitleModal;
    updatedCourse.programmeId = values.programmeIdModal;
    updatedCourse.courseTypeId = values.courseTypeIdModal;
    updatedCourse.prerequisiteIds = values.prerequisiteIdsModal;
    updatedCourse.nature = values.natureModal;
    updatedCourse.credits = values.creditsModal;
    updatedCourse.duration = values.durationModal;
    updatedCourse.yearIntroduction = values.yearIntroductionModal;
    updatedCourse.yearRevision = values.yearRevisionModal;
    updatedCourse.isActive = values.isActiveModal;

    dispatch(updateCourse(updatedCourse, selectedCourseId));
    dispatch(showHideModal(false));
  }

  const showModalAndEdit = (record) => {
    setSelectedCourseId(record.id);
    dispatch(showHideModal(true));
    formModal.setFieldsValue({
      courseCodeModal: record && record.courseCode,
      courseTitleModal: record && record.courseTitle,
      courseTypeIdModal: record && record.courseType && record.courseType.id,
      prerequisiteIdsModal: record && record.prerequisite && record.prerequisite.map(r => r.name),
      natureModal: record && record.nature && record.nature.split(","),
      creditsModal: record && record.credits.toString(),
      programmeIdModal: record && record.programme && record.programme.id,
      durationModal: record && record.duration.toString(),
      yearIntroductionModal: record && record.yearIntroduction && record.yearIntroduction.toString(),
      yearRevisionModal: record && record.yearRevision && record.yearRevision.toString(),
      isActiveModal: record && record.isActive,
    });
  }

  useEffect(() => {
    dispatch(getAllCourseType());
    dispatch(getAllProgrammes());
    dispatch(getAllCourse());
    dispatch(getAllPreRequisite());
  }, [dispatch]);

  const courseColumn = [
    {
      title: "Course Title",
      dataIndex: "courseTitle",
      key: "courseTitle",
      width: "15%",
      filters: courseList.map(co => { return {text: co.courseTitle, value: co.courseTitle} }), 
      onFilter: (value, record) => record.courseTitle.indexOf(value) === 0,
    },
    {
      title: "Course Code",
      key: "courseCode",
      dataIndex: "courseCode",
      width: "10%",
    },
    {
      title: "Programme",
      key: "programmeId",
      dataIndex: "programmeId",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.programme && record.programme.programmeName }</span>
          </>
        );
      },
    },
    {
      title: "Course Type",
      key: "courseType",
      dataIndex: "courseType",
      width: "20%",
      render: (_, record) => {
        return (
          <>
            <p>{record && record.courseType && record.courseType.type}</p>
          </>
        );
      },
    },
    {
      title: "Create Date",
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
      title: "Pre-requisite",
      key: "prepequisite",
      dataIndex: "prepequisite",
      width: "20%",
      render: (_, record) => {
        return (
          <>
            <p>{record && record.prerequisite && record.prerequisite.map(r => <span key={r.id}>{r.name}, </span>)}</p>
          </>
        );
      },
    },
    {
      title: "Type/Nature",
      key: "nature",
      dataIndex: "nature",
      width: "20%",
    },
    {
      title: "Credits",
      key: "credits",
      dataIndex: "credits",
      width: "20%",
    },
    {
      title: "Duration",
      key: "duration",
      dataIndex: "duration",
      width: "20%",
    },
    {
      title: "Year of Introduction",
      key: "yearIntroduction",
      dataIndex: "yearIntroduction",
      width: "20%",
    },
    {
      title: "Year of Revision",
      key: "yearRevision",
      dataIndex: "yearRevision",
      width: "20%",
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
              title="Edit Course"
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
                      updateCourseInformation(values);
                    });
                  }}
                >
                  Update Course
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
                      name="courseCodeModal"
                      label="Course Code"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Course Code",
                          min: 3
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Course Code" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="courseTitleModal"
                      label="Course Title"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Course Title",
                          min: 3
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Course Title" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="programmeIdModal"
                      label="Programme"
                      rules={[
                        {
                          required: true,
                          message: "Please select programme.",
                        },
                      ]}
                    >
                      <Select placeholder="Select Programme">
                        {programmeList.map( pro => (
                          <Option key={pro.id} value={pro.id}>{`${pro.programmeName}`}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="courseTypeIdModal"
                      label="Course Type"
                      rules={[
                        {
                          required: true,
                          message: "Please select course yype.",
                        },
                      ]}
                    >
                      <Select placeholder="Select Course Type">
                        {courseTypeList.map( ctl => (
                          <Option key={ctl.id} value={ctl.id}>{`${ctl.type}`}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="prerequisiteIdsModal"
                      label="Pre-Requisite"
                      rules={[
                        {
                          required: true,
                          message: "Please select Pre-requisite.",
                        },
                      ]}
                    >
                      <Select 
                        mode="multiple"
                        allowClear
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Pre-requisite">
                        {preRequisiteList.map( ctl => (
                          <Option key={ctl.id} value={ctl.id}>{`${ctl.name}`}</Option>
                        ))}
                      </Select>
                      {/* <Select 
                        mode="multiple"
                        allowClear
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Pre-requisite">
                        {preRequisiteList.map( pre => (
                          <Option key={pre.id} value={pre.id}>{`${pre.name}`}</Option>
                        ))}
                      </Select> */}
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="natureModal"
                      label="Type/Nature"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Type/Nature",
                        },
                      ]}
                    >
                      <Select mode="multiple"
                        allowClear
                        style={{
                          width: "100%",
                        }} placeholder="Select Type/Nature">
                        <Option value="Employability">Employability</Option>
                        <Option value="Skill development">Skill development</Option>
                        <Option value="Entrepreneurship">Entrepreneurship</Option>
                        <Option value="Promotion of professional ethics">Promotion of professional ethics</Option>
                        <Option value="Gender">Gender</Option>
                        <Option value="Human values">Human values</Option>
                        <Option value="Environment">Environment</Option>
                        <Option value="Sustainability">Sustainability</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="creditsModal"
                      label="Credits"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Credits",
                          pattern: /^(?:\d*)$/,
                        },
                        {
                          max: 3,
                          message: "Please input max 3 digit.",
                        },
                        {
                          min: 1,
                          message: "Please input min 1 digit.",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Credits" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="durationModal"
                      label="Duration"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Duration",
                          pattern: /^(?:\d*)$/,
                        },
                        {
                          max: 3,
                          message: "Please input max 3 digit.",
                        },
                        {
                          min: 1,
                          message: "Please input min 1 digit.",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Duration" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="yearIntroductionModal"
                      label="Year of Introduction"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Year of Introduction",
                          pattern: /^(?:\d*)$/,
                        },
                        {
                          max: 4,
                          message: "Please input max 4 digit.",
                        },
                        {
                          min: 4,
                          message: "Please input min 4 digit.",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Year of Introduction" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="yearRevisionModal"
                      label="Year of Revision"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Year of Revision",
                          pattern: /^(?:\d*)$/,
                        },
                        {
                          max: 4,
                          message: "Please input max 4 digit.",
                        },
                        {
                          min: 4,
                          message: "Please input min 4 digit.",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Year of Revision" />
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
      <Spin size="large" spinning={isLoadingProgramme || isLoadingCourse}>
        <Card className="card-main-form">
          <PageHeader title="Add Course" className="screen-main-item animated bounce" />
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
                  name="courseCode"
                  label="Course Code"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Course Code",
                      min: 3
                    },
                  ]}
                >
                  <Input type="text" placeholder="Course Code" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="courseTitle"
                  label="Course Title"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Course Title",
                      min: 3
                    },
                  ]}
                >
                  <Input type="text" placeholder="Course Title" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="programmeId"
                  label="Programme"
                  rules={[
                    {
                      required: true,
                      message: "Please select programme.",
                    },
                  ]}
                >
                  <Select placeholder="Select Programme">
                    {programmeList.map( pro => (
                      <Option key={pro.id} value={pro.id}>{`${pro.programmeName}`}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="courseTypeId"
                  label="Course Type"
                  rules={[
                    {
                      required: true,
                      message: "Please select course type.",
                    },
                  ]}
                >
                  <Select placeholder="Select Course Type">
                    {courseTypeList.map( ctl => (
                      <Option key={ctl.id} value={ctl.id}>{`${ctl.type}`}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="prerequisiteIds"
                  label="Pre-requisite"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Pre-requisite"
                    },
                  ]}
                >
                  <Select 
                    mode="multiple"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Select Pre-requisite">
                    {preRequisiteList.map( ctl => (
                      <Option key={ctl.id} value={ctl.id}>{`${ctl.name}`}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="nature"
                  label="Type/Nature"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Type/Nature",
                    },
                  ]}
                >
                  <Select mode="multiple"
                    allowClear
                    style={{
                      width: "100%",
                    }} placeholder="Select Type/Nature">
                    <Option value="Employability">Employability</Option>
                    <Option value="Skill development">Skill development</Option>
                    <Option value="Entrepreneurship">Entrepreneurship</Option>
                    <Option value="Promotion of professional ethics">Promotion of professional ethics</Option>
                    <Option value="Gender">Gender</Option>
                    <Option value="Human values">Human values</Option>
                    <Option value="Environment">Environment</Option>
                    <Option value="Sustainability">Sustainability</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="credits"
                  label="Credits"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Credits",
                      pattern: /^(?:\d*)$/,
                    },
                    {
                      max: 3,
                      message: "Please input max 3 digit.",
                    },
                    {
                      min: 1,
                      message: "Please input min 1 digit.",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Credits" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="duration"
                  label="Duration"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Duration",
                      pattern: /^(?:\d*)$/,
                    },
                    {
                      max: 3,
                      message: "Please input max 3 digit.",
                    },
                    {
                      min: 1,
                      message: "Please input min 1 digit.",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Duration" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="yearIntroduction"
                  label="Year of Introduction"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Year of Introduction",
                      pattern: /^(?:\d*)$/,
                    },
                    {
                      max: 4,
                      message: "Please input max 4 digit.",
                    },
                    {
                      min: 4,
                      message: "Please input min 4 digit.",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Year of Introduction" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="yearRevision"
                  label="Year of Revision"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Year of Revision",
                      pattern: /^(?:\d*)$/,
                    },
                    {
                      max: 4,
                      message: "Please input max 4 digit.",
                    },
                    {
                      min: 4,
                      message: "Please input min 4 digit.",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Year of Revision" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="isActive"
                  label="Is Active"
                  valuePropName="checked"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Switch defaultChecked={false} />
                </Form.Item>
              </Col>
            </Row>

            <Divider />
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item className="submit-form-btn">
                  <Button
                    type="primary"
                    htmlType="AddCourse"
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
              dataSource={courseList}
              columns={courseColumn}
              size="middle"
              pagination={true}
              scroll={{ x: "500vw", y: 600}}
            />
          }
          {window.innerWidth > 500 &&
            <Table
              bordered
              dataSource={courseList}
              columns={courseColumn}
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
  
export default Course;