import React, { Fragment, useState } from 'react';
import MetaTags from 'react-meta-tags';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import { Row, Col, Card, CardBody } from 'reactstrap';
import SearchInput from 'components/SearchInput/SearchInput';
import RemoteDataTable from 'components/RemoteDataTable/RemoteDataTable';
import PageLoadingView from 'components/PageLoadingView/PageLoadingView';
const RoleList = () => {
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [loaded, setLoaded] = useState(false);

    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');

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
    ];
    const onPageChange = (page, sizePerPage) => {
        setPage(page);
    }
    const onSizePerPageChange = (page, sizePerPage) => {
        setPage(1);
        setSizePerPage(page);
    }

    // if (!loaded) {
    //     return <PageLoadingView />;
    // }

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
                                            {/* <SearchInput
                                                searchKey={searchKey}
                                                handleSearch={handleSearch}
                                            /> */}
                                        </Col>
                                    </Row>
                                    <RemoteDataTable
                                        keyField="id"
                                        columns={columns}
                                        data={[]}
                                        totalSize={0}
                                        onPageChange={onPageChange}
                                        onSizePerPageChange={onSizePerPageChange}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </Fragment>
    )
}
export default RoleList;