// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import  { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
// import { store } from './app/store'
import { Provider } from 'react-redux'
import { store } from "./store.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Provider store={store}>
      <App />
      <Toaster />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
