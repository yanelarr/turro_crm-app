import { useContext } from "react";
import AppContext from "../../AppContext";
import {
    Row,
    Col
} from "reactstrap";

const TableTool = ({title, openForm, openFind, isFindMode, closFind}) => {
    const ctx = useContext(AppContext);
    const t = ctx.state.languages.users;

    return (
        <Row>
            <Col>
                <h2>{t.tableTitle} <b>{title}</b></h2>
            </Col>
            <Col>
                <a
                    className={!isFindMode ? "btn btn-danger" : "btn btn-info"}
                    onClick={!isFindMode ? openFind : closFind}
                    data-toggle="tooltip"
                    title={!isFindMode ? t.filterOn : t.filterOff}          
                >
                    <i className={!isFindMode ? "bi bi-funnel" : "bi bi-funnel-fill"}></i>{" "}
                    <span>{!isFindMode ? t.filterOn : t.filterOff}</span>
                </a>
                <a
                    className="btn btn-success"
                    onClick={openForm}
                    data-toggle="tooltip"
                    title={t.btnNew}
                >
                    <i className="bi bi-plus-circle-fill"></i>{" "}
                    <span>{t.btnNew}</span>
                </a>
            </Col>
        </Row>

    )
}
export default TableTool;