
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Table, Form, Input, Button, PageHeader, Spin, Card, Row, Col, Divider, Select, DatePicker, Upload, Switch, Progress, notification, InputNumber } from "antd";
const { TextArea } = Input;
const { Option } = Select;

import "./Faculty.css";
import { getAllDepartments } from "../../redux/actions/department";
import { AADHAR_DOC, ACCESS_TOKEN, NA, NET_QUALIFIED_CERT_DOC, PAN_DOC, SLET_QUALIFIED_CERT_DOC } from "../../constants/constants";
import { addFacultyUser, getAllFacultyOrUser } from "../../redux/actions/user";

function Faculty() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [showNetCertUpload, setShowNetCertUpload] = useState(false);
  const [showSletCertUpload, setShowSletCertUpload] = useState(false);
  const [progressPanDocUpload, setProgressPanDocUpload] = useState(0);
  const [progressAadharDocUpload, setProgressAadharDocUpload] = useState(0);
  const [progressNetQualifiedCertDocUpload, setProgressNetQualifiedCertDocUpload] = useState(0);
  const [progressSletQualifiedCertDocUpload, setProgressSletQualifiedCertDocUpload] = useState(0);
  const [panDocUploadId, setPanDocUploadId] = useState(-1);
  const [aadharDocUploadId, setAadharDocUploadId] = useState(-1);
  const [netQualifiedCertDocUploadId, setNetQualifiedCertDocUploadId] = useState(-1);
  const [sletQualifiedCertDocUploadId, setSletQualifiedCertDocUploadId] = useState(-1);
  const [defaultFileListPanDoc, setDefaultFileListPanDoc] = useState([]);
  const [defaultFileListAadharDoc, setDefaultFileListAadharDoc] = useState([]);
  const [defaultFileListNetQualifiedCertDoc, setDefaultFileListNetQualifiedCertDoc] = useState([]);
  const [defaultFileListSletQualifiedCertDoc, setDefaultFileListSletQualifiedCertDoc] = useState([]);
  const isLoading = useSelector((state) => state.department.isLoading);
  const departmentList = useSelector((state) => state.department.departmentList);
  const facultyOrUsersList = useSelector((state) => state.user.facultyOrUsersList);
  
  console.log("facultyOrUsersList---------", facultyOrUsersList);

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const facultyOrUsersColumn = [
    {
      title: "First Name",
      dataIndex: "firstName",
      width: "10%",
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
      width: "10%",
    },
    {
      title: "Surname",
      dataIndex: "surName",
      width: "10%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "10%",
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
      width: "10%",
    },
    {
      title: "Mother Name",
      dataIndex: "motherName",
      width: "10%",
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      width: "10%",
    },
    {
      title: "Mobile No.",
      dataIndex: "mobile",
      width: "10%",
    },
    {
      title: "PAN",
      dataIndex: "pan",
      width: "10%",
    },
    {
      title: "PAN Doc.",
      dataIndex: "panDoc",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <a href={
              record &&
                record.panDoc &&
                record.panDoc.docUrl
            } download target="_blank" rel="noopener noreferrer">

              {record && record.panDoc && record.panDoc.docUrl &&
                record.panDoc.docUrl.includes(".pdf") ? 
                <embed width="140" height="100" src={record && record.panDoc && record.panDoc.docUrl} type="application/pdf"></embed>
                : <img src={ record && record.panDoc && record.panDoc.docUrl }
                  height={50}
                  width={50}
                  alt="PAN Doc"
                />
              }
            </a>
          </>
        );
      },
    },
    {
      title: "Aadhar",
      dataIndex: "aadhaar",
      width: "10%",
    },
    {
      title: "Aadhar Doc.",
      dataIndex: "aadhaarDoc",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <a href={
              record &&
                record.aadhaarDoc &&
                record.aadhaarDoc.docUrl
            } download target="_blank" rel="noopener noreferrer">

              {record && record.aadhaarDoc && record.aadhaarDoc.docUrl &&
                record.aadhaarDoc.docUrl.includes(".pdf") ? 
                <embed width="140" height="100" src={record && record.aadhaarDoc && record.aadhaarDoc.docUrl} type="application/pdf"></embed>
                : <img src={ record && record.aadhaarDoc && record.aadhaarDoc.docUrl }
                  height={50}
                  width={50}
                  alt="Aadhar Doc"
                />
              }
            </a>
          </>
        );
      },
    },
    {
      title: "E-Mail",
      dataIndex: "username",
      width: "10%",
    },
    {
      title: "Roles",
      dataIndex: "role",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <p>{record.role.map(r => <span key={r.id}>{r.role} </span>)}</p>
          </>
        );
      },
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      width: "10%",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      width: "10%",
    },
    {
      title: "Department",
      dataIndex: "department",
      width: "10%",
    },
    {
      title: "Physically Challenged",
      dataIndex: "isPhyChallenged",
      width: "10%",
    },
    {
      title: "Type",
      dataIndex: "engagementType",
      width: "10%",
    },
    {
      title: "Address Line 1",
      dataIndex: "addressLine1",
      width: "10%",
    },
    {
      title: "Address Line 2",
      dataIndex: "addressLine2",
      width: "10%",
    },
    {
      title: "City/Village",
      dataIndex: "cityOrVill",
      width: "10%",
    },
    {
      title: "Postal Code",
      dataIndex: "postalCode",
      width: "10%",
    },
    {
      title: "Religion",
      dataIndex: "religion",
      width: "10%",
    },
    {
      title: "State",
      dataIndex: "state",
      width: "10%",
    },
    {
      title: "Date of Leaving",
      dataIndex: "leavingDate",
      width: "10%",
    },
    {
      title: "Caste",
      dataIndex: "caste",
      width: "10%",
    },
    {
      title: "Is Doctorate",
      dataIndex: "isDoctorate",
      width: "10%",
    },
    {
      title: "Is NET Qualified",
      dataIndex: "isNETQualified",
      width: "10%",
    },
    {
      title: "NET Qualified Certificate",
      dataIndex: "netQualifiedCertificateDoc",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <a href={
              record &&
                record.netQualifiedCertificateDoc &&
                record.netQualifiedCertificateDoc.docUrl
            } download target="_blank" rel="noopener noreferrer">

              {record && record.netQualifiedCertificateDoc && record.netQualifiedCertificateDoc.docUrl &&
                record.netQualifiedCertificateDoc.docUrl.includes(".pdf") ? 
                <embed width="140" height="100" src={record && record.netQualifiedCertificateDoc && record.netQualifiedCertificateDoc.docUrl} type="application/pdf"></embed>
                : <img src={ record && record.netQualifiedCertificateDoc && record.netQualifiedCertificateDoc.docUrl }
                  height={50}
                  width={50}
                  alt="NET Doc"
                />
              }
            </a>
          </>
        );
      },
    },
    {
      title: "NET Qualified Year",
      dataIndex: "netQualifiedYear",
      width: "10%",
    },

    {
      title: "Is SLET Cleared",
      dataIndex: "isSLETCleared",
      width: "10%",
    },
    {
      title: "SLET Qualified Certificate",
      dataIndex: "sletQualifiedCertificateDoc",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <a href={
              record &&
                record.sletQualifiedCertificateDoc &&
                record.sletQualifiedCertificateDoc.docUrl
            } download target="_blank" rel="noopener noreferrer">

              {record && record.sletQualifiedCertificateDoc && record.sletQualifiedCertificateDoc.docUrl &&
                record.sletQualifiedCertificateDoc.docUrl.includes(".pdf") ? 
                <embed width="140" height="100" src={record && record.sletQualifiedCertificateDoc && record.sletQualifiedCertificateDoc.docUrl} type="application/pdf"></embed>
                : <img src={ record && record.sletQualifiedCertificateDoc && record.sletQualifiedCertificateDoc.docUrl }
                  height={50}
                  width={50}
                  alt="NET Doc"
                />
              }
            </a>
          </>
        );
      },
    },
    {
      title: "SLET Qualified Year",
      dataIndex: "sletQualifiedYear",
      width: "10%",
    },
    
  ]

  const onFinish = (values) => {
    values.aadhaarDocId = aadharDocUploadId;
    values.panDocId = panDocUploadId;
    values.netQualifiedCertificateDocId = netQualifiedCertDocUploadId;
    values.sletQualifiedCertificateDocId = sletQualifiedCertDocUploadId;
    values.isDoctorate = values.isDoctorate ? true : false;
    values.isNETQualified = values.isNETQualified ? true : false;
    values.isPhyChallenged = values.isPhyChallenged ? true : false;
    values.isSLETCleared = values.isSLETCleared ? true : false;
    values.birthDate = values.birthDate ? values.birthDate.format("YYYY-MM-DD") : null;
    values.joiningDate = values.joiningDate ? values.joiningDate.format("YYYY-MM-DD") : null;
    values.leavingDate = values.leavingDate ? values.leavingDate.format("YYYY-MM-DD") : null;
    
    if(values.isNETQualified) {
      if(values.netQualifiedCertificateDocId === -1 || values.netQualifiedCertificateDocId === undefined || values.netQualifiedCertificateDocId === null) {
        notification.error({
          message: "JNC Mandatory Upload Error",
          description: "Please upload NET Qualified Certificate.",
        });
        return;
      }
    }

    if(values.isSLETCleared) {
      if(values.sletQualifiedCertificateDocId === -1 || values.sletQualifiedCertificateDocId === undefined || values.sletQualifiedCertificateDocId === null) {
        notification.error({
          message: "JNC Mandatory Upload Error",
          description: "Please upload SLET Qualified Certificate.",
        });
        return;
      }
    }

    if(values.isNETQualified) {
      if(values.netQualifiedYear === undefined || values.netQualifiedYear === null) {
        notification.error({
          message: "JNC Mandatory field Error",
          description: "Please Input NET Qualified Year.",
        });
        return;
      }
    }

    if(values.isSLETCleared) {
      if(values.sletQualifiedYear === undefined || values.sletQualifiedYear === null) {
        notification.error({
          message: "JNC Mandatory field Error",
          description: "Please Input SLET Qualified Year.",
        });
        return;
      }
    }

    values.netQualifiedYear = values.netQualifiedYear ? values.netQualifiedYear : NA;
    values.sletQualifiedYear = values.sletQualifiedYear ? values.sletQualifiedYear : NA;

    

    console.log(values);
    dispatch(addFacultyUser(values));

    setShowNetCertUpload(false);
    setShowSletCertUpload(false);
    setProgressPanDocUpload(0);
    setProgressAadharDocUpload(0);
    setProgressNetQualifiedCertDocUpload(0);
    setProgressSletQualifiedCertDocUpload(0);
    setPanDocUploadId(-1);
    setAadharDocUploadId(-1);
    setNetQualifiedCertDocUploadId(-1);
    setSletQualifiedCertDocUploadId(-1);
    setDefaultFileListPanDoc([]);
    setDefaultFileListAadharDoc([]);
    setDefaultFileListNetQualifiedCertDoc([]);
    setDefaultFileListSletQualifiedCertDoc([]);
    form.resetFields();
  };

  const onDateOfBirthChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChangeIsNETQualified = (checked) => {
    setShowNetCertUpload(checked);
    setDefaultFileListNetQualifiedCertDoc([]);
    if(!checked) {
      setNetQualifiedCertDocUploadId(-1);
    }
  };

  const onChangeIsSLETCleared = (checked) => {
    setShowSletCertUpload(checked);
    setDefaultFileListSletQualifiedCertDoc([]);
    if(!checked) {
      setSletQualifiedCertDocUploadId(-1);
    }
  };

  const setDepartmentId = (e) => {
    console.log(e);
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
        if (type === PAN_DOC) {
          // previousDocId = panDocUploadId;
          // console.log(previousDocId, panDocUploadId, "type === PAN_DOC ", type === PAN_DOC)
          setProgressPanDocUpload(percent);
        }
        if (type === AADHAR_DOC) { 
          // console.log("type === AADHAR_DOC ", type === AADHAR_DOC)
          // previousDocId = aadharDocUploadId;
          setProgressAadharDocUpload(percent);
        }
        if (type === NET_QUALIFIED_CERT_DOC) { 
          // console.log("type === NET_QUALIFIED_CERT_DOC ", type === NET_QUALIFIED_CERT_DOC)
          // previousDocId = netQualifiedCertDocUploadId;
          setProgressNetQualifiedCertDocUpload(percent);
        }
        if (type === SLET_QUALIFIED_CERT_DOC) {
          // console.log("type === SLET_QUALIFIED_CERT_DOC ", type === SLET_QUALIFIED_CERT_DOC)
          // previousDocId = sletQualifiedCertDocUploadId;
          setProgressSletQualifiedCertDocUpload(percent);
        }

        if (percent === 100) {
          if (type === PAN_DOC)
            setTimeout(() => setProgressPanDocUpload(0), 1000);
          if (type === AADHAR_DOC)
            setTimeout(() => setProgressAadharDocUpload(0), 1000);
          if (type === NET_QUALIFIED_CERT_DOC)
            setTimeout(() => setProgressNetQualifiedCertDocUpload(0), 1000);
          if (type === SLET_QUALIFIED_CERT_DOC)
            setTimeout(() => setProgressSletQualifiedCertDocUpload(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("file", file);
    try {
      previousDocId = type === PAN_DOC ? panDocUploadId : type === AADHAR_DOC ? aadharDocUploadId : type === NET_QUALIFIED_CERT_DOC ? netQualifiedCertDocUploadId : type === SLET_QUALIFIED_CERT_DOC ? sletQualifiedCertDocUploadId : -1;

      console.log("previousDocId==== ", previousDocId);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload/${previousDocId}`, // trying to send previous documentId
        fmData,
        config
      );
      onSuccess("Ok");
      console.log(type, "how---", res.data.data.id);
      if (type === PAN_DOC) { 
        setPanDocUploadId(res.data.data.id);
      } else if (type === AADHAR_DOC) {
        setAadharDocUploadId(res.data.data.id);
      } else if (type === NET_QUALIFIED_CERT_DOC) {
        setNetQualifiedCertDocUploadId(res.data.data.id);
      } else if (type === SLET_QUALIFIED_CERT_DOC) {
        setSletQualifiedCertDocUploadId(res.data.data.id);
      }
      // selectedProductForEdit.uploadedDocsVo = {
      //   docUrl: res.data.responseData.docUrl,
      //   id: res.data.responseData.id,
      // };
      // dispatch(setSelectedProductForEdit(selectedProductForEdit));
    } catch (err) {
      onError({ err });
    }
  };

  const onChangePanDoc = ({ fileList: newFileList }) => {
    setDefaultFileListPanDoc(newFileList);
  };

  const onChangeAadharDoc = ({ fileList: newFileList }) => {
    setDefaultFileListAadharDoc(newFileList);
  };

  const onChangeNetQualifiedCertDoc = ({ fileList: newFileList }) => {
    setDefaultFileListNetQualifiedCertDoc(newFileList);
  };

  const onChangeSletQualifiedCertDoc = ({ fileList: newFileList }) => {
    setDefaultFileListSletQualifiedCertDoc(newFileList);
  };

  const handleRoleSelection = (value) => {
    console.log("selected role- ", value);
  }

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllFacultyOrUser());

  }, [dispatch]);

  return (
    <div className="department-container">
      <Spin size="large" spinning={isLoading}>
        <Card className="card-main-form">
          <PageHeader title="Add Faculty (User)" className="screen-main-item animated bounce" />
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
                  name="firstName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please Input First Name",
                    },
                  ]}
                >
                  <Input type="text" placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="middleName"
                  label="Middle Name"
                  rules={[
                    {
                      required: false,
                      message: "Please Input Middle Name",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Middle Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="surName"
                  label="Surname"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Surname",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Surname" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Gender",
                    },
                  ]}
                >
                  <Select placeholder="Select Gender"> 
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="fatherName"
                  label="Father Name"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Father Name",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Father Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="motherName"
                  label="Mother Name"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Mother Name",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Mother Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="birthDate"
                  label="Date of Birth"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Date of Birth",
                    },
                  ]}
                >
                  <DatePicker onChange={onDateOfBirthChange} className="mis-date-picker" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="mobile"
                  label="Mobile No."
                  rules={[
                    {
                      required: true,
                      message: "Please Input Valid Mobile No.",
                      pattern: /^(?:\d*)$/,
                    },
                    {
                      max: 10,
                      message: "Please input max 10 digits mobile no.",
                    },
                    {
                      min: 10,
                      message: "Please input min 10 digits mobile no.",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Mobile No." />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="pan"
                  label="PAN"
                  rules={[
                    {
                      required: true,
                      message: "Please Input PAN",
                    },
                  ]}
                >
                  <Input type="text" placeholder="PAN" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="aadhaar"
                  label="Aadhaar"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Aadhaar",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Aadhaar" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="panDocId"
                  label="PAN Upload"
                  rules={[
                    {
                      required: true,
                      message: "Please Upload PAN",
                    },
                  ]}
                >
                  <div className="container">
                    <Upload
                      accept=".pdf,image/*"
                      customRequest={(event) =>
                        uploadImage(event, PAN_DOC)
                      }
                      listType="picture-card"
                      onChange={onChangePanDoc}
                      onPreview={onPreview}
                      fileList={defaultFileListPanDoc}
                      className="image-upload-grid"
                      rules={[
                        {
                          required: true,
                          message: "Please Upload PAN!",
                        },
                      ]}
                    >
                      {defaultFileListPanDoc.length < 1 &&
                        "Upload PAN"}
                    </Upload>
                    {progressPanDocUpload > 0 ? (
                      <Progress percent={progressPanDocUpload} />
                    ) : null}
                  </div>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="aadhaarDocId"
                  label="Aadhar Upload"
                  rules={[
                    {
                      required: true,
                      message: "Please Upload Aadhar",
                    },
                  ]}
                >
                  <div className="container">
                    <Upload
                      accept=".pdf,image/*"
                      customRequest={(event) =>
                        uploadImage(event, AADHAR_DOC)
                      }
                      listType="picture-card"
                      onChange={onChangeAadharDoc}
                      onPreview={onPreview}
                      fileList={defaultFileListAadharDoc}
                      className="image-upload-grid"
                      rules={[
                        {
                          required: true,
                          message: "Please Upload Aadhar!",
                        },
                      ]}
                    >
                      {defaultFileListAadharDoc.length < 1 &&
                        "Upload Aadhar"}
                    </Upload>
                    {progressAadharDocUpload > 0 ? (
                      <Progress percent={progressAadharDocUpload} />
                    ) : null}
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="username"
                  label="E-Mail address"
                  rules={[
                    {
                      required: true,
                      message: "Please Input E-Mail address",
                    },
                  ]}
                >
                  <Input type="email" placeholder="E-Mail address" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Password",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Password" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="role"
                  label="Roles"
                  rules={[
                    {
                      required: true,
                      message: "Please select role/roles.",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Select Roles"
                    // defaultValue={["ROLE_FACULTY", "ROLE_ADMIN"]}
                    onChange={handleRoleSelection}
                  >
                    <Option value="ROLE_FACULTY">FACULTY</Option>
                    <Option value="ROLE_ADMIN">ADMIN</Option>
                    <Option value="ROLE_COORDINATOR">COORDINATOR</Option>
                    <Option value="ROLE_MENTORS">MENTORS</Option>
                    <Option value="ROLE_OFFICESTAFF">OFFICESTAFF</Option>
                    <Option value="ROLE_DEPTHEAD">DEPTHEAD</Option>
                    <Option value="ROLE_VPDEAN">VPDEAN</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="joiningDate"
                  label="Date of Joining"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Date of Joining",
                    },
                  ]}
                >
                  <DatePicker onChange={onDateOfBirthChange} className="mis-date-picker" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="designation"
                  label="Designation"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Designation",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Designation" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="departmentId"
                  label="Department"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Department",
                    },
                  ]}
                >
                  <Select placeholder="Select Department" onSelect={(e) => setDepartmentId(e)}>
                    {departmentList.map( dept => (
                      <Option key={dept.id} value={dept.id}>{dept.departmentName}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="isPhyChallenged"
                  label="Is Physically Challenged"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Switch defaultChecked={false} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="engagementType"
                  label="Type"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Type",
                    },
                  ]}
                >
                  <Select placeholder="Select Type">
                    <Option value="Full Time">Full Time</Option>
                    <Option value="Part Time Visiting">Part Time Visiting</Option>
                    <Option value="Guest Faculty">Guest Faculty</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="addressLine1"
                  label="Address Line 1"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Address",
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Address" maxLength={500} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="addressLine2"
                  label="Address Line 2"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <TextArea rows={4} placeholder="Address" maxLength={500} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="cityOrVill"
                  label="City/Village"
                  rules={[
                    {
                      required: true,
                      message: "Please Input City/Village",
                    },
                  ]}
                >
                  <Input type="text" placeholder="City/Village" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="postalCode"
                  label="Postal Code"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Postal Code",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Postal Code" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="religion"
                  label="Religion"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Religion",
                    },
                  ]}
                >
                  <Select placeholder="Select Religion">
                    <Option value="Hinduism">Hinduism</Option>
                    <Option value="Islam">Islam</Option>
                    <Option value="Sikhism">Sikhism</Option>
                    <Option value="Christianity">Christianity</Option>
                    <Option value="Buddhism">Buddhism</Option>
                    <Option value="Jainism">Jainism</Option>
                    <Option value="Zoroastrianism">Zoroastrianism</Option>
                    <Option value="Judaism">Judaism</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="state"
                  label="State"
                  rules={[
                    {
                      required: true,
                      message: "Please Select State",
                    },
                  ]}
                >
                  <Select placeholder="Select State">
                    <Option value="Andhra Pradesh">Andhra Pradesh</Option>
                    <Option value="Arunachal Pradesh">Arunachal Pradesh</Option>
                    <Option value="Assam">Assam</Option>
                    <Option value="Bihar">Bihar</Option>
                    <Option value="Chhattisgarh">Chhattisgarh</Option>
                    <Option value="Goa">Goa</Option>
                    <Option value="Gujarat">Gujarat</Option>
                    <Option value="Haryana">Haryana</Option>
                    <Option value="Himachal Pradesh">Himachal Pradesh</Option>
                    <Option value="Jharkhand">Jharkhand</Option>
                    <Option value="Karnataka">Karnataka</Option>
                    <Option value="Kerala">Kerala</Option>
                    <Option value="Madhya Pradesh">Madhya Pradesh</Option>
                    <Option value="Maharashtra">Maharashtra</Option>
                    <Option value="Manipur">Manipur</Option>
                    <Option value="Meghalaya">Meghalaya</Option>
                    <Option value="Mizoram">Mizoram</Option>
                    <Option value="Nagaland">Nagaland</Option>
                    <Option value="Odisha">Odisha</Option>
                    <Option value="Punjab">Punjab</Option>
                    <Option value="Rajasthan">Rajasthan</Option>
                    <Option value="Sikkim">Sikkim</Option>
                    <Option value="Tamil Nadu">Tamil Nadu</Option>
                    <Option value="Telangana">Telangana</Option>
                    <Option value="Tripura">Tripura</Option>
                    <Option value="Uttar Pradesh">Uttar Pradesh</Option>
                    <Option value="Uttarakhand">Uttarakhand</Option>
                    <Option value="West Bengal">West Bengal</Option>
                    <Option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</Option>
                    <Option value="Chandigarh">Chandigarh</Option>
                    <Option value="Dadra and Daman Diu">Dadra and Daman Diu</Option>
                    <Option value="Delhi">Delhi</Option>
                    <Option value="Jammu and Kashmir">Jammu and Kashmir</Option>
                    <Option value="Ladakh">Ladakh</Option>
                    <Option value="Lakshadweep">Lakshadweep</Option>
                    <Option value="Puducherry">Puducherry</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="leavingDate"
                  label="Date of Leaving"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <DatePicker onChange={onDateOfBirthChange} className="mis-date-picker" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="caste"
                  label="Caste"
                  rules={[
                    {
                      required: true,
                      message: "Please Input Caste",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Caste" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="isDoctorate"
                  label="Is Doctorate"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Switch defaultChecked={false} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="isNETQualified"
                  label="Is NET Qualified"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Switch defaultChecked={false} onChange={onChangeIsNETQualified} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="isSLETCleared"
                  label="Is SLET Cleared"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Switch defaultChecked={false} onChange={onChangeIsSLETCleared} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                {showNetCertUpload &&
                <Form.Item
                  className="mis-form-item"
                  name="netQualifiedCertificateDocId"
                  label="NET Qualified Certificate"
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
                        uploadImage(event, NET_QUALIFIED_CERT_DOC)
                      }
                      listType="picture-card"
                      onChange={onChangeNetQualifiedCertDoc}
                      onPreview={onPreview}
                      fileList={defaultFileListNetQualifiedCertDoc}
                      className="image-upload-grid"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      {defaultFileListNetQualifiedCertDoc.length < 1 &&
                        "Upload NET Certificate"}
                    </Upload>
                    {progressNetQualifiedCertDocUpload > 0 ? (
                      <Progress percent={progressNetQualifiedCertDocUpload} />
                    ) : null}
                  </div>
                </Form.Item>
                }
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                {showNetCertUpload &&
                <Form.Item
                  className="mis-form-item"
                  name="netQualifiedYear"
                  label="NET Qualified Year"
                  rules={[
                    {
                      required: false,
                      message: "Please Input 4 Digits NET Qualified Year",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} placeholder="NET Qualified Year" min={1900} max={9999} />
                </Form.Item>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                {showSletCertUpload &&
                <Form.Item
                  className="mis-form-item"
                  name="sletQualifiedCertificateDocId"
                  label="SLET Qualified Certificate"
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
                        uploadImage(event, SLET_QUALIFIED_CERT_DOC)
                      }
                      listType="picture-card"
                      onChange={onChangeSletQualifiedCertDoc}
                      onPreview={onPreview}
                      fileList={defaultFileListSletQualifiedCertDoc}
                      className="image-upload-grid"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      {defaultFileListSletQualifiedCertDoc.length < 1 &&
                        "Upload SLET Certificate"}
                    </Upload>
                    {progressSletQualifiedCertDocUpload > 0 ? (
                      <Progress percent={progressSletQualifiedCertDocUpload} />
                    ) : null}
                  </div>
                </Form.Item>
                }
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                {showSletCertUpload &&
                <Form.Item
                  className="mis-form-item"
                  name="sletQualifiedYear"
                  label="SLET Qualified Year"
                  rules={[
                    {
                      required: false,
                      message: "Please Input 4 Digits SLET Qualified Year",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} placeholder="SLET Qualified Year" min={1900} max={9999} />
                </Form.Item>
                }
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

        <>
          <div>
            <Table
              bordered
              dataSource={facultyOrUsersList}
              columns={facultyOrUsersColumn}
              // expandable={{ expandedRowRender }}
              // rowClassName="editable-row"
              size="middle"
              // scroll={{ x: "max-content" }}
              pagination={true}
              // scroll={{ x: "100vw", y: 580 }}
              // scroll={{ x: "calc(900px + 50%)", y: 500 }}
              scroll={{x: "300vw", y: 500}}
            // scroll={{ x: true }}
            />
          </div>
        </>
      </Spin>
    </div>
  );
}
  
export default Faculty;
