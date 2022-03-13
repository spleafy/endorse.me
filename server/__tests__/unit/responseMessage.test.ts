import ResponseMessage from "../../models/responseMessage";

test("Response message returns proper values", () => {
  const response = new ResponseMessage(200, { test: true }, { error: false });

  expect(response).toEqual({
    status: 200,
    data: { test: true },
    error: { error: false },
  });
});
