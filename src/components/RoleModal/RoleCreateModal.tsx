import { Modal, Card, CardTitle, CardBody, Table } from 'reactstrap';
import Collapse, { Panel } from 'rc-collapse';
import { Form, Field } from '@availity/form';
import * as yup from 'yup';
import '@availity/yup';
import { useTranslation } from 'react-i18next';
import { promiseDispatch } from 'utils/commonRedux';
import { useAppDispatch } from 'redux/hooks';
import { roleActions } from 'redux/reducer/role/role.actions';
import roleSaga from 'redux/reducer/role/role.saga';
const RoleCreateModal = ({
    permisRoles, toggleAdd, toggle_add,
    formatRoles, showSuccessAlert, showErrorAlert }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const handleValidSubmit = async (values) => {
        const { roleName } = values;
        const rolesStr = permisRoles.join(",");
        try {
            const res: any = await promiseDispatch(dispatch, {
                type: roleActions.CREATE_ROLE,
                roleName,
                permissions: rolesStr
            });
            console.log(res);
            if (res && res.data.code === 200) {
                showSuccessAlert(res.data.message);
            }else{
                showErrorAlert(res.data.message);
            }
        } catch (error: any) {
            showErrorAlert(error.message);
        }
        toggle_add(false);
    }

    const rolePermissionRowInModal = (label, roleName) => {
        return (
            <tr key={"_module_" + roleName}>
                <td style={{ width: 150 }}>{label}</td>
                <td>
                    <div className="form-check form-switch mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            value=""
                            id={"_read_" + roleName}
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
                            value=""
                            id={"_edit_" + roleName}
                            onChange={(e) => formatRoles(roleName + ":Edit")}
                        />
                        <label
                            className="form-control-label"
                            htmlFor={"_edit_" + roleName}
                        />
                    </div>
                </td>
                <td>
                    <div className="form-check form-switch mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            value=""
                            id={"_delete_" + roleName}
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
                            value=""
                            id={"_view_" + roleName}
                            onChange={(e) => formatRoles(roleName + ":View")}
                        />
                        <label className="form-check-label" htmlFor={"_view_" + roleName} />
                    </div>
                </td>
            </tr>
        );
    };

    return (
        <Modal
            isOpen={toggleAdd}
            toggle={toggle_add}
            size="lg"
        // centered={true}
        >
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">New Role</h5>
                <button type="button" className="btn-close"
                    onClick={toggle_add} aria-label="Close"></button>
            </div>
            <Form onSubmit={(values) => { handleValidSubmit(values) }}
                initialValues={{
                    roleName: '',

                }}
                validationSchema={yup.object().shape({
                    roleName: yup
                        .string()
                        .isRequired(true, 'Role name is Required.'),
                })}
            >
                <div className="modal-body">
                    <Card>
                        <CardBody>
                            <Field name="roleName" type="text" label="Role Name" />
                            <CardTitle>
                                <div>
                                    {/* {t("Admin_Select_Permissions")} */}
                                    Select Permissions
                                    &nbsp;&nbsp;
                                    {/* <FormText color="danger">{permissionError}</FormText> */}
                                </div>
                            </CardTitle>
                            <Collapse accordion={false}>
                                {/**{t("Admin_admin")}  */}
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
                                            {rolePermissionRowInModal(t("User"), "User")}
                                            {rolePermissionRowInModal(t("Role"), "Role")}
                                        </tbody>
                                    </Table>
                                </Panel>
                            </Collapse>
                        </CardBody>
                    </Card>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={toggle_add}>Close</button>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </div>
            </Form>
        </Modal>
    )
}
export default RoleCreateModal;