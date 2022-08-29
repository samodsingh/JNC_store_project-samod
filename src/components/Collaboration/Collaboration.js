

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Form, Input, Button, PageHeader, Spin, Card, Row, Col, Divider, Select, DatePicker, Switch, Upload, Progress, Table } from "antd";
const { Option } = Select;
const { TextArea } = Input;

// import { EditOutlined } from "@ant-design/icons";

// import { showHideModal } from "../../redux/actions/utils";

import "./Collaboration.css";
import { addNewCollaboration, getAllCollaboratedAgencyType, getAllCollaboration, getAllDepartmentFacility } from "../../redux/actions/collaboration";
import { ACCESS_TOKEN, MOU_DOC } from "../../constants/constants";

function Collaboration() {
  const [form] = Form.useForm();
  // const [formModal] = Form.useForm();
  const dispatch = useDispatch();

  const [progressMouDocUpload, setProgressMouDocUpload] = useState(0);
  // const [progressMouDocUploadModal, setProgressMouDocUploadModal] = useState(0);
  const [mouDocUploadId, setMouDocUploadId] = useState(-1);
  const [defaultFileListMouDoc, setDefaultFileListMouDoc] = useState([]);

  const isLoadingDepartmentFacility = useSelector((state) => state.collaboration.isLoading);
  const isLoadingCollaboratedAgencyType = useSelector((state) => state.collaboration.isLoading);
  const departmentFacilityList = useSelector((state) => state.collaboration.departmentFacilityList);
  const collaboratedAgencyTypeList = useSelector((state) => state.collaboration.collaboratedAgencyTypeList);
  const collaborationList = useSelector((state) => state.collaboration.collaborationList);


  console.log("collaborationList====", collaborationList);

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const uploadImage = async (options, type) => {
    let previousDocId;
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: localStorage.getItem(ACCESS_TOKEN),
      },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        if (type === MOU_DOC) {
          setProgressMouDocUpload(percent);
        }

        if (percent === 100) {
          if (type === MOU_DOC)
            setTimeout(() => setProgressMouDocUpload(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("file", file);
    try {
      previousDocId = type === MOU_DOC ? mouDocUploadId : -1;

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload/${previousDocId}`,
        fmData,
        config
      );
      onSuccess("Ok");
      if (type === MOU_DOC) { 
        setMouDocUploadId(res.data.data.id);
      }

      // setProductImageUploadId(res.data.responseData.id);
      // selectedFacultyUserForEdit.uploadedDocsVo = {
      //   docUrl: res.data.responseData.docUrl,
      //   id: res.data.responseData.id,
      // };
      // dispatch(setSelectedFacultyUserForEdit(selectedFacultyUserForEdit));

    } catch (err) {
      onError({ err });
    }
  };

  const onChangeMouDoc = ({ fileList: newFileList }) => {
    setDefaultFileListMouDoc(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onFinish = (values) => {
    values.isMouSigned = values.isMouSigned ? true : false;
    values.mouSigntDate = values.mouSigntDate ? values.mouSigntDate.format("YYYY-MM-DD") : null;
    dispatch(addNewCollaboration(values));
    setMouDocUploadId(-1);
    setDefaultFileListMouDoc([]);
    form.resetFields();
  };

  // const cancleModal = () => {
  //   dispatch(showHideModal(false));
  // };

  // const updateCourseInformation = (values) => {
  //   let updatedCourse = {};
  //   // updatedCourse.courseTitle = values.courseTitleModal;
  //   // updatedCourse.programmeId = values.programmeIdModal;
  //   // updatedCourse.courseType = values.courseTypeModal;
  //   // updatedCourse.preRequisite = values.preRequisiteModal;
  //   // updatedCourse.nature = values.natureModal;
  //   // updatedCourse.credits = values.creditsModal;
  //   // updatedCourse.duration = values.durationModal;
  //   // updatedCourse.yearIntroduction = values.yearIntroductionModal;
  //   // updatedCourse.yearRevision = values.yearRevisionModal;
  //   // updatedCourse.isActive = values.isActiveModal;

  //   // dispatch(updateCourse(updatedCourse, selectedCourseId));
  //   dispatch(showHideModal(false));
  // }

  // const showModalAndEdit = (record) => {
  //   console.log("sel rec --- ", record);
  //   setSelectedCourseId(record.id);
  //   dispatch(showHideModal(true));
  //   // dispatch(setSelectedItemForEdit(record));

  //   // formModal.setFieldsValue({
  //   //   courseTitleModal: record && record.courseTitle,
  //   //   courseTypeModal: record && record.courseType,
  //   //   preRequisiteModal: record && record.preRequisite,
  //   //   natureModal: record && record.nature && record.nature.split(","),
  //   //   creditsModal: record && record.credits.toString(),
  //   //   programmeIdModal: record && record.programme && record.programme.id,
  //   //   durationModal: record && record.duration.toString(),
  //   //   yearIntroductionModal: record && record.yearIntroduction && record.yearIntroduction.toString(),
  //   //   yearRevisionModal: record && record.yearRevision && record.yearRevision.toString(),
  //   //   isActiveModal: record && record.isActive,
  //   // });
  // }

  useEffect(() => {
    dispatch(getAllCollaboratedAgencyType());
    dispatch(getAllDepartmentFacility());
    dispatch(getAllCollaboration());
  }, [dispatch]);


  const collaborationColumn = [
    {
      title: "Collaborated Agency Name",
      dataIndex: "collaboratedAgencyName",
      key: "collaboratedAgencyName",
      width: "10%",
      filters: collaborationList.map(fac => { return {text: fac.collaboratedAgencyName, value: fac.collaboratedAgencyName} }), 
      onFilter: (value, record) => record.collaboratedAgencyName.indexOf(value) === 0,
    },
    {
      title: "Create Date",
      key: "createdAt",
      dataIndex: "createdAt",
      width: "5%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.createdAt && new Date(record.createdAt).toISOString().split( "T" )[0] }</span>
          </>
        );
      },
    },
    {
      title: "Collaborated Agency Address",
      key: "collaboratedAgencyAddress",
      dataIndex: "collaboratedAgencyAddress",
      width: "10%",
    },
    {
      title: "Collaborated Agency Type",
      key: "collaboratedAgencyType",
      dataIndex: "collaboratedAgencyType",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.collaboratedAgencyType && record.collaboratedAgencyType.type }</span>
          </>
        );
      },
    },
    {
      title: "Department / Facility",
      key: "departmentOrFacility",
      dataIndex: "departmentOrFacility",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.departmentOrFacility && record.departmentOrFacility.name }</span>
          </>
        );
      },
    },
    {
      title: "Purpose / Objective",
      key: "purposeOrObjective",
      dataIndex: "purposeOrObjective",
      width: "10%",
    },
    {
      title: "Proposed Actvities",
      key: "proposedActvities",
      dataIndex: "proposedActvities",
      width: "10%",
    },
    {
      title: "SPOC Contact Details",
      key: "spocContactDetails",
      dataIndex: "spocContactDetails",
      width: "10%",
    },
    {
      title: "SPOC Contact Number",
      key: "spocContactNumber",
      dataIndex: "spocContactNumber",
      width: "10%",
    },
    {
      title: "SPOC Email ID",
      key: "spocEmail",
      dataIndex: "spocEmail",
      width: "10%",
    },
    {
      title: "Is MOU Signed",
      key: "isMouSigned",
      dataIndex: "isMouSigned",
      width: "5%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.isMouSigned ? "Yes": "No"}</span>
          </>
        );
      },
    },
    {
      title: "MOU Sign Date",
      key: "mouSigntDate",
      dataIndex: "mouSigntDate",
      width: "5%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.mouSigntDate && new Date(record.mouSigntDate).toISOString().split( "T" )[0] }</span>
          </>
        );
      },
    },
    {
      title: "MOU ID",
      key: "mouid",
      dataIndex: "mouid",
      width: "10%",
    },
    {
      title: "Period Of Collaboration",
      key: "periodOfCollaborationInYears",
      dataIndex: "periodOfCollaborationInYears",
      width: "5%",
    },
    {
      title: "Collaboration Status",
      key: "collaborationStatus",
      dataIndex: "collaborationStatus",
      width: "5%",
    },
    {
      title: "MOU Document",
      key: "mouDoc",
      dataIndex: "mouDoc",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            {record && record.mouDoc === null || record.mouDoc === undefined ? <span>NA</span> :
              <a href={
                record &&
                record.mouDoc &&
                record.mouDoc.docUrl
              } download target="_blank" rel="noopener noreferrer">

                {record && record.mouDoc && record.mouDoc.docUrl &&
                record.mouDoc.docUrl.includes(".pdf") ? 
                  <embed width="140" height="100" src={record && record.mouDoc && record.mouDoc.docUrl} type="application/pdf"></embed>
                  : <img src={ record && record.mouDoc && record.mouDoc.docUrl }
                    height={50}
                    width={50}
                    alt="MOU Doc"
                  />
                }
              </a>
            }
          </>
        );
      },
    },
  ];

  return (
    <div className="content-container">
      <Spin size="large" spinning={isLoadingDepartmentFacility || isLoadingCollaboratedAgencyType}>
        <Card className="card-main-form">
          <PageHeader title="Add Collaborators" className="screen-main-item animated bounce" />
          <Divider className="divider-thickness" />
          <Form
            form={form}
            {...layout}
            name="nest-collaboration"
            onFinish={onFinish}
          >
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="collaboratedAgencyName"
                  label="Collaborated Agency Name"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Collaborated Agency Name",
                      min: 3
                    },
                  ]}
                >
                  <Input type="text" placeholder="Collaborated Agency Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="collaboratedAgencyAddress"
                  label="Collaborated Agency Address"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Collaborated Agency Address",
                      min: 5
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Collaborated Agency Address" maxLength={500} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="departmentOrFacilityId"
                  label="Collaborated Agency Type"
                  rules={[
                    {
                      required: true,
                      message: "Please select collaborated agency type.",
                    },
                  ]}
                >
                  <Select placeholder="Select collaborated agency type">
                    {collaboratedAgencyTypeList.map( df => (
                      <Option key={df.id} value={df.id}>{`${df.type}`}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="collaboratedAgencyTypeId"
                  label="Department / Facility"
                  rules={[
                    {
                      required: true,
                      message: "Please select Department / Facility.",
                    },
                  ]}
                >
                  <Select placeholder="Select Department / Facility">
                    {departmentFacilityList.map( ca => (
                      <Option key={ca.id} value={ca.id}>{`${ca.name}`}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="purposeOrObjective"
                  label="Purpose/Objective"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Purpose/Objective",
                      min: 5
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Purpose/Objective" maxLength={500} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="proposedActvities"
                  label="Proposed Actvities"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Proposed Actvities",
                      min: 5
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Proposed Actvities" maxLength={500} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="spocContactDetails"
                  label="SPOC Contact Details"
                  rules={[
                    {
                      required: true,
                      message: "Please Input SPOC Contact Details",
                      min: 3
                    },
                  ]}
                >
                  <Input type="text" placeholder="SPOC Contact Details" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="spocContactNumber"
                  label="SPOC Contact Number."
                  rules={[
                    {
                      required: true,
                      message: "Please Input Valid SPOC Contact Number.",
                      pattern: /^(?:\d*)$/,
                    },
                    {
                      max: 10,
                      message: "Please input max 10 digits SPOC Contact Number.",
                    },
                    {
                      min: 10,
                      message: "Please input min 10 digits SPOC Contact Number.",
                    },
                  ]}
                >
                  <Input type="text" placeholder="SPOC Contact Number." />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="spocEmail"
                  label="SPOC Email ID"
                  rules={[
                    {
                      required: true,
                      message: "Please Input SPOC Email ID",
                    },
                  ]}
                >
                  <Input type="email" placeholder="SPOC Email ID" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="isMouSigned"
                  label="Is MOU Signed"
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
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="mouSigntDate"
                  label="MOU Sign Date"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <DatePicker className="mis-date-picker" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="periodOfCollaborationInYears"
                  label="Period Of Collaboration"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Period Of Collaboration",
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
                  <Input type="text" placeholder="Period Of Collaboration" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="collaborationStatus"
                  label="Collaboration Status"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Collaboration Status",
                    },
                  ]}
                >
                  <Select placeholder="Select Collaboration Status"> 
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                    <Option value="Closed">Closed</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="mouDocId"
                  label="MOU Document Upload"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <div className="container">
                    <Upload
                      accept=".pdf,image/*"
                      customRequest={(event) =>
                        uploadImage(event, MOU_DOC)
                      }
                      listType="picture-card"
                      onChange={onChangeMouDoc}
                      onPreview={onPreview}
                      fileList={defaultFileListMouDoc}
                      className="image-upload-grid"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      {defaultFileListMouDoc.length < 1 &&
                        "MOU Document"}
                    </Upload>
                    {progressMouDocUpload > 0 ? (
                      <Progress percent={progressMouDocUpload} />
                    ) : null}
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item className="submit-form-btn">
                  <Button
                    type="primary"
                    htmlType="AddUser"
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
              dataSource={collaborationList}
              columns={collaborationColumn}
              size="middle"
              pagination={true}
              scroll={{ x: "400vw", y: 600}}
            />
          }
          {window.innerWidth > 500 &&
            <Table
              bordered
              dataSource={collaborationList}
              columns={collaborationColumn}
              size="middle"
              pagination={true}
              scroll={{ x: "200vw", y: 600}}
            />
          }
        </div>
      </Spin>
    </div>
  );
}
  
export default Collaboration;
