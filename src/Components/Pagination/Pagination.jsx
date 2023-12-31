import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ data, items, setItems }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const currentItems = data.slice(itemOffset, itemOffset + itemsPerPage);

    const pageCount = Math.ceil(data.length / itemsPerPage);


    useEffect(() => {
        setItemOffset(0);
    }, [itemsPerPage]);

    useEffect(() => {
        setItems(currentItems);
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    const updateSelect = (event) => {
        const newItemsPerPage = parseInt(event.target.value);
        setItemsPerPage(newItemsPerPage);
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-gray-600 px-4 py-1 sm:px-6 text-sm ">
            <div>
                <div className="text-sm dark:text-gray-300 flex gap-x-2 items-center">
                    <select className='bg-gray-50 border border-gray-300  text-gray-900 text-xs md:text-sm rounded-md dark:bg-gray-700 dark:text-white ' name="" id="" onChange={updateSelect} defaultValue={itemsPerPage}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                    <div className='flex justify-between gap-x-1'>
                        <p>شماره</p>
                        <span className="font-DanaMedium underline">{itemOffset + 1}</span>
                        <p>تا</p>
                        <span className="font-DanaMedium underline">{Math.min(itemOffset + itemsPerPage, data.length)}</span>
                        {(data.length) ? (
                            <>
                                <p>کل</p>
                                <span className='font-DanaMedium underline'>{data.length}</span>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>


                </div>
            </div>
            <div>
                <ReactPaginate
                    breakLabel="..."
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    nextLabel={<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>}
                    previousLabel={<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>}
                    containerClassName='inline-flex items-center -space-x-px mt-2'
                    previousLinkClassName='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-950 dark:hover:text-white'
                    nextLinkClassName='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-950 dark:hover:text-white'
                    pageLinkClassName='hidden md:block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-950 dark:hover:text-white'
                    activeLinkClassName='z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    disabledLinkClassName='hover:!text-gray-500 hover:bg-white hover:dark:!bg-gray-700 hover:dark:!text-gray-400 '
                />
            </div>
        </div>
    )
}
