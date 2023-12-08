import LoginForm from "../components/auth/LoginForm";

const Login = () => (
  <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
    {/*Container*/}
    <div className="flex w-[1600px] mx-auto h-full">
      <LoginForm />
    </div>
  </div>
);

export default Login;
