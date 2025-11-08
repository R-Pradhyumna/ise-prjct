import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Spinner from "./pages/Spinner";

const AppLayout = lazy(() => import("./pages/AppLayout"));
const Home = lazy(() => import("./components/home/Home"));
const Project = lazy(() => import("./components/project/Project"));
const Announcements = lazy(() =>
  import("./components/announcements/Announcements")
);
const Prizes = lazy(() => import("./components/prizes/Prizes"));
const Formats = lazy(() => import("./components/formats/Formats"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true,
      refetchInterval: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />

              <Route path="project" element={<Project />} />

              <Route path="announcements" element={<Announcements />} />

              <Route path="prizes" element={<Prizes />} />

              <Route path="formats" element={<Formats />} />

              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
