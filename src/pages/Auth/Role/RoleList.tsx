import React, { Fragment, useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import { Row, Col, Card, CardBody, Table, UncontrolledTooltip, Button, Offcanvas, OffcanvasHeader, OffcanvasBody, Label } from 'reactstrap';
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
const RoleList = () => {
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [loaded, setLoaded] = useState(false);

    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');

    const [roleData, setRoleData] = useState([]);
    const [roleTotal, setRoleTotal] = useState(0);

    const [isOpen, setIsOpen] = useState(false);
    const [permisRoles, setPermisRoles] = useState<any>([]);
    const [searchKey, setSearchKey] = useState("");

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
    let permissions = "User:Read,User:Edit,User:Delete";
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
                permissions: item.permissions,
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

    const handleAddNew = () => {

    }

    const toggle_edit = (item) => {
        setIsOpen(true);
        setPermisRoles([]);
    }
    const formatRoles = (key) => {
        let index = -1;
        if ((index = roles.indexOf(key)) >= 0) {
            permisRoles.splice(index, 1);
        } else {
            permisRoles.push(key);
        }
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
                                                    onClick={handleAddNew}
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
                <Offcanvas
                    direction="end"
                    scrollable={true}
                    isOpen={isOpen}
                    toggle={() => setIsOpen(false)}
                    style={{ width: 470 }}
                >
                    <OffcanvasHeader toggle={() => setIsOpen(false)}>
                        Edit Role
                    </OffcanvasHeader>
                    <hr></hr>
                    <Form
                        initialValues={{
                            roleName: '',
                        }}
                        onSubmit={(values) => alert(JSON.stringify(values))}
                    // validationSchema={yup.object().shape({
                    //     roleName: yup.string().required(),
                    // })}
                    >
                        <OffcanvasBody>
                            <Card>
                                <CardBody style={{ height: 400, overflowY: 'auto' }}>
                                    <Field name="roleName" type="text" readOnly={isOpen} label="Role Name" />
                                    <Label>Select Permissions</Label>
                                    <Collapse accordion={true}>
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
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light" onClick={() => {
                                    setIsOpen(false)
                                }}>Close</button>
                                <button type="submit" className="btn btn-primary" >Submit</button>
                            </div>
                        </OffcanvasBody>

                    </Form>

                </Offcanvas>
            </div>
        </Fragment>
    )
}
export default RoleList;