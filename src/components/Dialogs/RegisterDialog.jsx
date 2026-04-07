"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RegisterMadrashaForm from "../Forms/RegisterMadrashaForm";
import RegisterMadrashaAdminForm from "../Forms/RegisterMadrashaAdminForm";
import { useEffect, useState } from "react";

const RegisterDialog = ({ open, onOpenChange, uuid,setSelectedMadrasha }) => {
  const [activeStep, setActiveStep] = useState(1);
  const steps = [
    { id: 1, label: "Madrasha Info" },
    { id: 2, label: "Admin Info" },
  ];
  useEffect(() => {
    if (!open) {
      onOpenChange(false);
      setSelectedMadrasha(null);
      setActiveStep(1);
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-225 z-999 max-h-[80vh]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="mt-4 text-sm text-muted-foreground">
          <div className="mx-auto w-full ">
            {/* Stepper Container */}
            <div className="relative flex items-center justify-between">
              {/* Background line */}
              <div className="absolute left-0 right-0 top-2 h-px bg-[#828282]" />

              {/* Steps */}
              {steps?.map((step, index) => (
                <div
                  key={step.id}
                  className="relative z-10 flex flex-col items-center"
                >
                  {/* Circle */}
                  <div
                    className={`flex size-4.5 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${
                      activeStep >= step.id ? "bg-white" : "bg-[#828282]"
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    {activeStep >= step.id && (
                      <svg
                        className="size-3.5 text-[#696969]"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* Label */}
                  <span className={`mt-2 text-[13px] font-medium text-white`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {activeStep === 1 && (
            <RegisterMadrashaForm
              open={open}
              uuid={uuid}
              onNext={() => setActiveStep(2)}
            />
          )}
          {activeStep === 2 && (
            <RegisterMadrashaAdminForm onOpenChange={onOpenChange} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
