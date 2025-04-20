import { useEffect, ReactNode } from "react";
import { Tooltip } from "bootstrap";

interface Props {
  text_tooltip: string;
  direction?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
}

const TooltipButton = ({ text_tooltip, direction = "top", children }: Props) => {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );

    return () => {
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, []);

  return (
    <button
      type="button"
      className="btn btn-link p-0 border-0"
      data-bs-toggle="tooltip"
      data-bs-placement={direction}
      title={text_tooltip}
    >
      {children}
    </button>
  );
};

export default TooltipButton;
