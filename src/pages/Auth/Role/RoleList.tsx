import React, { Fragment, useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import { Row, Col, Card, CardBody, Table, Badge, UncontrolledTooltip, Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Label } from 'reactstrap';
import SearchInput from 'components/SearchInput/SearchInput';
import Collapse, { Panel } from "rc-collapse";
import 'rc-collapse/assets/index.css';

import RemoteDataTable from 'components/RemoteDataTable/RemoteDataTable';
import PageLoadingView from 'components/PageLoadingView/PageLoadingView';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { roleActions } from 'redux/reducer/role/role.actions';
import { Form, Field } from '@availity/form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import '@availity/yup';
import { useTranslation } from 'react-i18next';
import SweetAlert from 'react-bootstrap-sweetalert';
import RoleCreateModal from 'components/RoleModal/RoleCreateModal';
import { promiseDispatch } from 'utils/commonRedux';
const RoleList = () => {
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [loaded, setLoaded] = useState(false);

    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');

    const [roleData, setRoleData] = useState([]);
    const [roleTotal, setRoleTotal] = useState(0);

    const [isOpen, setIsOpen] = useState(false);
    const [toggleAdd, setToggleAdd] = useState(false);
    const [permisRoles, setPermisRoles] = useState<any>([]);
    const [searchKey, setSearchKey] = useState("");

    const [successAlert, setSuccessAlert] = useState("");
    const [errAlert, setErrAlert] = useState("");

    const [role, setRole] = useState<any>();
    const [permissions, setPermissions] = useState<any>([]);

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { roles, total } = useAppSelector(state => ({
        roles: state.role.roles,
        total: state.role.total
    }))

    useEffect(() => {
        setLoaded(false);
        dispatch({ type: roleActions.FETCH_ROLE_DATA, page, sizePerPage, searchKey })
    }, [dispatch, page, sizePerPage, searchKey])

    useEffect(() => {
        if (roles) {
            setLoaded(true);
            setRoleData(setRow(roles));
            setRoleTotal(total);
        }
    }, [roles])
    const columns = [
        {
            dataField: 'id',
            text: 'Id',
            sort: true,
            hidden: true,
            onSort: (field, order) => {
                setSortField(field);
                setSortOrder(order);
            }
        },
        {
            dataField: 'name',
            text: 'Role Name',
            sort: true,
        },
        {
            dataField: 'permissions',
            text: 'Permissions',
            sort: true,
        },
        {
            dataField: 'act',
            text: 'Action',
            sort: true,
        },
    ];

    const setRow = (list: any = []) => {
        return list.map((item, index) => {
            return {
                id: item.id,
                name: item.roleName,
                permissions: <>
                    {item.permissions.length > 0 ? item.permissions.split(",").map((p: any, index) => {
                        return <Badge key={index+"p"} style={{ margin: 3 }} color={p.startsWith("User") ? 'primary' : p.startsWith("Role") ? 'info' : 'success'} pill>{p.split(":")[0].substr(0, 1) + ":" + p.split(":")[1]}&nbsp;</Badge>
                    }) : null
                    }
                </>,
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

    const toggle_add = () => {
        setToggleAdd(!toggleAdd);
    }

    const toggle_edit = (item) => {
        let permissionsArray = item.permissions.length > 0 ? item.permissions.split(",") : [];
        setIsOpen(true);
        setPermisRoles([]);
        setRole(item);
        setPermissions(permissionsArray);
    }
    const toggle_del = async (item) => {
        try {
            const res: any = await promiseDispatch(dispatch, {
                type: roleActions.DELETE_ROLE,
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
        setLoaded(false);
        dispatch({ type: roleActions.FETCH_ROLE_DATA, page, sizePerPage })
    }
    const handleEditSubmit = async (values) => {
        const { roleName } = values;
        permissions.map((item, index) => {
            let roleIdx = permisRoles.indexOf(item);
            if (roleIdx === -1) {
                permisRoles.push(item);
            } else {
                permisRoles.splice(roleIdx, 1);
            }
        });
        let permissionsStr: string = permisRoles.join(",");
        try {
            const res: any = await promiseDispatch(dispatch, {
                type: roleActions.UPDATE_ROLE,
                upId: role.id,
                roleName,
                permissions: permissionsStr
            });
            if (res && res.data.code === 200) {
                showSuccessAlert(res.data.message);
            } else {
                showErrorAlert(res.data.message);
            }
        } catch (error: any) {
            showErrorAlert(error.message);
        }
        setIsOpen(false);
        setLoaded(false);
        setPermisRoles([]);
        dispatch({ type: roleActions.FETCH_ROLE_DATA, page, sizePerPage });
    }
    const formatRoles = (key) => {
        let index = -1;
        if ((index = permisRoles.indexOf(key)) >= 0) {
            permisRoles.splice(index, 1);
        } else {
            permisRoles.push(key);
        }
    };

    const showSuccessAlert = (msg) => {
        setSuccessAlert(msg);
    }
    const showErrorAlert = (msg) => {
        setErrAlert(msg);
    }

    const handleConfirm = () => {
        setSuccessAlert("");
        setLoaded(false);
        setToggleAdd(false);
        setPage(1);
        dispatch({ type: roleActions.FETCH_ROLE_DATA, page, sizePerPage })
    };

    const rolePermissionRow = (label, roleName) => {
        return (
            <tr key={"_module_" + roleName}>
                <td style={{ width: 150 }}>{label}</td>
                <td>
                    <div className="form-check form-switch mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={"_read_" + roleName}
                            value=""
                            defaultChecked={permissions.indexOf(roleName + ":Read") !== -1}
                            onChange={(e) => formatRoles(roleName + ":Read")}
                        />
                        <label className="form-check-label" htmlFor={"_read_" + roleName} />
                    </div>
                </td>
                <td>
                    <div className="form-check form-switch mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={"_edit_" + roleName}
                            value=""
                            defaultChecked={permissions.indexOf(roleName + ":Edit") !== -1}
                            onChange={(e) => formatRoles(roleName + ":Edit")}
                        />
                        <label className="form-check-label" htmlFor={"_edit_" + roleName} />
                    </div>
                </td>
                <td>
                    <div className="form-check form-switch mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={"_delete_" + roleName}
                            value=""
                            defaultChecked={permissions.indexOf(roleName + ":Delete") !== -1}
                            onChange={(e) => formatRoles(roleName + ":Delete")}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={"_delete_" + roleName}
                        />
                    </div>
                </td>
                <td>
                    <div className="form-check form-switch mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={"_view_" + roleName}
                            value=""
                            defaultChecked={permissions.indexOf(roleName + ":View") !== -1}
                            onChange={(e) => formatRoles(roleName + ":View")}
                        />
                        <label className="form-check-label" htmlFor={"_View_" + roleName} />
                    </div>
                </td>
            </tr>
        );
    };

    if (!loaded) {
        return <PageLoadingView />;
    }

    return (
        <Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>User Tables | User Management & User List</title>
                </MetaTags>
                <div className="container-fluid">
                    <Breadcrumb title="User Management" breadcrumbItem="Role List" />
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
                                                    onClick={toggle_add}
                                                >
                                                    <i className="mdi mdi-plus me-1" />
                                                    Add Role
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <RemoteDataTable
                                        keyField="id"
                                        columns={columns}
                                        data={roleData}
                                        totalSize={roleTotal}
                                        sortField={sortField}
                                        sortOrder={sortOrder}
                                        page={page}
                                        sizePerPage={sizePerPage}
                                        totalCount={roleTotal}
                                        onPageChange={onPageChange}
                                        onSizePerPageChange={onSizePerPageChange}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
                {/**New Role */}
                <RoleCreateModal
                    toggleAdd={toggleAdd}
                    toggle_add={toggle_add}
                    formatRoles={formatRoles}
                    permisRoles={permisRoles}
                    showSuccessAlert={showSuccessAlert}
                    showErrorAlert={showErrorAlert}
                />
                <Offcanvas
                    direction="end"
                    scrollable={true}
                    autoFocus={true}
                    isOpen={isOpen}
                    toggle={() => setIsOpen(false)}
                    style={{ width: 470, height: 'auto' }}
                >
                    <OffcanvasHeader toggle={() => setIsOpen(false)}>
                        Edit Role
                    </OffcanvasHeader>
                    <hr></hr>
                    <Form
                        initialValues={{
                            roleName: isOpen ? role.roleName : '',

                        }}
                        onSubmit={(values) => handleEditSubmit(values)}
                    // validationSchema={yup.object().shape({
                    //     permissions: yup.string().required(),
                    // })}
                    >
                        <OffcanvasBody>
                            <Card>
                                <CardBody style={{ height: 'auto', overflowY: 'auto' }}>
                                    <Field name="roleName" type="text" label="Role Name" />
                                    <Label>Select Permissions</Label>
                                    <Collapse accordion={false} defaultActiveKey={["Admin"]}>
                                        <Panel header="Admin" key="Admin">
                                            <Table className="table-centered table-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Model</th>
                                                        <th scope="col">Read</th>
                                                        <th scope="col">Edit</th>
                                                        <th scope="col">Delete</th>
                                                        <th scope="col">View</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rolePermissionRow("User", "User")}
                                                    {rolePermissionRow("Role", "Role")}
                                                </tbody>
                                            </Table>
                                        </Panel>
                                    </Collapse>

                                </CardBody>

                            </Card>
                            <Row>
                                <Col xs={12}>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light" onClick={() => {
                                            setIsOpen(false)
                                        }}>Close</button>
                                        <button type="submit" className="btn btn-primary" >Submit</button>
                                    </div>
                                </Col>
                            </Row>

                        </OffcanvasBody>

                    </Form>
                </Offcanvas>
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
        </Fragment>
    )
}
export default RoleList;