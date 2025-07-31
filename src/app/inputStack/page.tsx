'use client'
import { useState, useRef, useEffect } from "react";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { ModeToggle } from '@/app/ui/mode-toggle'

// const configs = [
//   "absolute left-1/2 -translate-x-1/2 bottom-8 w-68 h-8 rounded-lg shadow-md bg-background z-10 transition-all duration-500",
//   "absolute left-1/2 -translate-x-1/2 bottom-4 w-74 h-10 rounded-xl shadow-lg bg-background z-20 transition-all duration-500",
//   "absolute left-1/2 -translate-x-1/2 bottom-0 w-80 h-12 rounded-2xl shadow-xl bg-background z-30 transition-all duration-500",
// ];
const configs = [
  "absolute left-1/2 -translate-x-1/2 bottom-8 w-68 h-8 rounded-lg shadow-md z-10 transition-all duration-500",
  "absolute left-1/2 -translate-x-1/2 bottom-4 w-74 h-10 rounded-xl shadow-lg z-20 transition-all duration-500",
  "absolute left-1/2 -translate-x-1/2 bottom-0 w-80 h-12 rounded-2xl shadow-xl z-30 transition-all duration-500",
];

const fields = [
  { label: "Name", placeholder: "Enter your name" },
  { label: "Age", placeholder: "Enter your age" },
  { label: "Gender", placeholder: "Enter your gender" },
];


export default function StackPage() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(["", "", ""]);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    inputRefs[step]?.current?.focus();
  }, [step]);

  const getInputClass = (i: number) => {
    if (step === 0) return configs[2];
    if (step === 1) return i === 0 ? configs[1] : configs[2];
    return configs[i];
  };

  const renderInputs = () => {
    return Array.from({ length: step + 1 }).map((_, i) => (
      <Input
        key={i}
        ref={inputRefs[i]}
        // placeholder={`input ${i + 1}`}
        placeholder={fields[i].placeholder}
        value={values[i]}
        onChange={e => {
          const newVals = [...values];
          newVals[i] = e.target.value;
          setValues(newVals);
        }}
        className={
          // getInputClass(i) +
          // " border border-border" + // thêm border
          // (i < step ? " pointer-events-none select-none" : "")

          getInputClass(i) +
          " border border-border bg-white dark:bg-neutral-900" +
          (i < step ? " pointer-events-none select-none" : "")
        }
        style={{ zIndex: 10 + i }}
        readOnly={i !== step}
        tabIndex={i < step ? -1 : 0}
      />
    ));
  };

  const handleNext = () => {
    if (step < 2 && values[step].trim() !== "") {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    alert("Submitted: " + JSON.stringify(values));
  };

  const isLastStep = step === 2;

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center space-y-2 p-4 h-screen">
        <div className="w-80">
          {/* <h1 className="text-xl font-bold mb-1 text-left transition-all duration-500"> {fields[step].label} */}
          <div className="flex items-center justify-between mb-2 ">
            <h1 className="text-xl font-bold transition-all duration-500"> {fields[step].label}</h1>
            <ModeToggle />
          </div>
          <div className="relative h-16 flex items-end">
            {renderInputs()}
          </div>

          <div className="flex justify-between w-80">
            <Button
              className="rounded-full mt-2 bg-secondary text-secondary-foreground"
              onClick={handleBack}
              disabled={step === 0}
              variant="secondary"
            >
              <ArrowLeft />
            </Button>
            {isLastStep ? (
              <Button
                className="rounded-full mt-2"
                onClick={handleSubmit}
                disabled={values[step].trim() === ""}
              >
                <Check /> Done
              </Button>
            ) : (
              <Button
                className="rounded-full mt-2"
                onClick={handleNext}
                disabled={values[step].trim() === ""}
              >
                Next <ArrowRight />
              </Button>
            )}
          </div>
        </div>
      </div>



    </div >
  );
}


// 'use client'
// import { useState, useRef, useEffect } from "react";
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'

// const configs = [
//   "absolute left-1/2 -translate-x-1/2 bottom-9 w-68 h-8 rounded-lg shadow-md bg-white z-10 transition-all duration-300",
//   "absolute left-1/2 -translate-x-1/2 bottom-4.5 w-74 h-10 rounded-xl shadow-lg bg-white z-20 transition-all duration-300",
//   "absolute left-1/2 -translate-x-1/2 bottom-0 w-80 h-12 rounded-2xl shadow-xl bg-white z-30 transition-all duration-300",
// ];

// const fields = [
//   { label: "Name", placeholder: "Enter your name" },
//   { label: "Age", placeholder: "Enter your age" },
//   { label: "Gender", placeholder: "Enter your gender" },
// ];

// export default function StackPage() {
//   const [step, setStep] = useState(0);
//   const [values, setValues] = useState(["", "", ""]);
//   const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

//   useEffect(() => {
//     inputRefs[step]?.current?.focus();
//   }, [step]);

//   const getInputClass = (i: number) => {
//     if (step === 0) return configs[2];
//     if (step === 1) return i === 0 ? configs[1] : configs[2];
//     return configs[i];
//   };

//   const renderInputs = () => {
//     return Array.from({ length: step + 1 }).map((_, i) => (
//       <div key={i} className="relative">
//         <label
//           className="absolute left-1/2 -translate-x-1/2 -top-6 text-sm font-medium text-gray-600 pointer-events-none select-none"
//           style={{ zIndex: 20 }}
//         >
//           {fields[i].label}
//         </label>
//         <Input
//           ref={inputRefs[i]}
//           placeholder={fields[i].placeholder}
//           value={values[i]}
//           onChange={e => {
//             const newVals = [...values];
//             newVals[i] = e.target.value;
//             setValues(newVals);
//           }}
//           className={
//             getInputClass(i) +
//             (i < step ? " pointer-events-none select-none" : "")
//           }
//           style={{ zIndex: 10 + i }}
//           readOnly={i !== step}
//           tabIndex={i < step ? -1 : 0}
//         />
//       </div>
//     ));
//   };

//   const handleNext = () => {
//     if (step < 2 && values[step].trim() !== "") {
//       setStep(step + 1);
//     }
//   };

//   const handleBack = () => {
//     if (step > 0) setStep(step - 1);
//   };

//   const handleSubmit = () => {
//     alert("Submitted: " + JSON.stringify(values));
//   };

//   const isLastStep = step === 2;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-gray-50">
//       <h1 className="text-xl font-bold mb-4">Stack Page</h1>
//       <div className="relative h-40 w-80 flex items-end">
//         {renderInputs()}
//       </div>
//       <div className="flex gap-2 mt-8">

//         {isLastStep ? (
//           <Button
//             className="w-40"
//             onClick={handleSubmit}
//             disabled={values[step].trim() === ""}
//           >
//             Submit
//           </Button>
//         ) : (
//           <Button
//             className="w-40"
//             onClick={handleNext}
//             disabled={values[step].trim() === ""}
//           >
//             Next
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }
