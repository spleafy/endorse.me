import { render, screen, cleanup } from "@testing-library/react";
import PrimaryButton from "../PrimaryButton";

afterEach(cleanup);

test("Primary button renders", () => {
  render(<PrimaryButton>Test Button</PrimaryButton>);

  const button = screen.getByText(/Test Button/);

  expect(button).toBeInTheDocument();
});
