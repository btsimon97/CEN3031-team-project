import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

import "./index.css";
import App from "./App";

ReactDOM.render(
     <GlobalProvider>
          <BrowserRouter>
               <App />
          </BrowserRouter>
     </GlobalProvider>,
     document.getElementById("root")
);
