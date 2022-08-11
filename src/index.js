import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createRoot } from 'react-dom/client';
import App from "./components/App";
import { Provider as BooksProvider } from './context/BooksContext';
import { Provider as OrdersProvider } from './context/OrdersContext';
import { Provider as UserManagementProvider } from './context/UserManagementContext';
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

import * as serviceWorker from "./serviceWorker";
import Themes from "./themes";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <LayoutProvider>
    <UserProvider>
      <UserManagementProvider >
        <BooksProvider>
          <OrdersProvider>
            <ThemeProvider theme={Themes.default}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </OrdersProvider>
        </BooksProvider>
      </UserManagementProvider>
    </UserProvider>
  </LayoutProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
