import { useContext } from "react";
import AppContext from "../../AppContext";
import { Table } from "reactstrap";

export default function DataTable({
  tableId,
  records,
  columns,
  onItemCheck,
  onEdit,
  onDelete,
}) {
  const ctx = useContext(AppContext);
  const t = ctx.state.languages.datatable;

  return (
    <Table size="sm" striped id={tableId} hover responsive>
      <thead>
        <tr>
          <th>
            <span className="custom-checkbox">
              <input type="checkbox" id="selectAll" disabled />
              <label htmlFor="selectAll"></label>
            </span>
          </th>
          {columns.map(({ id, title, accessor }, idx) => (
            <th scope="col" key={idx} >
              {title}
            </th>
          ))}
          {onEdit || onDelete ? <th style={{textAlign: "center"}}>{t.actions}</th> : ""}
        </tr>
      </thead>
      <tbody>       
        { records.length > 0 ? records.map((row, i) => (
          <tr key={i} className={row.selected ? "selected" : ""}>
            <td>
              <span className="custom-checkbox">
                <input
                  type="checkbox"
                  id={tableId + `_rowcheck_` + i}
                  checked={row.selected}
                  onChange={(event) => onItemCheck(event, row)}
                />
                <label htmlFor={`rowcheck` + i}></label>
              </span>
            </td>
            {columns.map((col, j) => (
              <td key={j}>{row[col.accessor]}</td>
            ))}
            {onEdit || onDelete ? (
              <td style={{textAlign: "center"}}>
                <a
                  className={row.selected ? "edit" : "disabled"}
                  onClick={onEdit}
                >
                  <i
                    className="bi bi-pencil-fill"
                    data-toggle="tooltip"
                    title={t.edit}
                  ></i>
                </a>
                <a
                  className={row.selected ? "delete" : "disabled"}
                  onClick={onDelete}
                >
                  <i
                    className="bi bi-trash-fill"
                    data-toggle="tooltip"
                    title={t.delete}
                  ></i>
                </a>
              </td>
            ) : (
              ""
            )}
          </tr>
        )) : <tr><td style={{textAlign: "center"}} colSpan={columns.length + 2}><b>{t.empty}</b></td></tr>}
      </tbody>
    </Table>
  );
}
