import React, { HTMLAttributes, DetailedHTMLProps } from 'react';
import ReactPaginate from 'react-paginate';

import './styles.scss';

export interface PaginationPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  handlePageClick: (selectedItem: {
    selected: number;
  }) => void,
  pageCount: number,
  forcePage: number,
}

const Pagination: React.FC<PaginationPropsType> = ({ handlePageClick, pageCount, forcePage }) => {
  return (
    pageCount === 1 ? <></> : <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        containerClassName="paginationCustom"
        activeClassName="activePagItem"
        pageClassName="paginationPageItem"
        pageLinkClassName="paginationPageLink"
        previousClassName="paginationPageItem"
        previousLinkClassName="paginationPageLink"
        nextClassName="paginationPageItem"
        nextLinkClassName="paginationPageLink"
        breakClassName="paginationPageItem"
        breakLinkClassName="paginationPageLink"
        forcePage={forcePage}
        // renderOnZeroPageCount={() => {}}
      />
  )
};

export default Pagination;