import { usePagination, DOTS } from "./usePagination";

const Pagination = (props) => {
  const {
    onChangePage,
    currentPage,
    totalPage,
    totalCount,
    rowsPerPage,
    siblingCount = 3,
    showInfo = true,
  } = props;

  const pageSize = rowsPerPage;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onFirts = () => {
    if (currentPage != 1) {
      onChangePage(1);
    }
  };

  const onNext = () => {
    if (currentPage < totalPage) {
      onChangePage(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const onLast = () => {
    if (currentPage != totalPage) {
      onChangePage(totalPage);
    }
  };

  return (
    <div className="clearfix">
      {(showInfo && totalCount > 0) && (
        <div className="hint-text">
          Mostrando <b>{currentPage * rowsPerPage - rowsPerPage + 1}</b> -{" "}
          {currentPage * rowsPerPage - rowsPerPage + rowsPerPage} de{" "}
          <b>{totalCount}</b> Registros
        </div>
      )}
      {totalCount > 0 &&
        <ul className="pagination">
          <li
            onClick={() => onFirts()}
            className={currentPage == 1 ? "page-item disabled" : "page-item"}
          >
            <a className="page-link">
              <i
                className="bi bi-chevron-bar-left"
                data-toggle="tooltip"
                title="Primera Página"
              ></i>
            </a>
          </li>
          <li
            onClick={() => onPrevious()}
            className={currentPage == 1 ? "page-item disabled" : "page-item"}
          >
            <a className="page-link">
              <i
                className="bi bi-chevron-left"
                data-toggle="tooltip"
                title="Página Anterior"
              ></i>
            </a>
          </li>

          {paginationRange.map((page, i) => {
            if (page === DOTS) {
              return (
                <li key={i} className="page-item-dots">
                  &#8230;
                </li>
              );
            }
            return (
              <li
                onClick={() => onChangePage(page)}
                key={i}
                className={currentPage == page ? "page-item active" : "page-item"}
              >
                <a className="page-link">{page}</a>
              </li>
            );
          })}

          <li
            onClick={() => onNext()}
            className={
              currentPage == totalPage ? "page-item disabled" : "page-item"
            }
          >
            <a className="page-link">
              <i
                className="bi bi-chevron-compact-right"
                data-toggle="tooltip"
                title="Siguiente Página"
              ></i>
            </a>
          </li>
          <li
            onClick={() => onLast()}
            className={
              currentPage == totalPage ? "page-item disabled" : "page-item"
            }
          >
            <a className="page-link">
              <i
                className="bi bi-chevron-bar-right"
                data-toggle="tooltip"
                title="Última Página"
              ></i>
            </a>
          </li>
        </ul>
      }
    </div>
  );
};
export default Pagination;
