import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { App as AntApp } from 'antd';
// import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import { themeConfig } from './theme/theme';
import 'antd/dist/reset.css';
import './theme/global.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ConfigProvider theme={themeConfig}>
            <AntApp>
              <App />
            </AntApp>
          </ConfigProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
