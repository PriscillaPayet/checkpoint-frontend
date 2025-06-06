import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { PageLayout } from "./components/Layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { CountryDetailPage } from "./components/CountryDetailPage";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/country/:code" element={<CountryDetailPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
