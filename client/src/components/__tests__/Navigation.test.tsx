import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "../Navigation";

const TestComponent = () => {
  return (
    <Router>
      <Navigation />
    </Router>
  );
};

afterEach(cleanup);

describe("Navigation Tests", () => {
  test("Navigation Renders", () => {
    render(<TestComponent />);

    const header = screen.getByRole("banner");

    expect(header).toBeInTheDocument();
  });

  test("Navigation Redirects", async () => {
    render(<TestComponent />);

    const link = screen.getByText("Home");

    fireEvent.click(link);

    await waitFor(() => {
      const path = window.location.href.split("/");

      expect(path[path.length - 1]).toBe("home");
    });
  });
});
