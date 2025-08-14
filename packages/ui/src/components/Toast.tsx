import { Fragment, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  XCircleIcon 
} from "@heroicons/react/24/solid";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const toastVariants = cva(
  "max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-l-4 border-gray-400",
        success: "border-l-4 border-success-500",
        error: "border-l-4 border-error-500",
        warning: "border-l-4 border-warning-500",
        info: "border-l-4 border-primary-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id?: string;
  title?: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function Toast({ 
  variant, 
  title, 
  description, 
  duration = 5000, 
  onClose,
  action 
}: ToastProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => onClose?.(), 150);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircleIcon className="h-6 w-6 text-success-400" />;
      case "error":
        return <XCircleIcon className="h-6 w-6 text-error-400" />;
      case "warning":
        return <ExclamationTriangleIcon className="h-6 w-6 text-warning-400" />;
      case "info":
        return <InformationCircleIcon className="h-6 w-6 text-primary-400" />;
      default:
        return <InformationCircleIcon className="h-6 w-6 text-gray-400" />;
    }
  };

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose?.(), 150);
  };

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={cn(toastVariants({ variant }))}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">{getIcon()}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              {title && (
                <p className="text-sm font-medium text-gray-900">{title}</p>
              )}
              {description && (
                <p className={cn(
                  "text-sm text-gray-500",
                  title ? "mt-1" : ""
                )}>
                  {description}
                </p>
              )}
              {action && (
                <div className="mt-3 flex space-x-7">
                  <button
                    type="button"
                    className="rounded-md bg-white text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    onClick={action.onClick}
                  >
                    {action.label}
                  </button>
                </div>
              )}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                onClick={handleClose}
              >
                <span className="sr-only">Fechar</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

// Toast Container Component
export interface ToastContainerProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  children: React.ReactNode;
}

export function ToastContainer({ position = "top-right", children }: ToastContainerProps) {
  const positionClasses = {
    "top-right": "fixed top-0 right-0 z-50 p-6 space-y-4",
    "top-left": "fixed top-0 left-0 z-50 p-6 space-y-4",
    "bottom-right": "fixed bottom-0 right-0 z-50 p-6 space-y-4",
    "bottom-left": "fixed bottom-0 left-0 z-50 p-6 space-y-4",
    "top-center": "fixed top-0 left-1/2 -translate-x-1/2 z-50 p-6 space-y-4",
    "bottom-center": "fixed bottom-0 left-1/2 -translate-x-1/2 z-50 p-6 space-y-4",
  };

  return (
    <div className={positionClasses[position]}>
      {children}
    </div>
  );
}