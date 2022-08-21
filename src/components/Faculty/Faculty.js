
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Form, Input, Button, PageHeader, Spin, Card, Row, Col, Divider, Select, DatePicker, Upload, Switch, Progress, notification, InputNumber } from "antd";
const { TextArea } = Input;
const { Option } = Select;
import "./Faculty.css";
import { getAllDepartments } from "../../redux/actions/department";
import { AADHAR_DOC, ACCESS_TOKEN, NET_QUALIFIED_CERT_DOC, PAN_DOC, SLET_QUALIFIED_CERT_DOC } from "../../constants/constants";
import { addFacultyUser } from "../../redux/actions/user";

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

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

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
    values.netQualifiedYear = values.netQualifiedYear ? values.netQualifiedYear : null;
    values.sletQualifiedYear = values.sletQualifiedYear ? values.sletQualifiedYear : null;

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

    

    console.log(values);
    dispatch(addFacultyUser(values));

    // form.resetFields();
    // setShowNetCertUpload(false);
    // setShowSletCertUpload(false);
    // setProgressPanDocUpload(0);
    // setProgressAadharDocUpload(0);
    // setProgressNetQualifiedCertDocUpload(0);
    // setProgressSletQualifiedCertDocUpload(0);
    // setPanDocUploadId(-1);
    // setAadharDocUploadId(-1);
    // setNetQualifiedCertDocUploadId(-1);
    // setSletQualifiedCertDocUploadId(-1);
    // setDefaultFileListPanDoc([]);
    // setDefaultFileListAadharDoc([]);
    // setDefaultFileListNetQualifiedCertDoc([]);
    // setDefaultFileListSletQualifiedCertDoc([]);
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
                  <Select placeholder="Select Gender">  {/* onSelect={(e) => this.getUserList(e)}> */}
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
                  {/* <InputNumber className="mobile-no-hide-inc-dec" style={{ width: "100%" }} placeholder="Mobile No." /> */}
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
                  {/* <Select placeholder="Select Department" onSelect={(e) => this.getUserList(e)}>
                    <Option value="Male">Test Department</Option>
                    <Option value="Female">Test1 Department</Option>
                  </Select> */}

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
                  <Switch defaultChecked={false} /> {/* onChange={onChange} /> */}
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
                  <Select placeholder="Select Type">  {/* onSelect={(e) => this.getUserList(e)}> */}
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
                  <Select placeholder="Select Religion">  {/* onSelect={(e) => this.getUserList(e)}> */}
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
                  <Select placeholder="Select State">  {/* onSelect={(e) => this.getUserList(e)}> */}
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
                  <Switch defaultChecked={false} /> {/* onChange={onChange} /> */}
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
      </Spin>
    </div>
  );
}
  
export default Faculty;
