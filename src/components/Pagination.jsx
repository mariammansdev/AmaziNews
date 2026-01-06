import React from 'react'

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };
    const disablePrev = currentPage === 1;
    const disableNext = currentPage === totalPages;
  return (
      <div className="mt-10 flex justify-end">
            <div className="join">
                <button
                    className={`btn btn-xs sm:btn-md join-item ${disablePrev ? 'btn-disabled' : ''}`}
                    onClick={() => {
                        const pageNo = currentPage === 1 ? 1 : currentPage - 1;
                        handlePrev(pageNo);
                    }}
                >
                    Prev
                </button>

                <button className='join-item btn btn-disabled'>
                    {currentPage} of {totalPages}
                </button>

                <button
                    className={`btn btn-xs sm:btn-md join-item ${disableNext ? 'btn-disabled' : ''}`}
                    onClick={() => {
                        const pageNo = currentPage === totalPages ? totalPages : currentPage + 1;
                        handleNext(pageNo);
                    }}
                >
                    Next
                </button>
            </div>
        </div>
  )
}

export default Pagination