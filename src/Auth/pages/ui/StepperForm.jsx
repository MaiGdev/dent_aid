import {
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
} from "@mui/material";
import { Stack, styled } from "@mui/system";

export const StepperForm = ({ step = 1, setStep }) => {
  const steps = ["1", "2", "3"];

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      /*       backgroundColor: "#eaeaf0", // Color por defecto */
      borderRadius: 1,
      backgroundColor: theme.palette.grey[800],
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: "#018A53", // Color para pasos activos
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
      },
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor: ownerState.active ? "#01448A" : "#EFF0F6", // Cambiar color si el paso está activo
    zIndex: 1,
    color: ownerState.active ? "#fff" : "#6F6C90",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, className, icon } = props;

    return (
      <ColorlibStepIconRoot ownerState={{ active }} className={className}>
        {icon} {/* Mostramos el número en lugar de un icono */}
      </ColorlibStepIconRoot>
    );
  }
  return (
    <>
      <Stack sx={{ width: "46%"}}>
        <Stepper
    
          activeStep={step - 1}
          alternativeLabel
          connector={<ColorlibConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label} onClick={() => setStep(index + 1)}>
              <StepLabel
                StepIconComponent={(props) => (
                  <ColorlibStepIcon {...props} icon={label} />
                )}
              />
            </Step>
          ))}
        </Stepper>
      </Stack>
    </>
  );
};
