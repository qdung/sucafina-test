import "./App.css";
import { useProjects } from "./hooks";
import { Header, Loading, ModalProject, Project } from "./components";
import { PersistGate } from "redux-persist/integration/react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { configureStores } from "./store";
import MainPage from "./pages/MainPage";

const { persistor, store } = configureStores();

function App() {
  return (
    <div className="h-full w-full">
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <MainPage />
          </PersistGate>
        </Suspense>
      </Provider>
    </div>
  );
}

export default App;
