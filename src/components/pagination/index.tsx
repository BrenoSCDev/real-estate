import ReactPaginate from "react-paginate";
import { IPaginationProps } from "../interfaces";
import "./styles.css"

export const Pagination: React.FC<IPaginationProps> = ({totalPages, handlePageClick}) => {
  return (
    <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Próximo'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
  )
}
