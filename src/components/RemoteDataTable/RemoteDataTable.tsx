import PropTypes from 'prop-types';
// datatable related plugins
import paginationFactory, {
    PaginationProvider, PaginationListStandalone,
    PaginationTotalStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { Row, Col } from 'reactstrap'

import { useTranslation } from 'react-i18next';

const RemoteDataTable = (props) => {
    let {
        keyField,
        data,
        columns,
        totalSize,
        sortField,
        sortOrder,
        page,
        sizePerPage,
        onPageChange,
        onSizePerPageChange,
        totalCount,
    } = props;
    const { t } = useTranslation();
    const language = localStorage.getItem("I18N_LANGUAGE");
    const customTotal = ({ from, to, size }) => {
        return (
            <span className="react-bootstrap-table-pagination-total">
                {language == "en" ? <span>{t('Showing')} {from} {t("to")}  {to} {t("of")} {size} {t("Results")}</span>
                    : <span>{t('Showing')} {from} {t("to")}  {to} {t("of")}   {t("Results")} {size}</span>
                }
            </span>
        )
    }
    const sizePerPageOptionRenderer = ({ text, page, onSizePerPageChange }) => (
        <li
            key={text}
            role="presentation menuitem"
            className="dropdown-item"
            style={{ cursor: "pointer" }}
            tabIndex={-1}
            data-page={page}
            onMouseDown={(e) => {
                e.preventDefault();
                onSizePerPageChange(page);
            }}
        >
            {text}
        </li>
    );
    const handleTableChange = (
        type,
        { page, sizePerPage, sortField, sortOrder, data }
    ) => {
        // const currentIndex = (page - 1) * sizePerPage;
        // console.log(currentIndex);
        if (sortOrder === "asc") {
            data.sort((a, b) => {
                if (a[sortField] > b[sortField]) {
                    return 1;
                } else if (b[sortField] > a[sortField]) {
                    return -1;
                }
                return 0;
            });
        } else {
            data.sort((a, b) => {
                if (a[sortField] > b[sortField]) {
                    return -1;
                } else if (b[sortField] > a[sortField]) {
                    return 1;
                }
                return 0;
            });
        }
    };
    return (
        <div key={"remote_table_pageniation"}>
            <PaginationProvider
                pagination={paginationFactory({
                    custom: true,
                    sizePerPageOptionRenderer,
                    // showTotal: true,
                    paginationTotalRenderer: (from, to, size) => customTotal({ from, to, size }),
                    // paginationSize: 4,
                    // pageStartIndex: 1,
                    page,
                    sizePerPage,
                    totalSize,
                    onPageChange, // callback function when page was changing
                    onSizePerPageChange, // callback function when sizePerPage was changing
                })}
            >
                {({ paginationProps, paginationTableProps }) => (
                    <div key="remote_table" >
                        <BootstrapTable
                            remote
                            keyField={keyField}
                            data={data}
                            dataSize={totalCount}
                            columns={columns}
                            sort={{
                                dataField: sortField,
                                order: sortOrder,
                            }}
                            noDataIndication="Data not found"
                            onTableChange={handleTableChange}
                            {...paginationTableProps}
                        />
                        <Row className="align-items-md-center mt-30">
                            <Col className="inner-custom-pagination d-flex">
                                <div className="d-inline">
                                    <SizePerPageDropdownStandalone
                                        {...paginationProps}
                                    />
                                    <PaginationTotalStandalone
                                        {...paginationProps} />
                                </div>
                                <div className="text-md-right ms-auto">
                                    <PaginationListStandalone
                                        {...paginationProps}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}
            </PaginationProvider>
        </div>
    )
}
// RemoteDataTable.propTypes = {
//     keyField: PropTypes.string.isRequired,
//     columns: PropTypes.array.isRequired,
//     sortField: PropTypes.string.isRequired,
//     sortOrder: PropTypes.string.isRequired,
//     data: PropTypes.array.isRequired,
//     page: PropTypes.number.isRequired,
//     totalSize: PropTypes.number.isRequired,
//     sizePerPage: PropTypes.number.isRequired,
//     onTableChange: PropTypes.func.isRequired
// };
export default RemoteDataTable;