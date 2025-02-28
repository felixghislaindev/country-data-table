import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
