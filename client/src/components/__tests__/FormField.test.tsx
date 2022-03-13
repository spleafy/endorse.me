import { useForm } from "react-hook-form";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import FormField from "../FormField";
import { validateRequired } from "../../utils/validators";

const TestComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  return (
    <form onSubmit={handleSubmit(jest.fn())}>
      <FormField
        name="test"
        placeholder="Test"
        label="Test"
        type="text"
        register={register}
        error={errors.test}
        validators={{
          required: (v: any) => validateRequired(v),
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

afterEach(cleanup);

describe("Form Field Tests", () => {
  test("Form Field Renders", () => {
    render(<TestComponent />);

    const input = screen.getByPlaceholderText(/Test/i);

    expect(input).toBeInTheDocument();
  });

  test("Form Field Has Error", async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("This field is required!")).toBeInTheDocument();
    });
  });

  test("Form Field Value Changes", async () => {
    render(<TestComponent />);

    const input = screen.getByPlaceholderText(/Test/i);

    fireEvent.change(input, { target: { value: "Test" } });

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test")).toBeInTheDocument();
    });
  });
});
