import React, { Fragment, useState } from 'react';
import DataTable from 'react-data-table-component';
import '@styles/react/libs/tables/react-dataTable-component.scss';

import { ChevronDown } from 'react-feather';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

const Table = () => {
	const [currentPage, setCurrentPage] = useState(0);

	const [state, setState] = useState({
		bData: [
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
			{
				createdAt: '10-10-2022',
				nps: 71,
				promoters: 75,
				passive: 75,
				detractor: 75,
				total: 105,
			},
		],
	});

	const CustomPagination = () => (
		<ReactPaginate
			previousLabel={''}
			nextLabel={''}
			forcePage={currentPage}
			// onPageChange={(page) => handlePagination(page)}
			// pageCount={Math.ceil(totalRecord / state.pageSize.value) || 1}
			pageCount={Math.ceil(state.bData.length / 10) || 1}
			breakLabel={'...'}
			pageRangeDisplayed={3}
			marginPagesDisplayed={2}
			activeClassName="active"
			pageClassName="page-item"
			breakClassName="page-item"
			nextLinkClassName="page-link"
			pageLinkClassName="page-link"
			breakLinkClassName="page-link"
			previousLinkClassName="page-link"
			nextClassName="page-item next-item"
			previousClassName="page-item prev-item"
			containerClassName={
				'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
			}
		/>
	);
	const updatedColumns = [
		{
			name: 'DATE',

			sortable: true,
			// minWidth: '100px',
			minHeight: 'fit-content',
			cell: (row) => (
				<a
					style={{
						fontSize: '14.5px',

						color: 'black',
					}}
				>
					{row.createdAt && row.createdAt}
					{/* {row.createdAt &&
						moment(row.createdAt).format('DD-MM-YYYY')} */}
				</a>
			),
			selector: (row) => row.createdAt && row.createdAt,
		},
		{
			name: 'nps',

			sortable: true,
			minWidth: '20px',
			minHeight: 'fit-content',
			cell: (row) => (
				<a
					style={{
						fontSize: '14.5px',

						color: 'black',
					}}
				>
					{row.nps && row.nps}
				</a>
			),
			selector: (row) => row.nps && row.nps,
		},

		{
			name: 'total',

			sortable: true,
			minWidth: '20px',
			minHeight: 'fit-content',
			cell: (row) => (
				<a
					style={{
						fontSize: '14.5px',

						color: 'black',
					}}
				>
					{row.total && row.total}
				</a>
			),
			selector: (row) => row.total && row.total,
		},
	];
	return (
		<>
			<Fragment>
				<div className="react-dataTable">
					<DataTable
						// customStyles={customStyles}
						noHeader
						pagination
						paginationServer
						columns={updatedColumns}
						paginationPerPage={10}
						className="react-dataTable"
						sortIcon={<ChevronDown />}
						paginationDefaultPage={currentPage}
						paginationComponent={CustomPagination}
						responsive
						data={state.bData && state.bData}
					/>
				</div>
			</Fragment>
		</>
	);
};

export default Table;
