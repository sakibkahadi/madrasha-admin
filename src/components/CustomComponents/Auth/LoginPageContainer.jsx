import LoginForm from "@/components/Forms/Auth/LoginForm";

const LoginPageContainer = () => {
  return (
    <div className="flex flex-col gap-12 bg-white  w-full min-h-screen  items-center justify-center">
      <p className="text-[#0A2A3C] text-[16px] sm:text-2xl leading-5.5 font-semibold text-center">
        Login
      </p>
       <div className="sm:w-112.5 ">
          <LoginForm />
        </div>
    </div>
  );
};
export default LoginPageContainer;
