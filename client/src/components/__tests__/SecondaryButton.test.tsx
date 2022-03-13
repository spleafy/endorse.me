import { render, screen, cleanup } from "@testing-library/react";
import SecondaryButton from "../SecondaryButton";

afterEach(cleanup);

test("Secondary button renders", () => {
  render(<SecondaryButton>Test Button</SecondaryButton>);

  const button = screen.getByText(/Test Button/);

  expect(button).toBeInTheDocument();
});
