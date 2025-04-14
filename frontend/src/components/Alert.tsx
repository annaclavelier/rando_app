import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  visible: boolean;
  theme?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
}

const Alert = ({ children, visible, theme = "danger" }: Props) => {
  if (!visible) return null;

  return (
    <div className={`alert alert-${theme}`} role="alert">
      {children}
    </div>
  );
};

export default Alert;
