
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
// import Highlighter from "react-highlight-words";
import { Modal, Table, Form, Input, Button, PageHeader, Spin, Card, Row, Col, Divider, Select, DatePicker, Upload, Switch, Progress, notification, InputNumber } from "antd";
const { TextArea } = Input;
const { Option } = Select;

import { EditOutlined } from "@ant-design/icons";

import "./Faculty.css";
import { getAllDepartments } from "../../redux/actions/department";
import { AADHAR_DOC, AADHAR_DOC_MODAL, ACCESS_TOKEN, NA, NET_QUALIFIED_CERT_DOC, NET_QUALIFIED_CERT_DOC_MODAL, PAN_DOC, PAN_DOC_MODAL, SLET_QUALIFIED_CERT_DOC, SLET_QUALIFIED_CERT_DOC_MODAL } from "../../constants/constants";
import { addFacultyUser, getAllFacultyOrUser, setSelectedFacultyUserForEdit, updateFacultyUser } from "../../redux/actions/user";
import { showHideModal } from "../../redux/actions/utils";

function Faculty() {
  const [formModal] = Form.useForm();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [showNetCertUpload, setShowNetCertUpload] = useState(false);
  const [showNetCertUploadModal, setShowNetCertUploadModal] = useState(false);
  const [showSletCertUpload, setShowSletCertUpload] = useState(false);
  const [showSletCertUploadModal, setShowSletCertUploadModal] = useState(false);
  const [progressPanDocUpload, setProgressPanDocUpload] = useState(0);
  const [progressPanDocUploadModal, setProgressPanDocUploadModal] = useState(0);
  const [progressAadharDocUploadModal, setProgressAadharDocUploadModal] = useState(0);
  const [progressAadharDocUpload, setProgressAadharDocUpload] = useState(0);
  const [progressNetQualifiedCertDocUpload, setProgressNetQualifiedCertDocUpload] = useState(0);
  const [progressNetQualifiedCertDocUploadModel, setProgressNetQualifiedCertDocUploadModel] = useState(0);
  const [progressSletQualifiedCertDocUpload, setProgressSletQualifiedCertDocUpload] = useState(0);
  const [progressSletQualifiedCertDocUploadModal, setProgressSletQualifiedCertDocUploadModal] = useState(0);
  const [panDocUploadId, setPanDocUploadId] = useState(-1);
  const [panDocUploadIdModal, setPanDocUploadIdModal] = useState(-1);
  const [aadharDocUploadIdModal, setAadharDocUploadIdModal] = useState(-1);
  const [aadharDocUploadId, setAadharDocUploadId] = useState(-1);
  const [netQualifiedCertDocUploadId, setNetQualifiedCertDocUploadId] = useState(-1);
  const [netQualifiedCertDocUploadIdModal, setNetQualifiedCertDocUploadIdModal] = useState(-1);
  const [sletQualifiedCertDocUploadId, setSletQualifiedCertDocUploadId] = useState(-1);
  const [sletQualifiedCertDocUploadIdModal, setSletQualifiedCertDocUploadIdModal] = useState(-1);
  const [defaultFileListPanDoc, setDefaultFileListPanDoc] = useState([]);
  const [defaultFileListPanDocModal, setDefaultFileListPanDocModal] = useState([]);
  const [defaultFileListAadharDocModal, setDefaultFileListAadharDocModal] = useState([]);
  const [defaultFileListAadharDoc, setDefaultFileListAadharDoc] = useState([]);
  const [defaultFileListNetQualifiedCertDoc, setDefaultFileListNetQualifiedCertDoc] = useState([]);
  const [defaultFileListNetQualifiedCertDocModal, setDefaultFileListNetQualifiedCertDocModal] = useState([]);
  const [defaultFileListSletQualifiedCertDoc, setDefaultFileListSletQualifiedCertDoc] = useState([]);
  const [defaultFileListSletQualifiedCertDocModal, setDefaultFileListSletQualifiedCertDocModal] = useState([]);
  const isLoading = useSelector((state) => state.user.isLoading);
  const departmentList = useSelector((state) => state.department.departmentList);
  const facultyOrUsersList = useSelector((state) => state.user.facultyOrUsersList);
  const confirmEditFacultyUserLoadingState = useSelector((state) => state.user.confirmEditFacultyUserLoadingState);
  const selectedFacultyUserForEdit = useSelector((state) => state.user.selectedFacultyUserForEdit);

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  
  const modalVisibleState = useSelector((state) => state.utils.modalVisibleState);

  const showModalAndEdit = (record) => {
    dispatch(showHideModal(true));
    dispatch(setSelectedFacultyUserForEdit(record));
    setPanDocUploadIdModal(record && record.panDoc && record.panDoc.id);
    setAadharDocUploadIdModal(record && record.aadhaarDoc && record.aadhaarDoc.id);
    setNetQualifiedCertDocUploadIdModal(record && record.netQualifiedCertificateDoc && record.netQualifiedCertificateDoc.id)
    setSletQualifiedCertDocUploadIdModal(record && record.sletQualifiedCertificateDoc && record.sletQualifiedCertificateDoc.id)

    setDefaultFileListPanDocModal([
      {
        uid: record && record.panDoc && record.panDoc.id,
        name: "uploadedPanDoc",
        status: "done",
        url: record && record.panDoc && record.panDoc.docUrl,
      },
    ]);
    
    setDefaultFileListAadharDocModal([
      {
        uid: record && record.aadhaarDoc && record.aadhaarDoc.id,
        name: "uploadedAadharDoc",
        status: "done",
        url: record && record.aadhaarDoc && record.aadhaarDoc.docUrl,
      },
    ]);

    setShowSletCertUploadModal(record && record.isSLETCleared);
    setDefaultFileListNetQualifiedCertDocModal([
      {
        uid: record && record.netQualifiedCertificateDoc && record.netQualifiedCertificateDoc.id,
        name: "uploadedNetQualifiedCertificateDoc",
        status: "done",
        url: record && record.netQualifiedCertificateDoc && record.netQualifiedCertificateDoc.docUrl,
      },
    ]);
    setShowNetCertUploadModal(record && record.isNETQualified);
    setDefaultFileListSletQualifiedCertDocModal([
      {
        uid: record && record.sletQualifiedCertificateDoc && record.sletQualifiedCertificateDoc.id,
        name: "uploadedSletQualifiedCertificateDoc",
        status: "done",
        url: record && record.sletQualifiedCertificateDoc && record.sletQualifiedCertificateDoc.docUrl,
      },
    ]);
    
    formModal.setFieldsValue({
      firstNameModal: record && record.firstName,
      middleNameModal: record && record.middleName,
      surNameModal: record && record.surName,
      genderModal: record && record.gender,
      fatherNameModal: record && record.fatherName,
      motherNameModal: record && record.motherName,
      birthDateModal: record && record.birthDate && moment(record.birthDate),
      mobileModal: record && record.mobile,
      panModal: record && record.pan,
      aadhaarModal: record && record.aadhaar,
      panDocIdModal: record && record.panDoc && record.panDoc.id,
      aadhaarDocIdModal: record && record.aadhaarDoc && record.aadhaarDoc.id,
      roleModal: record && record.role && record.role.map(r => r.role),
      joiningDateModal: record && record.joiningDate && moment(record.joiningDate),
      designationModal: record && record.designation,
      belongToDepartmentIdModal: record && record.belongToDepartment && record.belongToDepartment.id,
      postalCodeModal: record && record.postalCode,
      cityOrVillModal: record && record.cityOrVill,
      addressLine2Modal: record && record.addressLine2,
      addressLine1Modal: record && record.addressLine1,
      engagementTypeModal: record && record.engagementType,
      isPhyChallengedModal: record && record.isPhyChallenged,
      
      isSLETClearedModal: record && record.isSLETCleared,
      isNETQualifiedModal: record && record.isNETQualified,
      isDoctorateModal: record && record.isDoctorate,
      casteModal: record && record.caste,
      leavingDateModal: record && record.leavingDate && moment(record.leavingDate),
      stateModal: record && record.state,
      religionModal: record && record.religion,
      sletQualifiedYearModal: record && record.sletQualifiedYear,
      netQualifiedYearModal: record && record.netQualifiedYear,
      sletQualifiedCertificateDocIdModal: record && record.sletQualifiedCertificateDoc && record.sletQualifiedCertificateDoc.id,
      netQualifiedCertificateDocIdModal: record && record.netQualifiedCertificateDoc && record.netQualifiedCertificateDoc.id,
    });
  };

  const updateFacultyUserInformation = (values, userId) => {
    let updatedValues = {userId: userId};

    updatedValues.aadhaarDocId = aadharDocUploadIdModal;
    updatedValues.panDocId = panDocUploadIdModal;
    updatedValues.netQualifiedCertificateDocId = netQualifiedCertDocUploadIdModal;
    updatedValues.sletQualifiedCertificateDocId = sletQualifiedCertDocUploadIdModal;

    updatedValues.isDoctorate = values.isDoctorateModal ? true : false;
    updatedValues.isNETQualified = values.isNETQualifiedModal ? true : false;
    updatedValues.isPhyChallenged = values.isPhyChallengedModal ? true : false;
    updatedValues.isSLETCleared = values.isSLETClearedModal ? true : false;

    updatedValues.birthDate = values.birthDateModal ? values.birthDateModal.format("YYYY-MM-DD") : null;
    updatedValues.joiningDate = values.joiningDateModal ? values.joiningDateModal.format("YYYY-MM-DD") : null;
    updatedValues.leavingDate = values.leavingDateModal ? values.leavingDateModal.format("YYYY-MM-DD") : null;

    
    if(values.isNETQualifiedModal) {
      if(values.netQualifiedCertificateDocIdModal === -1 || values.netQualifiedCertificateDocIdModal === undefined || values.netQualifiedCertificateDocIdModal === null) {
        notification.error({
          message: "JNC Mandatory Upload Error",
          description: "Please upload NET Qualified Certificate.",
        });
        return;
      }
    }

    if(values.isSLETClearedModal) {
      if(values.sletQualifiedCertificateDocIdModal === -1 || values.sletQualifiedCertificateDocIdModal === undefined || values.sletQualifiedCertificateDocIdModal === null) {
        notification.error({
          message: "JNC Mandatory Upload Error",
          description: "Please upload SLET Qualified Certificate.",
        });
        return;
      }
    }

    if(values.isNETQualifiedModal) {
      if(values.netQualifiedYearModal === undefined || values.netQualifiedYearModal === null || values.netQualifiedYearModal === NA) {
        notification.error({
          message: "JNC Mandatory field Error",
          description: "Please Input NET Qualified Year.",
        });
        return;
      }
    }

    if(values.isSLETClearedModal) {
      if(values.sletQualifiedYearModal === undefined || values.sletQualifiedYearModal === null || values.sletQualifiedYearModal === NA) {
        notification.error({
          message: "JNC Mandatory field Error",
          description: "Please Input SLET Qualified Year.",
        });
        return;
      }
    }

    updatedValues.netQualifiedYear = values.netQualifiedYearModal ? values.netQualifiedYearModal : NA;
    updatedValues.sletQualifiedYear = values.sletQualifiedYearModal ? values.sletQualifiedYearModal : NA;

    updatedValues.role = values.roleModal;
    updatedValues.mobile = values.mobileModal;
    updatedValues.firstName = values.firstNameModal;
    updatedValues.middleName = values.middleNameModal;
    updatedValues.surName = values.surNameModal;
    updatedValues.gender = values.genderModal;
    updatedValues.fatherName = values.fatherNameModal;
    updatedValues.motherName = values.motherNameModal;
    updatedValues.pan = values.panModal;
    updatedValues.aadhaar = values.aadhaarModal;
    updatedValues.designation = values.designationModal;
    updatedValues.addressLine1 = values.addressLine1Modal;
    updatedValues.addressLine2 = values.addressLine2Modal;
    updatedValues.postalCode = values.postalCodeModal;
    updatedValues.cityOrVill = values.cityOrVillModal;
    updatedValues.state = values.stateModal;
    updatedValues.religion = values.religionModal;
    updatedValues.caste = values.casteModal;
    updatedValues.engagementType = values.engagementTypeModal;
    updatedValues.belongToDepartmentId = values.belongToDepartmentIdModal;

    dispatch(updateFacultyUser(updatedValues));

    dispatch(showHideModal(false));
    
    
    setShowNetCertUploadModal(false);
    setShowSletCertUploadModal(false);
    setProgressPanDocUploadModal(0);
    setProgressAadharDocUploadModal(0);
    setProgressNetQualifiedCertDocUploadModel(0);
    setProgressSletQualifiedCertDocUploadModal(0);
    setNetQualifiedCertDocUploadIdModal(-1);
    setSletQualifiedCertDocUploadIdModal(-1);
    setDefaultFileListPanDocModal([]);
    setDefaultFileListAadharDocModal([]);
    setDefaultFileListNetQualifiedCertDocModal([]);
    setDefaultFileListSletQualifiedCertDocModal([]);
    
    dispatch(setSelectedFacultyUserForEdit(undefined));
    formModal.resetFields();
  };

  const cancleModal = () => {
    dispatch(setSelectedFacultyUserForEdit(undefined));
    dispatch(showHideModal(false));
  };
  
  // column search starts

  // const [searchText, setSearchText] = useState("");
  // const [searchedColumn, setSearchedColumn] = useState("");
  // const searchInput = useRef(null);

  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   setSearchText("");
  // };

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
  //     <div
  //       style={{
  //         padding: 8,
  //       }}
  //     >
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{
  //           marginBottom: 8,
  //           display: "block",
  //         }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({
  //               closeDropdown: false,
  //             });
  //             setSearchText(selectedKeys[0]);
  //             setSearchedColumn(dataIndex);
  //           }}
  //         >
  //           Filter
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined
  //       style={{
  //         color: filtered ? "#1890ff" : undefined,
  //       }}
  //     />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  //   onFilterDropdownVisibleChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{
  //           backgroundColor: "#ffc069",
  //           padding: 0,
  //         }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ""}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  // column search ends

  const facultyOrUsersColumn = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "15%",
      filters: facultyOrUsersList.map(fac => { return {text: fac.firstName, value: fac.firstName} }), 
      onFilter: (value, record) => record.firstName.indexOf(value) === 0,
      // ...getColumnSearchProps("firstName"),
    },
    {
      title: "Middle Name",
      key: "middleName",
      dataIndex: "middleName",
      width: "10%",
    },
    {
      title: "Surname",
      key: "surName",
      dataIndex: "surName",
      width: "10%",
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
      width: "10%",
    },
    {
      title: "Father Name",
      key: "fatherName",
      dataIndex: "fatherName",
      width: "10%",
    },
    {
      title: "Mother Name",
      key: "motherName",
      dataIndex: "motherName",
      width: "10%",
    },
    {
      title: "Birth Date",
      key: "birthDate",
      dataIndex: "birthDate",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{ record && record.birthDate && new Date(record.birthDate).toISOString().split( "T" )[0] }</span>
          </>
        );
      },
    },
    {
      title: "Mobile No.",
      key: "mobile",
      dataIndex: "mobile",
      width: "10%",
    },
    {
      title: "PAN",
      key: "pan",
      dataIndex: "pan",
      width: "10%",
    },
    {
      title: "PAN Doc.",
      key: "panDoc",
      dataIndex: "panDoc",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            {record && record.panDoc === null || record.panDoc === undefined ? <span>NA</span> :
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
            }
          </>
        );
      },
    },
    {
      title: "Aadhar",
      key: "aadhaar",
      dataIndex: "aadhaar",
      width: "10%",
    },
    {
      title: "Aadhar Doc.",
      key: "aadhaarDoc",
      dataIndex: "aadhaarDoc",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            {record && record.aadhaarDoc === null || record.aadhaarDoc === undefined ? <span>NA</span> :
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
            }
          </>
        );
      },
    },
    {
      title: "E-Mail",
      key: "username",
      dataIndex: "username",
      width: "10%",
    },
    {
      title: "Roles",
      key: "role",
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
      key: "joiningDate",
      dataIndex: "joiningDate",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.joiningDate && new Date(record.joiningDate).toISOString().split( "T" )[0] }</span>
          </>
        );
      },
    },
    {
      title: "Designation",
      key: "designation",
      dataIndex: "designation",
      width: "10%",
    },
    {
      title: "Department",
      key: "belongToDepartment",
      dataIndex: "belongToDepartment",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.belongToDepartment && record.belongToDepartment.departmentName }</span>
          </>
        );
      },
    },
    {
      title: "Physically Challenged",
      key: "isPhyChallenged",
      dataIndex: "isPhyChallenged",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.isPhyChallenged ? "Yes": "No"}</span>
          </>
        );
      },
    },
    {
      title: "Type",
      key: "engagementType",
      dataIndex: "engagementType",
      width: "10%",
    },
    {
      title: "Address Line 1",
      key: "addressLine1",
      dataIndex: "addressLine1",
      width: "10%",
    },
    {
      title: "Address Line 2",
      key: "addressLine2",
      dataIndex: "addressLine2",
      width: "10%",
    },
    {
      title: "City/Village",
      key: "cityOrVill",
      dataIndex: "cityOrVill",
      width: "10%",
    },
    {
      title: "Postal Code",
      key: "postalCode",
      dataIndex: "postalCode",
      width: "10%",
    },
    {
      title: "Religion",
      key: "religion",
      dataIndex: "religion",
      width: "10%",
    },
    {
      title: "State",
      key: "state",
      dataIndex: "state",
      width: "10%",
    },
    {
      title: "Date of Leaving",
      key: "leavingDate",
      dataIndex: "leavingDate",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.leavingDate && new Date(record.leavingDate).toISOString().split( "T" )[0] }</span>
          </>
        );
      },
    },
    {
      title: "Caste",
      key: "caste",
      dataIndex: "caste",
      width: "10%",
    },
    {
      title: "Is Doctorate",
      key: "isDoctorate",
      dataIndex: "isDoctorate",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.isDoctorate ? "Yes": "No"}</span>
          </>
        );
      },
    },
    {
      title: "Is NET Qualified",
      key: "isNETQualified",
      dataIndex: "isNETQualified",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.isNETQualified ? "Yes": "No"}</span>
          </>
        );
      },
    },
    {
      title: "NET Qualified Certificate",
      key: "netQualifiedCertificateDoc",
      dataIndex: "netQualifiedCertificateDoc",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            {record && record.netQualifiedCertificateDoc === null || record.netQualifiedCertificateDoc === undefined ? <span>NA</span> :
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
            }
          </>
        );
      },
    },
    {
      title: "NET Qualified Year",
      key: "netQualifiedYear",
      dataIndex: "netQualifiedYear",
      width: "10%",
    },

    {
      title: "Is SLET Cleared",
      key: "isSLETCleared",
      dataIndex: "isSLETCleared",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <span>{record && record.isSLETCleared ? "Yes": "No"}</span>
          </>
        );
      },
    },
    {
      title: "SLET Qualified Certificate",
      key: "sletQualifiedCertificateDoc",
      dataIndex: "sletQualifiedCertificateDoc",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            {record && record.sletQualifiedCertificateDoc === null || record.sletQualifiedCertificateDoc === undefined ? <span>NA</span> :
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
                    alt="SLET Doc"
                  />
                }
              </a>
            }
          </>
        );
      },
    },
    {
      title: "SLET Qualified Year",
      key: "sletQualifiedYear",
      dataIndex: "sletQualifiedYear",
      width: "10%",
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
              title="Edit Faculty (User)"
              visible={modalVisibleState}
              onCancel={cancleModal}
              footer={[
                <Button key="cancel" onClick={cancleModal}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={confirmEditFacultyUserLoadingState}
                  onClick={() => {
                    formModal.validateFields().then((values) => {
                      updateFacultyUserInformation(
                        values,
                        selectedFacultyUserForEdit && selectedFacultyUserForEdit.id
                      );
                    });
                  }}
                >
                  Update Faculty
                </Button>,
              ]}
            >
              {/* ==========edit faculty user form in modal=========== */}
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
                      name="firstNameModal"
                      label="First Name"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Valid First Name",
                          min: 3
                        },
                      ]}
                    >
                      <Input type="text" placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="middleNameModal"
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
                      name="surNameModal"
                      label="Surname"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Valid Surname",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Surname" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="genderModal"
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
                      name="fatherNameModal"
                      label="Father Name"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Father Name",
                          min: 3
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Father Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="motherNameModal"
                      label="Mother Name"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Mother Name",
                          min: 3
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
                      name="birthDateModal"
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
                      name="mobileModal"
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
                      name="panModal"
                      label="PAN"
                      rules={[
                        {
                          required: true,
                          message: "Please Input PAN",
                        },
                        {
                          max: 10,
                          message: "Please input max 10 digits PAN.",
                        },
                        {
                          min: 10,
                          message: "Please input min 10 digits PAN.",
                        },
                      ]}
                    >
                      <Input type="text" placeholder="PAN" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="aadhaarModal"
                      label="Aadhaar"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Aadhaar",
                          pattern: /^(?:\d*)$/,
                        },
                        {
                          max: 12,
                          message: "Please input max 12 digits Aadhaar.",
                        },
                        {
                          min: 12,
                          message: "Please input min 12 digits Aadhaar.",
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
                      name="panDocIdModal"
                      label="PAN Upload"
                      rules={[
                        {
                          required: false,
                          message: "Please Upload PAN",
                        },
                      ]}
                    >
                      <div className="container">
                        <Upload
                          accept=".pdf,image/*"
                          customRequest={(event) =>
                            uploadImage(event, PAN_DOC_MODAL)
                          }
                          listType="picture-card"
                          onChange={onChangePanDocModal}
                          onPreview={onPreview}
                          fileList={defaultFileListPanDocModal}
                          className="image-upload-grid"
                          rules={[
                            {
                              required: true,
                              message: "Please Upload PAN",
                            },
                          ]}
                        >
                          {defaultFileListPanDocModal.length < 1 &&
                                "Upload PAN"}
                        </Upload>
                        {progressPanDocUploadModal > 0 ? (
                          <Progress percent={progressPanDocUploadModal} />
                        ) : null}
                      </div>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="aadhaarDocIdModal"
                      label="Aadhar Upload"
                      rules={[
                        {
                          required: false,
                          message: "Please Upload Aadhar",
                        },
                      ]}
                    >
                      <div className="container">
                        <Upload
                          accept=".pdf,image/*"
                          customRequest={(event) =>
                            uploadImage(event, AADHAR_DOC_MODAL)
                          }
                          listType="picture-card"
                          onChange={onChangeAadharDocModal}
                          onPreview={onPreview}
                          fileList={defaultFileListAadharDocModal}
                          className="image-upload-grid"
                          rules={[
                            {
                              required: true,
                              message: "Please Upload Aadhar",
                            },
                          ]}
                        >
                          {defaultFileListAadharDocModal.length < 1 &&
                                "Upload Aadhar"}
                        </Upload>
                        {progressAadharDocUploadModal > 0 ? (
                          <Progress percent={progressAadharDocUploadModal} />
                        ) : null}
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="roleModal"
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
                      name="joiningDateModal"
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
                      name="designationModal"
                      label="Designation"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Designation",
                          min: 2
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Designation" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="belongToDepartmentIdModal"
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
                      name="isPhyChallengedModal"
                      label="Is Physically Challenged"
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
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="engagementTypeModal"
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
                      name="addressLine1Modal"
                      label="Address Line 1"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Address",
                          min: 5
                        },
                      ]}
                    >
                      <TextArea rows={4} placeholder="Address" maxLength={500} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="addressLine2Modal"
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
                      name="cityOrVillModal"
                      label="City/Village"
                      rules={[
                        {
                          required: true,
                          message: "Please Input City/Village",
                          min: 3,
                        },
                      ]}
                    >
                      <Input type="text" placeholder="City/Village" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="postalCodeModal"
                      label="Postal Code"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Postal Code",
                          pattern: /^(?:\d*)$/,
                        },
                        {
                          max: 6,
                          message: "Please input max 6 Postal Code.",
                        },
                        {
                          min: 6,
                          message: "Please input min 6 Postal Code.",
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
                      name="religionModal"
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
                      name="stateModal"
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
                      name="leavingDateModal"
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
                      name="casteModal"
                      label="Caste"
                      rules={[
                        {
                          required: true,
                          message: "Please Input Caste",
                          min: 3
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
                      name="isDoctorateModal"
                      label="Is Doctorate"
                      valuePropName="checked"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Switch defaultChecked={record && record.isDoctorate} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="isNETQualifiedModal"
                      label="Is NET Qualified"
                      valuePropName="checked"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Switch defaultChecked={record && record.isNETQualified}  onChange={onChangeIsNETQualifiedModal} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      className="mis-form-item"
                      name="isSLETClearedModal"
                      label="Is SLET Cleared"
                      valuePropName="checked"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Switch defaultChecked={record && record.isSLETCleared} onChange={onChangeIsSLETClearedModal} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    {showNetCertUploadModal &&
                    <Form.Item
                      className="mis-form-item"
                      name="netQualifiedCertificateDocIdModal"
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
                            uploadImage(event, NET_QUALIFIED_CERT_DOC_MODAL)
                          }
                          listType="picture-card"
                          onChange={onChangeNetQualifiedCertDocModal}
                          onPreview={onPreview}
                          fileList={defaultFileListNetQualifiedCertDocModal}
                          className="image-upload-grid"
                          rules={[
                            {
                              required: false,
                            },
                          ]}
                        >
                          {defaultFileListNetQualifiedCertDocModal.length < 1 &&
                            "Upload NET Certificate"}
                        </Upload>
                        {progressNetQualifiedCertDocUploadModel > 0 ? (
                          <Progress percent={progressNetQualifiedCertDocUploadModel} />
                        ) : null}
                      </div>
                    </Form.Item>
                    }
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    {showNetCertUploadModal &&
                    <Form.Item
                      className="mis-form-item"
                      name="netQualifiedYearModal"
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
                    {showSletCertUploadModal &&
                    <Form.Item
                      className="mis-form-item"
                      name="sletQualifiedCertificateDocIdModal"
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
                            uploadImage(event, SLET_QUALIFIED_CERT_DOC_MODAL)
                          }
                          listType="picture-card"
                          onChange={onChangeSletQualifiedCertDocModal}
                          onPreview={onPreview}
                          fileList={defaultFileListSletQualifiedCertDocModal}
                          className="image-upload-grid"
                          rules={[
                            {
                              required: false,
                            },
                          ]}
                        >
                          {defaultFileListSletQualifiedCertDocModal.length < 1 &&
                            "Upload SLET Certificate"}
                        </Upload>
                        {progressSletQualifiedCertDocUploadModal > 0 ? (
                          <Progress percent={progressSletQualifiedCertDocUploadModal} />
                        ) : null}
                      </div>
                    </Form.Item>
                    }
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    {showSletCertUploadModal &&
                    <Form.Item
                      className="mis-form-item"
                      name="sletQualifiedYearModal"
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

                
              </Form>
            </Modal>
          </>
        );
      },
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

    dispatch(addFacultyUser(values));

    setShowNetCertUpload(false);
    setShowNetCertUploadModal(false);
    setShowSletCertUpload(false);
    setShowSletCertUploadModal(false);
    setProgressPanDocUpload(0);
    setProgressPanDocUploadModal(0);
    setProgressAadharDocUploadModal(0);
    setProgressAadharDocUpload(0);
    setProgressNetQualifiedCertDocUpload(0);
    setProgressNetQualifiedCertDocUploadModel(0);
    setProgressSletQualifiedCertDocUpload(0);
    setProgressSletQualifiedCertDocUploadModal(0);
    setPanDocUploadId(-1);
    setAadharDocUploadId(-1);
    setNetQualifiedCertDocUploadId(-1);
    setNetQualifiedCertDocUploadIdModal(-1);
    setSletQualifiedCertDocUploadId(-1);
    setSletQualifiedCertDocUploadIdModal(-1);
    setDefaultFileListPanDoc([]);
    setDefaultFileListPanDocModal([]);
    setDefaultFileListAadharDocModal([]);
    setDefaultFileListAadharDoc([]);
    setDefaultFileListNetQualifiedCertDoc([]);
    setDefaultFileListNetQualifiedCertDocModal([]);
    setDefaultFileListSletQualifiedCertDoc([]);
    setDefaultFileListSletQualifiedCertDocModal([]);
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

  const onChangeIsNETQualifiedModal = (checked) => {
    setShowNetCertUploadModal(checked);
    setDefaultFileListNetQualifiedCertDocModal([]);
    if(!checked) {
      setNetQualifiedCertDocUploadIdModal(-1);
    }
  };

  const onChangeIsSLETCleared = (checked) => {
    setShowSletCertUpload(checked);
    setDefaultFileListSletQualifiedCertDoc([]);
    if(!checked) {
      setSletQualifiedCertDocUploadId(-1);
    }
  };

  const onChangeIsSLETClearedModal = (checked) => {
    setShowSletCertUploadModal(checked);
    setDefaultFileListSletQualifiedCertDocModal([]);
    if(!checked) {
      setSletQualifiedCertDocUploadIdModal(-1);
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
          setProgressPanDocUpload(percent);
        }
        if (type === PAN_DOC_MODAL) {
          setProgressPanDocUploadModal(percent);
        }
        if (type === AADHAR_DOC_MODAL) {
          setProgressAadharDocUploadModal(percent);
        }
        if (type === AADHAR_DOC) {
          setProgressAadharDocUpload(percent);
        }
        if (type === NET_QUALIFIED_CERT_DOC) {
          setProgressNetQualifiedCertDocUpload(percent);
        }
        if (type === NET_QUALIFIED_CERT_DOC_MODAL) {
          setProgressNetQualifiedCertDocUploadModel(percent);
        }
        if (type === SLET_QUALIFIED_CERT_DOC) {
          setProgressSletQualifiedCertDocUpload(percent);
        }
        if (type === SLET_QUALIFIED_CERT_DOC_MODAL) {
          setProgressSletQualifiedCertDocUploadModal(percent);
        }

        if (percent === 100) {
          if (type === PAN_DOC)
            setTimeout(() => setProgressPanDocUpload(0), 1000);
          if (type === PAN_DOC_MODAL)
            setTimeout(() => setProgressPanDocUploadModal(0), 1000);
          if (type === AADHAR_DOC_MODAL)
            setTimeout(() => setProgressAadharDocUploadModal(0), 1000);
          if (type === AADHAR_DOC)
            setTimeout(() => setProgressAadharDocUpload(0), 1000);
          if (type === NET_QUALIFIED_CERT_DOC)
            setTimeout(() => setProgressNetQualifiedCertDocUpload(0), 1000);
          if (type === NET_QUALIFIED_CERT_DOC_MODAL)
            setTimeout(() => setProgressNetQualifiedCertDocUploadModel(0), 1000);
          if (type === SLET_QUALIFIED_CERT_DOC)
            setTimeout(() => setProgressSletQualifiedCertDocUpload(0), 1000);
          if (type === SLET_QUALIFIED_CERT_DOC_MODAL)
            setTimeout(() => setProgressSletQualifiedCertDocUploadModal(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("file", file);
    try {
      previousDocId = type === PAN_DOC ? panDocUploadId : type === AADHAR_DOC ? aadharDocUploadId : type === NET_QUALIFIED_CERT_DOC ? netQualifiedCertDocUploadId : type === NET_QUALIFIED_CERT_DOC_MODAL ? netQualifiedCertDocUploadIdModal : type === SLET_QUALIFIED_CERT_DOC ? sletQualifiedCertDocUploadId : type === SLET_QUALIFIED_CERT_DOC_MODAL ? sletQualifiedCertDocUploadIdModal : type === PAN_DOC_MODAL ? panDocUploadIdModal : type === AADHAR_DOC_MODAL ? aadharDocUploadIdModal : -1;

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload/${previousDocId}`, // trying to send previous documentId
        fmData,
        config
      );
      onSuccess("Ok");
      if (type === PAN_DOC) { 
        setPanDocUploadId(res.data.data.id);
      } else if (type === PAN_DOC_MODAL) { 
        setPanDocUploadIdModal(res.data.data.id);
      } else if (type === AADHAR_DOC_MODAL) { 
        setAadharDocUploadIdModal(res.data.data.id);
      } else if (type === AADHAR_DOC) {
        setAadharDocUploadId(res.data.data.id);
      } else if (type === NET_QUALIFIED_CERT_DOC) {
        setNetQualifiedCertDocUploadId(res.data.data.id);
      }  else if (type === NET_QUALIFIED_CERT_DOC_MODAL) {
        setNetQualifiedCertDocUploadIdModal(res.data.data.id);
      } else if (type === SLET_QUALIFIED_CERT_DOC) {
        setSletQualifiedCertDocUploadId(res.data.data.id);
      } else if (type === SLET_QUALIFIED_CERT_DOC_MODAL) {
        setSletQualifiedCertDocUploadIdModal(res.data.data.id);
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

  const onChangePanDoc = ({ fileList: newFileList }) => {
    setDefaultFileListPanDoc(newFileList);
  };

  const onChangePanDocModal = ({ fileList: newFileList }) => {
    setDefaultFileListPanDocModal(newFileList);
  };

  const onChangeAadharDocModal = ({ fileList: newFileList }) => {
    setDefaultFileListAadharDocModal(newFileList);
  };

  const onChangeAadharDoc = ({ fileList: newFileList }) => {
    setDefaultFileListAadharDoc(newFileList);
  };

  const onChangeNetQualifiedCertDoc = ({ fileList: newFileList }) => {
    setDefaultFileListNetQualifiedCertDoc(newFileList);
  };
  const onChangeNetQualifiedCertDocModal = ({ fileList: newFileList }) => {
    setDefaultFileListNetQualifiedCertDocModal(newFileList);
  };

  const onChangeSletQualifiedCertDoc = ({ fileList: newFileList }) => {
    setDefaultFileListSletQualifiedCertDoc(newFileList);
  };
  const onChangeSletQualifiedCertDocModal = ({ fileList: newFileList }) => {
    setDefaultFileListSletQualifiedCertDocModal(newFileList);
  };

  const handleRoleSelection = (value) => {
    console.log("selected role- ", value);
  }

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllFacultyOrUser());

  }, [dispatch]);

  return (
    <div className="content-container">
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
                      min: 3
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
                      min: 3
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
                      min: 3
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
                      min: 3
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
                    {
                      max: 10,
                      message: "Please input max 10 digits PAN.",
                    },
                    {
                      min: 10,
                      message: "Please input min 10 digits PAN.",
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
                      message: "Please Input Aadhaar.",
                      pattern: /^(?:\d*)$/,
                    },
                    {
                      max: 12,
                      message: "Please input max 12 digits aadhar.",
                    },
                    {
                      min: 12,
                      message: "Please input min 12 digits aadhar.",
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
                      min: 8
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
                      min: 3
                    },
                  ]}
                >
                  <Input type="text" placeholder="Designation" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="belongToDepartmentId"
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
                      min: 3
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
                      min: 3
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
                      pattern: /^(?:\d*)$/,
                    },
                    {
                      max: 6,
                      message: "Please input max 6 digits Postal Code.",
                    },
                    {
                      min: 6,
                      message: "Please input min 6 digits Postal Code.",
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
                      min: 3
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
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  className="mis-form-item"
                  name="isNETQualified"
                  label="Is NET Qualified"
                  valuePropName="checked"
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
                  valuePropName="checked"
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
            {window.innerWidth < 500 &&
            <Table
              bordered
              dataSource={facultyOrUsersList}
              columns={facultyOrUsersColumn}
              size="middle"
              pagination={true}
              scroll={{ x: "1200vw", y: 600}}
            />
            }
            {window.innerWidth > 500 &&
            <Table
              bordered
              dataSource={facultyOrUsersList}
              columns={facultyOrUsersColumn}
              size="middle"
              pagination={true}
              scroll={{ x: "300vw", y: 600}}
            />
            }
          </div>
        </>
      </Spin>
    </div>
  );
}
  
export default Faculty;
