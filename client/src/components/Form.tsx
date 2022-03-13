// Components

interface FormProps {
  children: any;
  submit: any;
}

const Form = ({ children, submit }: FormProps) => {
  return (
    <form className="select-none" onSubmit={submit} data-testid="form">
      {children}
    </form>
  );
};

export default Form;
