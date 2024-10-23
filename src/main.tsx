import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";

// Wir instantiieren einen neuen QueryClient. Hier haben wir die Moeglichkeit, globale Einstellungen vorzunehmen.
// (Muessen wir aber nicht)
const queryClient = new QueryClient()
// const queryClient = new QueryClient({defaultOptions: {queries: {refetchOnWindowFocus: false}}})

// React Query braucht, vergleichbar mit React Router, einen Provider der um die gesamte App gewickelt wird
// (Das kann in index.tsx oder App.tsx passieren, sollte aber moeglichst weit "oben" sein)
// Dieser Provider wird genutzt um Requests zu speichern und zu deduplizieren, aber auch um globale Einstellungen vorzunehmen

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);