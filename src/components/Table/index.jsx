/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import { useTable, useSortBy, usePagination } from 'react-table';
import PropTypes from 'prop-types';

import { useFormatMessage } from 'hooks';
import classes from './Table.module.scss';

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageCount,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  const perPage = useFormatMessage('Table.perPage');

  return (
    <div className="table-wrapper">
      <table
        className="table is-striped has-mobile-cards is-hoverable"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className={classNames(
                    { [classes.isCurrentSort]: column.isSorted },
                    { [classes.isSortable]: column.canSort }
                  )}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="th-wrap">
                    {column.render('Header')}
                    {column.isSorted && (
                      <span className="icon is-small">
                        <i
                          className={classNames(
                            'mdi',
                            classes.tableIcon,
                            { 'mdi-arrow-down': column.isSortedDesc },
                            { 'mdi-arrow-up': !column.isSortedDesc }
                          )}
                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}> 
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={classNames(
                        { 'is-actions-cell': cell.column.id === 'actions' },
                        {
                          'has-no-head-mobile is-image-cell':
                            cell.column.id === 'logoUrl',
                        }
                      )}
                      data-label={cell.column.Header}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      Cell: PropTypes.func,
      sortType: PropTypes.string,
      id: PropTypes.string,
      disableSortBy: PropTypes.bool,
    })
  ).isRequired,
};

export default Table;
