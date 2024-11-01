import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStores } from "../store";
import MainPage from "./MainPage";

const { store } = configureStores();

describe("MainPage - Projects", () => {
  test("renders projects", () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
    expect(screen.getByText("Add Project")).toBeInTheDocument();
    expect(screen.getByText("Title: Pass coding test")).toBeInTheDocument();
  });
});
