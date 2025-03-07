import { useAuthStore } from "../../../../hooks";

export const adminOptions = [
  { label: "User Management", href: "/dentaid/user-management" },
  { label: "Dashboard", href: "/dentaid/dashboard" },
  {
    label: "Appointments",
    href: "/dentaid/appointments",
  },
];

export const dentistOptions = () => {
  const { user } = useAuthStore();

  return [
    {
      label: "Appointments",
      href: "/dentaid/appointments",
    },
    { label: "Dashboard", href: "/dentaid/dashboard" },
    {
      label: "Schedule",
      href: `/dentaid/user/${user?.id}/schedule?account=true`,
    },
    { label: "Patient History", href: "/dentaid/user-management?account=true" },
  ];
};

export const patientOptions = [
  {
    label: "Appointments",
    href: "/dentaid/appointments",
  },
  { label: "Dashboard", href: "/dentaid/dashboard" },
];

export const defaultOptions = () => {
  const { user } = useAuthStore();
  return  [
    {
      label: "Account",
      href: `/dentaid/user/${user?.id}?usertype=${user.role}&account=true`,
    },
    { label: "Settings", href: "/" },
  ];
};
