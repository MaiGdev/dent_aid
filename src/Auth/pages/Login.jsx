import { Box, Button, Grid2, Input, InputLabel } from "@mui/material";
import { Link } from "react-router";

export const LoginPage = () => {
  return (
    <>
      <Box sx={{ display: "flex",placeItems: "center", height: "100vh"}}>
        <Box className="flex justify-center items-center w-[950px] h-[656px] mx-auto loginDiv rounded-3xl ">
          <div className="flex justify-center items-center flex-col text-center bg-[#ECF5FF] h-[656px] w-full rounded-l-3xl ">
            <div className="w-[363.3px] flex justify-center items-center flex-col gap-[20px] ">
              <img src="/public/logo.png" alt="" />
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

          <div className="flex justify-center items-center flex-col rounded-r-3xl  h-[656px] w-full  gap-[38px]">
            <h2 className="text-5xl font-medium">Sign In</h2>

            <div className="iconsLogin flex justify-center items-center  text-center gap-[12px] ">
              <button type="button" aria-label="Sign in with Google">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  fill="none"
                  viewBox="0 0 41 41"
                >
                  <rect
                    width="38.614"
                    height="38.614"
                    x="1.292"
                    y="1.531"
                    stroke="#BDBDBD"
                    strokeWidth="1.679"
                    rx="19.307"
                  />
                  <path
                    fill="#4285F4"
                    d="M29.623 21.043c0-.615-.051-1.229-.158-1.835H20.78v3.475h4.974a4.167 4.167 0 0 1-1.839 2.741v2.258h2.97c1.737-1.568 2.738-3.891 2.738-6.64Z"
                  />
                  <path
                    fill="#34A853"
                    d="M20.778 29.863c2.485 0 4.578-.8 6.104-2.179l-2.97-2.258c-.826.55-1.89.863-3.134.863-2.402 0-4.44-1.587-5.17-3.724h-3.056v2.325c1.564 3.05 4.745 4.973 8.226 4.973Z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M15.612 22.564a5.294 5.294 0 0 1 0-3.455v-2.323h-3.058a8.868 8.868 0 0 0 0 8.106l3.058-2.328Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M20.778 15.387a5.06 5.06 0 0 1 3.532 1.353l2.63-2.575a8.966 8.966 0 0 0-6.162-2.351c-3.48 0-6.664 1.924-8.226 4.972l3.058 2.326c.729-2.14 2.766-3.725 5.168-3.725Z"
                  />
                </svg>
              </button>
              <button className="btn" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  fill="none"
                  viewBox="0 0 41 41"
                >
                  <rect
                    width="38.614"
                    height="38.614"
                    x="1.085"
                    y="1.531"
                    stroke="#BDBDBD"
                    strokeWidth="1.679"
                    rx="19.307"
                  />
                  <path
                    fill="#000"
                    d="M24.693 21.364c-.02-2.126 1.734-3.146 1.812-3.196-.986-1.444-2.522-1.641-3.07-1.664-1.306-.133-2.55.77-3.214.77-.662 0-1.686-.75-2.77-.73-1.424.02-2.738.827-3.472 2.103-1.48 2.569-.379 6.376 1.064 8.459.705 1.02 1.546 2.166 2.65 2.124 1.063-.042 1.465-.688 2.75-.688s1.647.689 2.772.668c1.144-.022 1.868-1.04 2.569-2.063.81-1.183 1.143-2.33 1.163-2.388-.025-.011-2.231-.856-2.253-3.396v.001Zm-2.114-6.24c.586-.71.982-1.697.873-2.68-.843.033-1.867.562-2.472 1.271-.543.63-1.019 1.633-.891 2.598.942.074 1.904-.479 2.49-1.188Z"
                  />
                </svg>
              </button>
              <button className="btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  fill="none"
                  viewBox="0 0 41 41"
                >
                  <rect
                    width="38.614"
                    height="38.614"
                    x=".877"
                    y="1.531"
                    stroke="#BDBDBD"
                    strokeWidth="1.679"
                    rx="19.307"
                  />
                  <path
                    fill="#3B5998"
                    fillRule="evenodd"
                    d="M28.998 20.891A8.816 8.816 0 1 0 18.805 29.6v-6.16h-2.239v-2.549h2.24V18.95c0-2.209 1.316-3.43 3.329-3.43.964 0 1.974.172 1.974.172v2.17h-1.113c-1.094 0-1.436.68-1.436 1.377v1.653h2.444l-.39 2.55H21.56v6.16a8.818 8.818 0 0 0 7.438-8.71Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="w-[338.58px] max-w-md px-4 text-left gap-5 flex flex-col">
              <Box>
                <Grid2 container direction="column" spacing={2}>
                  <Grid2 item xs={12} sm={6}>
                    <InputLabel
                      htmlFor="email-input"
                      sx={{
                        fontSize: "0.875rem", // 14px
                        fontWeight: "600",
                        color: "#979797",
                        position: "static",
                      }}
                    >
                      Email
                    </InputLabel>
                    <Input
                      id="email-input"
                      placeholder="Email"
                      type="email"
                      variant="filled"
                      fullWidth
                      sx={{
                        fontSize: "0.875rem", // 14px

                        borderRadius: ".5rem",
                        border: "1px solid #cccccc",
                        padding: "0.5rem 1rem",
                        marginTop: "0.5rem",
                        position: "static",
                        "&:focus": {
                          borderColor: "#2A3E54",
                        },
                      }}
                    />
                  </Grid2>
                  <Grid2 item xs={12} sm={6}>
                    <InputLabel
                      htmlFor="email-input"
                      sx={{
                        fontSize: "0.875rem", // 14px
                        fontWeight: "600",
                        color: "#979797",
                        position: "static",
                      }}
                    >
                      Password
                    </InputLabel>
                    <Input
                      id="password-input"
                      placeholder="********"
                      type="text"
                      variant="filled"
                      fullWidth
                      sx={{
                        fontSize: "0.875rem", // 14px

                        borderRadius: ".5rem",
                        border: "1px solid #cccccc",
                        padding: "0.5rem 1rem",
                        marginTop: "0.5rem",
                        position: "static",
                        "&:focus": {
                          borderColor: "#2A3E54",
                        },
                      }}
                    />
                  </Grid2>
                  <Grid2
                    container
                    direction="row"
                    justifyContent="end"
                    size={12}
                  >
                    <Link
                      sx={{
                        fontSize: "0.8rem", // 14px
                        fontWeight: "500",
                        color: "#979797",
                        position: "static",
                        textAlign: "right",
                      }}
                    >
                      Can't access your account?
                    </Link>
                  </Grid2>

                  <Button
                    sx={{
                      backgroundColor: "#2A3E54",
                      color: "white",
                      fontSize: "0.875rem", // 14px
                      fontWeight: "600",
                      borderRadius: "1.5rem",
                      boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.1)",
                      "&:hover": {
                        backgroundColor: "#4A5D72", // Cambio en el hover
                      },
                      "&:focus": {
                        outline: "1px solid white",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Grid2>
              </Box>

              <Grid2 container direction="row" justifyContent="start" size={12}>
                <Link
                  to={"/auth/register"}
                  sx={{
                    fontSize: "0.8rem", // 14px
                    fontWeight: "500",
                    color: "#979797",
                    position: "static",
                    textAlign: "left",
                  }}
                >
                  No account yet? Sign Up
                </Link>
              </Grid2>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};
