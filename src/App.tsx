import {
  Avatar,
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  Input,
  Label,
  MessageStrip,
  ShellBar,
  Table,
  TableCell,
  TableColumn,
  TableGrowingMode,
  TableRow,
  Text,
  ThemeProvider,
  Timeline,
  TimelineItem,
  Ui5CustomEvent,
} from '@ui5/webcomponents-react';
import React, { useState } from 'react';
import './App.css';
import '@ui5/webcomponents/dist/Assets';
import '@ui5/webcomponents-react/dist/Assets';
import '@ui5/webcomponents-fiori/dist/Assets'; // Only if using the @ui5/webcomponents-fiori package
import '@ui5/webcomponents-icons/dist/calendar';
import { DemoAnalyticalTable } from './components/DemoAnalyticalTable';
import { MemberTest } from './pages/MemberTest'; // Only if using the @ui5/webcomponents-icons package

type LiveTimelineProps = {
  filterText: string;
};

type LiveToolbarProps = {
  filterText: string;
  onFilterTextChange: (filterText: string) => void;
};

const LIVES = [
  {
    date: '1991/12/31',
    title: '시작함',
    venue: '가나다라마',
  },
  /* （以下、省略） */
];

const LiveTimeline: React.FC<LiveTimelineProps> = (props) => {
  const filteredLives = LIVES.filter((element) => {
    return (
      (element.date + element.title + element.venue)
        .toLocaleLowerCase()
        .indexOf(props.filterText.toLowerCase()) > -1
    );
  });

  if (filteredLives.length > 0) {
    return (
      <Timeline className="Lives-timeline">
        {filteredLives.map((element, index) => {
          return (
            <TimelineItem
              key={index}
              icon="calendar"
              titleText={element.title}
              subtitleText={element.date}
            >
              <div>{element.venue}</div>
            </TimelineItem>
          );
        })}
      </Timeline>
    );
  } else {
    return (
      <MessageStrip className="Lives-timeline">No data found.</MessageStrip>
    );
  }
};

const LiveToolbar: React.FC<LiveToolbarProps> = (props) => {
  const handleFilterTextChange = (e: any) => {
    props.onFilterTextChange(e.target.value);
  };

  return (
    <ShellBar
      primaryTitle="LGE Next Global ERP"
      logo={
        <img
          alt="SAPUI5 Logo"
          src="https://sap.github.io/ui5-webcomponents/assets/images/ui5-logo.png"
        />
      }
      profile={
        <Avatar>
          <img
            alt="Profile"
            src="https://avatars0.githubusercontent.com/u/25473342?s=400&u=b399ebf80c62121616c0435bed3f3c39b4fc9c9b&v=4"
          />
        </Avatar>
      }
      searchField={
        <Input
          value={props.filterText}
          placeholder="Please input ..."
          onInput={handleFilterTextChange}
        />
      }
    />
  );
};

const App = () => {
  const [filterText, setFilterText] = useState<string>('');
  const handleFilterTextChange = (filterText: string) => {
    setFilterText(filterText);
  };
  const createRows = (indexOffset: number) => {
    return new Array(25).fill('').map((_, index) => (
      <TableRow key={`${index + indexOffset}-row`}>
        <TableCell>
          <Label>{index + indexOffset}</Label>
        </TableCell>
        <TableCell>
          <Label>Placeholder</Label>
        </TableCell>
      </TableRow>
    ));
  };

  const [rows, setRows] = useState(createRows(1));

  const onLoadMore = () => {
    setRows((prev) => [...prev, ...createRows(prev.length + 1)]);
  };
  return (
    <ThemeProvider>
      <FlexBox
        style={{ width: '100%', height: '100%' }}
        direction={FlexBoxDirection.Column}
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Center}
      >
        <LiveToolbar
          filterText={filterText}
          onFilterTextChange={handleFilterTextChange}
        />
        <MemberTest></MemberTest>
      </FlexBox>
    </ThemeProvider>
  );
};

export default App;
