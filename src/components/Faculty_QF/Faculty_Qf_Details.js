import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
  Progress,
} from "antd";
import axios from "axios";
const { Option } = Select;
import { EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getFacultyQf,
  updateFacultyQf,
  setSelectedFacultyQfForEdit,
  getAllDegreeTitles,
} from "../../redux/actions/facultyQualification";
import "./Faculty_Qf.css";
import { showHideModal } from "../../redux/actions/utils";
import { ACCESS_TOKEN } from "../../constants/constants";

const Faculty_QF_Grid = () => {
  const [formModal] = Form.useForm();
  const dispatch = useDispatch();
  const degreeList = useSelector(
    (state) => state.facultyQualification.degreeList
  );
  const [CertificateUploadIdModal, setCertificateUploadIdModal] = useState(-1);
  const [defaultFileCertificateModal, setdefaultFileCertificateModal] =
    useState([]);
  const [progressCertificateUploadModal, setprogressCertificateUploadModal] =
    useState(0);

  const faculty_Qf_Data = useSelector(
    (state) => state.facultyQualification.facultyQf_List
  );
  const user = useSelector((state) => state.user.userDetail);

  const selectedFacultyQfForEdit = useSelector(
    (state) => state.facultyQualification.selectedFacultyQfForEdit
  );

  const onChangeCertificateModal = ({ fileList: newFileList }) => {
    setdefaultFileCertificateModal(newFileList);
  };

  useEffect(() => {
    dispatch(getFacultyQf(user.id));
    dispatch(getAllDegreeTitles());
  }, [dispatch]);

  const onPreviewModal = async (file) => {
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

  const uploadCertificateModal = async (options) => {
    let previousDocId;
    const { onSuccess, onError, file, onProgress } = options;
    const FormData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: localStorage.getItem(ACCESS_TOKEN),
      },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setprogressCertificateUploadModal(percent);

        if (percent === 100) {
          setTimeout(() => setprogressCertificateUploadModal(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    FormData.append("file", file);
    try {
      previousDocId = CertificateUploadIdModal;
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload/${previousDocId}`,
        FormData,
        config
      );
      console.log(res);
      onSuccess("Ok");
      setCertificateUploadIdModal(res.data.id);
    } catch (err) {
      onError({ err });
    }
  };

  const modalVisibleState = useSelector(
    (state) => state.utils.modalVisibleState
  );
  const PopulateFacultyQfInModal = (record) => {
    dispatch(showHideModal(true));
    dispatch(setSelectedFacultyQfForEdit(record));
    console.log(record);
    setCertificateUploadIdModal(
      record && record.qualificationCert && record.qualificationCert.id
    );

    setdefaultFileCertificateModal([
      {
        uid: record && record.qualificationCert && record.qualificationCert.id,
        name: "UploadedCertificateDoc",
        status: "done",
        url:
          record && record.qualificationCert && record.qualificationCert.docUrl,
      },
    ]);
    formModal.setFieldsValue({
      degreeIdModal: record && record.degree && record.degree.id,
      monthYearCompletionModal: record && record.monthYearCompletion,
      natureModal: record && record.nature,
      specializationModal: record && record.specialization,
      universityModal: record && record.university,
      instituteNameModal: record && record.instituteName,
      percentageModal: record && record.percentage,
      stateModal: record && record.state,
      countryModal: record && record.country,
      qualificationCertIdModal:
        record && record.qualificationCert && record.qualificationCert.id,
    });
  };

  const CloseModal = () => {
    dispatch(showHideModal(false));
    dispatch(setSelectedFacultyQfForEdit(undefined));
  };

  const UpdateFacultyQfData = (values, selectedFacultyQfId) => {
    let ModifiedData = { Qualification_id: selectedFacultyQfId };
    ModifiedData.degreeId = values.degreeIdModal;
    ModifiedData.monthYearCompletion = values.monthYearCompletionModal;
    ModifiedData.nature = values.natureModal;
    ModifiedData.specialization = values.specializationModal;
    ModifiedData.university = values.universityModal;
    ModifiedData.instituteName = values.instituteNameModal;
    ModifiedData.percentage = values.percentageModal
      ? values.percentageModal
      : "0";
    ModifiedData.state = values.stateModal;
    ModifiedData.country = values.countryModal;
    ModifiedData.qualificationCertId = CertificateUploadIdModal;
    dispatch(updateFacultyQf(ModifiedData));
    dispatch(showHideModal(false));
    dispatch(setSelectedFacultyQfForEdit(undefined));
    setprogressCertificateUploadModal(0);
    setCertificateUploadIdModal(-1);
    setdefaultFileCertificateModal([]);
    formModal.resetFields();
  };

  const facultyQf_Columns = [
    {
      title: "Name of the degree",
      key: "degreeId",
      dataIndex: "degreeId",
      width: 100,
      filters: faculty_Qf_Data.map((f) => {
        return { text: f.degree.name, value: f.degree.id };
      }),
      render: (_, record) => {
        return (
          <>
            <span>{record && record.degree && record.degree.name}</span>
          </>
        );
      },
    },
    {
      title: "Month and Year of Completion",
      key: "monthYearCompletion",
      dataIndex: "monthYearCompletion",
      width: 100,
    },
    {
      title: "Nature",
      key: "nature",
      dataIndex: "nature",
      width: 100,
    },
    {
      title: "Specialization",
      key: "specialization",
      dataIndex: "specialization",
      width: 100,
    },
    {
      title: "University",
      key: "university",
      dataIndex: "university",
      width: 100,
    },
    {
      title: "Institute Name",
      key: "instituteName",
      dataIndex: "instituteName",
      width: 100,
    },
    {
      title: "Percentage",
      key: "percentage",
      dataIndex: "percentage",
      width: 100,
    },
    {
      title: "State",
      key: "state",
      dataIndex: "state",
      width: 100,
    },
    {
      title: "Country",
      key: "country",
      dataIndex: "country",
      width: 100,
    },
    {
      title: "Qualification Certificate",
      key: "qualificationCertId",
      dataIndex: "qualificationCertId",
      width: 100,

      render: (_, record) => {
        return (
          <>
            {(record && record.qualificationCert === null) ||
            record.qualificationCert === undefined ? (
              <span>NA</span>
            ) : (
              <a
                href={
                  record &&
                  record.qualificationCert &&
                  record.qualificationCert.docUrl
                }
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                {record &&
                record.qualificationCert &&
                record.qualificationCert.docUrl &&
                record.qualificationCert.docUrl.includes(".pdf") ? (
                  <embed
                    width="150"
                    height="50"
                    src={
                      record &&
                      record.qualificationCert &&
                      record.qualificationCert.qualificationCertId
                    }
                    type="application/pdf"
                  ></embed>
                ) : (
                  <img
                    src={
                      record &&
                      record.qualificationCert &&
                      record.qualificationCert.docUrl
                    }
                    height={50}
                    width={50}
                    alt="Qualification Certificate"
                  />
                )}
              </a>
            )}
          </>
        );
      },
    },
    {
      title: "Edit",
      key: "edit",
      dataIndex: "edit",
      width: 50,
      render: (_, record) => (
        <EditOutlined onClick={() => PopulateFacultyQfInModal(record)} />
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Edit Faculty Qualification"
        visible={modalVisibleState}
        onCancel={CloseModal}
        footer={[
          <Button key="cancel" onClick={CloseModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              formModal.validateFields().then((values) => {
                UpdateFacultyQfData(
                  values,
                  selectedFacultyQfForEdit && selectedFacultyQfForEdit.id
                );
              });
            }}
          >
            Update Qualification
          </Button>,
        ]}
        width={800}
      >
        <Form
          form={formModal}
          layout="vertical"
          initialValues={{
            remember: false,
          }}
        >
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="input_item"
                name="degreeIdModal"
                label="Name of the degree"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Degree Name",
                  },
                ]}
              >
                <Select
                  placeholder="Select the Qualification"
                  style={{ textAlign: "left" }}
                >
                  {degreeList.map((dL) => (
                    <Option key={dL.id} value={dL.id}>
                      {`${dL.name}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="input_item"
                name="monthYearCompletionModal"
                label="Month and Year of Completion"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Month and Year of Completion",
                  },
                ]}
              >
                <Input placeholder="Month and Year of Completion" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="input_item"
                name="natureModal"
                label="Nature"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Nature of the Course",
                  },
                ]}
              >
                <Select
                  placeholder="Select Nature of Your Course"
                  style={{ textAlign: "left" }}
                >
                  <Option value="FullTime">Full Time</Option>
                  <Option value="PartTime">Part Time</Option>
                  <Option value="Regular">Regular</Option>
                  <Option value="Correspondance">Correspondance</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="input_item"
                name="specializationModal"
                label="Specialization"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Specialization",
                  },
                ]}
              >
                <Input placeholder="Specialization" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="input_item"
                name="universityModal"
                label="University"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the University Name",
                  },
                ]}
              >
                <Input placeholder="University" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="input_item"
                name="instituteNameModal"
                label="Institute Name"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Institute Name",
                  },
                ]}
              >
                <Input placeholder="Institute Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="input_item"
                name="percentageModal"
                label="Percentage"
                rules={[
                  {
                    message: "Please Enter the Correct Percentage.",
                    pattern: /^((100)|(\d{1,2}(\.\d*)?))%?$/,
                  },
                  {
                    max: 6,
                    message: "Percentage should contain 1-6 digits",
                  },
                ]}
              >
                <Input placeholder="Percentage" />
              </Form.Item>
            </Col>
            <Col sxs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="input_item"
                name="stateModal"
                label="State"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a State",
                  },
                ]}
              >
                <Select
                  style={{ textAlign: "left" }}
                  placeholder="Select State"
                >
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
                  <Option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </Option>
                  <Option value="Chandigarh">Chandigarh</Option>
                  <Option value="Dadra and Daman Diu">
                    Dadra and Daman Diu
                  </Option>
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
                className="input_item"
                name="countryModal"
                label="Country"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Country",
                  },
                ]}
              >
                <Select
                  style={{ textAlign: "left" }}
                  placeholder="Select Country"
                >
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Åland Islands">Åland Islands</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Antigua and Barbuda">
                    Antigua and Barbuda
                  </option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegovina">
                    Bosnia and Herzegovina
                  </option>
                  <option value="Botswana">Botswana</option>
                  <option value="Bouvet Island">Bouvet Island</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">
                    British Indian Ocean Territory
                  </option>
                  <option value="Brunei Darussalam">Brunei Darussalam</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Central African Republic">
                    Central African Republic
                  </option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos (Keeling) Islands">
                    Cocos (Keeling) Islands
                  </option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Congo, The Democratic Republic of The">
                    Congo, The Democratic Republic of The
                  </option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cote D'ivoire">Cote D&apos;ivoire</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Falkland Islands (Malvinas)">
                    Falkland Islands (Malvinas)
                  </option>
                  <option value="Faroe Islands">Faroe Islands</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="French Southern Territories">
                    French Southern Territories
                  </option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Greece</option>
                  <option value="Greenland">Greenland</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guernsey">Guernsey</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-bissau">Guinea-bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Heard Island and Mcdonald Islands">
                    Heard Island and Mcdonald Islands
                  </option>
                  <option value="Holy See (Vatican City State)">
                    Holy See (Vatican City State)
                  </option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran, Islamic Republic of">
                    Iran, Islamic Republic of
                  </option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Isle of Man">Isle of Man</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jersey">Jersey</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Korea, Democratic People's Republic of">
                    Korea, Democratic People&apos;s Republic of
                  </option>
                  <option value="Korea, Republic of">Korea, Republic of</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Lao People's Democratic Republic">
                    Lao People&apos;s Democratic Republic
                  </option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan Arab Jamahiriya">
                    Libyan Arab Jamahiriya
                  </option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macao">Macao</option>
                  <option value="Macedonia, The Former Yugoslav Republic of">
                    Macedonia, The Former Yugoslav Republic of
                  </option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia, Federated States of">
                    Micronesia, Federated States of
                  </option>
                  <option value="Moldova, Republic of">
                    Moldova, Republic of
                  </option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Netherlands Antilles">
                    Netherlands Antilles
                  </option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Norfolk Island</option>
                  <option value="Northern Mariana Islands">
                    Northern Mariana Islands
                  </option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Palestinian Territory, Occupied">
                    Palestinian Territory, Occupied
                  </option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pitcairn">Pitcairn</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Reunion">Reunion</option>
                  <option value="Romania">Romania</option>
                  <option value="Russian Federation">Russian Federation</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Helena">Saint Helena</option>
                  <option value="Saint Kitts and Nevis">
                    Saint Kitts and Nevis
                  </option>
                  <option value="Saint Lucia">Saint Lucia</option>
                  <option value="Saint Pierre and Miquelon">
                    Saint Pierre and Miquelon
                  </option>
                  <option value="Saint Vincent and The Grenadines">
                    Saint Vincent and The Grenadines
                  </option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">
                    Sao Tome and Principe
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia and The South Sandwich Islands">
                    South Georgia and The South Sandwich Islands
                  </option>
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard and Jan Mayen">
                    Svalbard and Jan Mayen
                  </option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syrian Arab Republic">
                    Syrian Arab Republic
                  </option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania, United Republic of">
                    Tanzania, United Republic of
                  </option>
                  <option value="Thailand">Thailand</option>
                  <option value="Timor-leste">Timor-leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">
                    Trinidad and Tobago
                  </option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos Islands">
                    Turks and Caicos Islands
                  </option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="United States Minor Outlying Islands">
                    United States Minor Outlying Islands
                  </option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Viet Nam">Viet Nam</option>
                  <option value="Virgin Islands, British">
                    Virgin Islands, British
                  </option>
                  <option value="Virgin Islands, U.S.">
                    Virgin Islands, U.S.
                  </option>
                  <option value="Wallis and Futuna">Wallis and Futuna</option>
                  <option value="Western Sahara">Western Sahara</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="input_item"
                name="qualificationCertIdModal"
                label="Upload Certificate"
                rules={[
                  {
                    required: true,
                    message: "Please Upload Certificate",
                  },
                ]}
              >
                <div className="container">
                  <Upload
                    accept=".pdf,image/*"
                    customRequest={(event) => uploadCertificateModal(event)}
                    listType="picture-card"
                    onChange={onChangeCertificateModal}
                    onPreview={onPreviewModal}
                    fileList={defaultFileCertificateModal}
                    className="image-upload-grid"
                    rules={[
                      {
                        required: true,
                        message: "Please Upload Certificate!",
                      },
                    ]}
                  >
                    {defaultFileCertificateModal.length < 1 &&
                      "Upload Certificate"}
                  </Upload>
                  {progressCertificateUploadModal > 0 ? (
                    <Progress percent={progressCertificateUploadModal} />
                  ) : null}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Table
        bordered
        className="table-striped-rows"
        size="middle"
        pagination={{
          position: "BottomRight",
        }}
        scroll={{ x: "200vw", y: 600 }}
        columns={facultyQf_Columns}
        dataSource={faculty_Qf_Data}
      />
    </>
  );
};

export default Faculty_QF_Grid;
