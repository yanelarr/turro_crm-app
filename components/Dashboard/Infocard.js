import { useContext } from "react";
import AppContext from "../../AppContext";
import Menucard from "./menucard";

export default function Infocard({name, title, clsIcon, value, percent, status, moment}) {
    const ctx = useContext(AppContext);
    const t = ctx.state.languages.menucard;
  
    return(
        <div className="col-xxl-4 col-md-6">
            <div className={name == "customers" ? "card info-card customers-card" : name == "revenue" ? "card info-card revenue-card" : "card info-card sales-card"}>
                <Menucard title={t.title} items={[{text: t.Today}, {text: t.thisMonth}, {text: t.thisYear}]} />
                <div className="card-body">
                    <h5 className="card-title">{title} <span>| {moment}</span></h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className={clsIcon}></i>
                        </div>
                        <div className="ps-3">
                            <h6>{value}</h6>
                            <span className="text-success small pt-1 fw-bold">{percent}</span> <span className="text-muted small pt-2 ps-1">{status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}