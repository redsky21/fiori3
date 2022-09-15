import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import '@ui5/webcomponents-theme-base/dist/Assets';
// import '@ui5/webcomponents/dist/generated/json-imports/Themes';
// import '@ui5/webcomponents-fiori/dist/generated/json-imports/Themes';

import { Button, ShellBar, ShellBarItem } from '@ui5/webcomponents-react';

// import any = jasmine.any;

function App() {
  return (
    <div>
      <ShellBar
        primary-title="primary-title"
        logo={
          <img
            alt="SAP Logo"
            slot="logo"
            src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg"
          />
        }
      >
        <ShellBarItem icon="person-placeholder" />
      </ShellBar>
      <Button icon="employee">hello</Button>
    </div>
  );
}

export default App;
