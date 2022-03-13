import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Form from "../Form";
import { useForm } from "react-hook-form";

interface TestComponentProps {
  submit?: any;
}

const TestComponent = ({ submit }: TestComponentProps) => {
  const { handleSubmit } = useForm();

  return (
    <Form submit={handleSubmit(submit)}>
      <input type="text" placeholder="input" />
      <button type="submit">Submit</button>
    </Form>
  );
};

afterEach(cleanup);

describe("Form Tests", () => {
  test("Form has rendered", async () => {
    render(<TestComponent />);

    const form = screen.getByTestId("form");

    expect(form).toBeInTheDocument();
  });

  test("Form has heading", () => {
    render(<TestComponent />);

    const heading = screen.getByText(/Test Heading/i);

    expect(heading).toBeInTheDocument();
  });

  test("Form has children rendered", () => {
    render(<TestComponent />);

    const input = screen.getByPlaceholderText(/input/i);

    expect(input).toBeInTheDocument();
  });

  test("Form Submits", async () => {
    const submitMock = jest.fn();

    render(<TestComponent submit={submitMock} />);

    const button = screen.getByText("Submit");

    fireEvent.click(button);

    await waitFor(() => expect(submitMock).toBeCalledTimes(1));
  });
});
