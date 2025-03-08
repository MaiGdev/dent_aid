import { Box, Button, Grid2 } from "@mui/material";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router";
import { FormProvider } from "../../context/FormProvider";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../../dentaid/icons";
import { LoginForm } from "./components/LoginForm";

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    if (!document.startViewTransition) {
      navigate("/auth/register");
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => navigate("/auth/register"));
    });
  };

  return (
    <FormProvider>
      <Box className=" lg:flex lg:justify-center lg:items-center h-svh lg:h-screen">
        <Box className="h-svh flex justify-center items-center lg:w-[950px] lg:h-[656px] lg:mx-auto  lg:rounded-3xl m-auto px-4 md:p-0 loginDiv">
          <div className="hidden lg:flex justify-center items-center flex-col text-center bg-[#ECF5FF] h-[656px] w-full rounded-l-3xl ">
            <div className=" w-[363.3px] flex justify-center items-center flex-col gap-[20px] ">
              <img src="/logo.png" alt="" />
              <h2 className="text-[#1E3A8A] font-semibold text-[18.9px] px-[10px]">
                Your Trusted Partner for Online Dental Care
              </h2>
              <p className="italic font-light text-[#6B7280] text-[13px]">
                Easily schedule, manage, and track your dental appointments from
                anywhere. Our secure and user-friendly platform connects you
                with professional dentists, ensuring quality care at your
                convenience.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col rounded-2xl lg:rounded-r-3xl  lg:h-[656px] w-full sm:w-[424px] lg:w-full md:gap-[38px] border border-[#BCBCBC] lg:border-none py-8 m-auto gap-7">
            <h2 className="text-4xl ld:text-5xl font-medium">Sign In</h2>

            <div className="iconsLogin flex justify-center items-center  text-center gap-[12px] ">
              <button type="button" aria-label="Sign in with Google">
                <GoogleIcon />
              </button>
              <button className="btn" type="button">
                <AppleIcon />
              </button>
              <button className="btn">
                <FacebookIcon />
              </button>
            </div>

            <div className="w-full  lg:w-[338.58px] px-4 text-left gap-5 flex flex-col">
              <LoginForm />

              <Grid2 container direction="row" justifyContent="start" size={12}>
                <Button
                  onClick={handleSignUp}
                  className="!text-[0.75rem] !text-[#979797]"
                >
                  No account yet? Sign Up
                </Button>
              </Grid2>
            </div>
          </div>
        </Box>
      </Box>
    </FormProvider>
  );
};
