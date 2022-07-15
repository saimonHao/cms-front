import React, { useEffect, useState } from "react"
import { Modal, Row, Col, Card, CardBody, UncontrolledTooltip, Button } from "reactstrap"
import MetaTags from 'react-meta-tags'
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { userActions } from "redux/reducer/user/user.actions";
import RemoteDataTable from "components/RemoteDataTable/RemoteDataTable";
import moment from 'moment';
import { Link } from "react-router-dom";
import SearchInput from "components/SearchInput/SearchInput";
import SweetAlert from "react-bootstrap-sweetalert";

import { Input, Field, Form } from '@availity/form';
import * as yup from 'yup';
import '@availity/yup';
import PageLoadingView from "components/PageLoadingView/PageLoadingView";
import { promiseDispatch } from "utils/commonRedux";
import stringInArray from "utils/stringInArray";
import { roleActions } from "redux/reducer/role/role.actions";

const UserList = () => {
    const dispatch = useAppDispatch();
    const { users, total, error } = useAppSelector(state => ({
        users: state.user.users,
        total: state.user.total,
        error: state.user.error
    }));
    const roles = useAppSelector(state => state.role.roles)

    const [userData, setUserData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [loaded, setLoaded] = useState(false);

    const [searchKey, setSearchKey] = useState("");
    const [modal_add, setModal_add] = useState(false)

    const [successAlert, setSuccessAlert] = useState("");
    const [errAlert, setErrAlert] = useState("");

    const [isEdit, setIsEdit] = useState(false);
    const [user, setUser] = useState<any>({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roleName, setRoleName] = useState<any>([]);



    useEffect(() => {
        setLoaded(false)
        dispatch({ type: userActions.FETCH_USERS, page, sizePerPage, searchKey });
        dispatch({ type: roleActions.FETCH_ROLE_DATA, page: 1, sizePerPage: 100 })
    }, [dispatch, page, sizePerPage, searchKey])

    useEffect(() => {
        if (users) {
            setLoaded(true);
            setUserData(setRows(users));
            setTotalCount(total);
        }
    }, [users]);

    const setRows = (list: any = []) => {
        return list.map((item, index) => {
            return {
                id: item.id,
                name: item.name,
                email: item.email,
                createTime: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss"),
                act: (
                    <div>
                        <Link
                            to="#"
                            className="mr-3 text-primary"
                            onClick={() => {
                                toggle_edit(item);
                            }}
                        >
                            <i
                                className="fas fa-pencil-alt text-success mr-1"
                                id="edittooltip"
                            ></i>
                            <UncontrolledTooltip placement="top" target="edittooltip">
                                Edit
                            </UncontrolledTooltip>
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link
                            to="#"
                            className="mr-3 text-danger"
                            onClick={() => {
                                toggle_del(item);
                            }}
                        >
                            <i
                                className="fas fa-trash-alt text-danger mr-1"
                                id="deltooltip"
                            ></i>
                            <UncontrolledTooltip placement="top" target="deltooltip">
                                Delete
                            </UncontrolledTooltip>
                        </Link>
                    </div>
                )
            }
        })
    }
    const columns = [{
        dataField: 'id',
        text: 'Id',
        sort: true,
        hidden: true,
        onSort: (field, order) => {
            setSortOrder(order);
            setSortField(field);
        },
    }, {
        dataField: 'name',
        text: 'Name',
        sort: true
    }, {
        dataField: 'email',
        text: 'Email',
        sort: true
    }, {
        dataField: 'createTime',
        text: 'Create Time',
        sort: true
    }, {
        dataField: 'act',
        text: 'Action',
        sort: true,
    }];
    const onPageChange = (page, sizePerPage) => {
        setPage(page);
    }
    const onSizePerPageChange = (page, sizePerPage) => {
        setPage(1);
        setSizePerPage(page);
    }

    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            setSearchKey(e.target.value);
            setPage(1);
        }
    }
    const handleAddNew = () => {
        toggle_add();
    }
    const toggle_edit = (item) => {
        console.log(item);
        setUser(item);
        setIsEdit(true);
        setModal_add(!modal_add)
        // let roleNameArr: any = Object.values(user.roles).join(",");
        // if (roleNameArr.length > 0) {
        //   setRoleName(roleNameArr.split(","));
        // } else {
        //   setRoleName([]);
        // }
        // setRoleName([]);
    }
    const toggle_add = () => {
        setIsEdit(false);
        setModal_add(!modal_add)
    }
    const showSuccessAlert = (msg) => {
        setSuccessAlert(msg);
    }
    const showErrorAlert = (msg) => {
        setErrAlert(msg);
    }
    const handleValidSubmit = async (values) => {
        // console.log(roleName);
        if (isEdit) {
            try {
                const res: any = await promiseDispatch(dispatch, {
                    type: userActions.UPDATE_USER,
                    name,
                    upId: user.id
                });
                if (res && res.data.code === 200) {
                    showSuccessAlert(res.data.message);
                } else {
                    showErrorAlert(res.data.message);
                }
            } catch (error: any) {
                showErrorAlert(error.message);
            }
        } else {
            const { name, email, password } = values;
            try {
                const res: any = await promiseDispatch(dispatch, {
                    type: userActions.ADD_USER,
                    name, email, password
                });
                if (res && res.data.code === 200) {
                    showSuccessAlert(res.data.message);
                } else {
                    showErrorAlert(res.data.message);
                }
            } catch (error: any) {
                showErrorAlert(error.message);
            }
        }

    }
    const handleConfirm = () => {
        setSuccessAlert("");
        setLoaded(false);
        setModal_add(false);
        setPage(1);
        dispatch({ type: userActions.FETCH_USERS, page, sizePerPage })
    };
    const toggle_del = async (item) => {
        try {
            const res: any = await promiseDispatch(dispatch, {
                type: userActions.DEL_USER,
                delId: item.id
            });
            if (res && res.data.code === 200) {
                showSuccessAlert(res.data.message);
            } else {
                showErrorAlert(res.data.message);
            }
        } catch (error: any) {
            showErrorAlert(error.message);
        }
    }
    const handleChange = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;
        if (targetName === "name") {
            setName(targetValue);
        }
    }
    const handleCheckBox = (name, roleid) => {
        if (roleName.length > 0) {
            if (stringInArray(roleName, name) === false) {
                roleName.push(name);
            } else {
                let index = stringInArray(roleName, name);
                if (index > -1) {
                    roleName.splice(index, 1);
                }
            }
        } else {
            roleName.push(name);
        }
        // handleSetRoleName(roleName);
        setRoleName(roleName);
    };

    if (!loaded) {
        return <PageLoadingView />;
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>User Tables | User Management & User List</title>
                </MetaTags>
                <div className="container-fluid">
                    <Breadcrumbs title="User Management" breadcrumbItem="User List" />
                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md={4}>
                                            <SearchInput
                                                searchKey={searchKey}
                                                handleSearch={handleSearch}
                                            />
                                        </Col>
                                        <Col sm="8">
                                            <div className="text-sm-end">
                                                <Button
                                                    type="button"
                                                    color="success"
                                                    className="btn-rounded  mb-2 me-2"
                                                    onClick={handleAddNew}
                                                >
                                                    <i className="mdi mdi-plus me-1" />
                                                    Add User
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <RemoteDataTable
                                        keyField="id"
                                        columns={columns}
                                        data={userData}
                                        sortOrder={sortOrder}
                                        sortField={sortField}
                                        totalSize={totalCount}
                                        page={page}
                                        sizePerPage={sizePerPage}
                                        onPageChange={onPageChange}
                                        onSizePerPageChange={onSizePerPageChange}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal
                    isOpen={modal_add}
                    toggle={() => {
                        toggle_add()
                    }}
                    size="lg"
                // centered={true}
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{isEdit ? "Update User" : "New User"}</h5>
                        <button type="button" className="btn-close"
                            onClick={() => {
                                setModal_add(false)
                            }} aria-label="Close"></button>
                    </div>
                    <Form onSubmit={(values) => { handleValidSubmit(values) }}
                        initialValues={{
                            name: isEdit ? user.name : '',
                            email: isEdit ? user.email : '',
                            password: '',
                        }}
                        validationSchema={yup.object().shape({
                            name: yup
                                .string()
                                .isRequired(true, 'Name is Required.'),
                            email: yup
                                .string()
                                .isRequired(true, 'Email is Required.')
                                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address.'),
                            password: yup.string()
                                .isRequired(isEdit ? false : true, 'Password is Required.')
                        })}
                    >
                        <div className="modal-body">
                            <Field name="name" type="text" onChange={(e) => handleChange(e)} label="Name" />
                            <Field name="email" type="text" readOnly={isEdit} label="Email" />
                            {isEdit ? "" : <Field name="password" type="password" label="password" />}
                            <label className="col-md-2 col-form-label">
                                Select Roles
                            </label>
                            <div
                                className="col-md-10"
                                style={{ paddingLeft: 0, marginTop: 8.6 }}
                            >
                                {roles &&
                                    roles.map((item: any, key) => (
                                        < div
                                            key={"_roleCheckBox_" + key}
                                            className="form-check mb-3"
                                        >
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={"_roleCheckBox_" + key}
                                                name={item.roleName}
                                                defaultValue=""
                                                onChange={() => {
                                                    handleCheckBox(item.roleName, item.id);
                                                }}
                                                defaultChecked={
                                                    stringInArray(roleName, item.roleName) !== false
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={"_roleCheckBox_" + key}
                                            >
                                                {item.roleName}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" onClick={() => {
                                setModal_add(false)
                            }}>Close</button>
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </div>
                    </Form>
                </Modal>
            </div>
            {
                successAlert !== "" ? (
                    <SweetAlert
                        success
                        title={successAlert}
                        // onConfirm={() => {
                        //   setSuccessAlert("");
                        //   history.push("/user");
                        // }}
                        onConfirm={handleConfirm}
                    />
                ) : null
            }
            {
                errAlert !== "" ? (
                    <SweetAlert error title={errAlert} onConfirm={() => setErrAlert("")} />
                ) : null
            }
        </React.Fragment >
    )
}

export default UserList;
