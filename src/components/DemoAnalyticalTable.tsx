import {
  AnalyticalTable,
  Button,
  FlexBox,
  Input,
  Label,
  TextAlign,
} from '@ui5/webcomponents-react';
import { AxiosClient } from '../common/axios-common';
import { TMemberDto } from '../models/Member';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const DemoAnalyticalTable = () => {
  const [rowData, setRowData] = useState([] as TMemberDto[]);
  const handleButtonClick = () => {
    console.log('click');

    const response = AxiosClient.get<Array<TMemberDto>>('/members3');

    console.log('response', response);
    response.then((response) => {
      const tmpRow: TMemberDto[] = [];
      response.data.forEach((row: TMemberDto) => {
        tmpRow.push(row);
      });
      setRowData(tmpRow);
    });
  };

  useEffect(() => {
    console.log(rowData);
  }, [rowData]);

  return (
    <div>
      <FlexBox>
        <div style={{ marginRight: 'auto' }}>
          <Label
            id="myLabel"
            for="myInput"
            required
            showColon
            style={{ display: 'inline' }}
          >
            Member Name
          </Label>
          <Input
            id="myInput"
            aria-required={true}
            accessibleNameRef="myLabel"
          ></Input>
        </div>
        <Button style={{ alignSelf: 'flex-end' }} onClick={handleButtonClick}>
          Find
        </Button>
      </FlexBox>
      <AnalyticalTable
        columns={[
          {
            Header: 'Id',
            accessor: 'memberId',
            headerTooltip: 'Full Name',
          },
          {
            accessor: 'userName',
            // hAlign: TextAlign.End,
            Header: () => <span>User Name</span>,

            // Filter: ({ column }) => {
            //   return (
            //     <select
            //       onChange={(event) => column.setFilter(event.target.value)}
            //       style={{ width: '100%' }}
            //       value={column.filterValue ? column.filterValue : 'all'}
            //     >
            //       <option value="all">Show All</option>
            //       <option value="true">Can Drink</option>
            //       <option value="false">Can't Drink</option>
            //     </select>
            //   );
            // },
          },
          {
            Header: 'Age',
            accessor: 'age',
            className: 'superCustomClass',
            disableFilters: false,
            // disableGroupBy: true,
            disableSortBy: false,
            hAlign: TextAlign.End,
            filter: (rows, accessor, filterValue) => {
              if (filterValue === 'all') {
                return rows;
              }
              if (filterValue === 'true') {
                return rows.filter((row) => row.values.accessor >= 21);
              }
              return rows.filter((row) => row.values.accessor < 21);
            },
          },

          {
            Cell: (instance) => {
              const { cell, row, webComponentsReactProperties } = instance;
              // disable buttons if overlay is active to prevent focus
              const isOverlay = webComponentsReactProperties.showOverlay;
              // console.log('This is your row data', row.original);
              return (
                <FlexBox>
                  <Button icon="edit" disabled={isOverlay} />
                  <Button icon="delete" disabled={isOverlay} />
                </FlexBox>
              );
            },
            Header: 'Actions',
            accessor: '.',
            disableFilters: true,
            disableGroupBy: true,
            disableResizing: true,
            disableSortBy: true,
            id: 'actions',
            width: 100,
          },
        ]}
        data={rowData}
        filterable
        groupBy={[]}
        groupable
        header="Member List"
        infiniteScroll
        onColumnsReordered={() => {}}
        onGroup={() => {}}
        onLoadMore={() => {}}
        onRowClick={() => {}}
        onRowExpandChange={() => {}}
        onRowSelected={() => {}}
        onSort={() => {}}
        // onTableScroll={() => {}}
        rowHeight={44}
        selectedRowIds={{
          3: true,
        }}
        selectionMode="SingleSelect"
        withRowHighlight
      />
    </div>
  );
};
