import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "nprogress/nprogress.css";
import App from "src/App";
import { SidebarProvider } from "src/contexts/SidebarContext";
import * as serviceWorker from "src/serviceWorker";
import { createRoot } from "react-dom/client";
import { store } from "src/app/store";
import 'src/locales/i18n';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
  </Provider>
);

serviceWorker.unregister();
