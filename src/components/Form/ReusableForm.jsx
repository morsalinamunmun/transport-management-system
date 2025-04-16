import React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiMiniCalendarDateRange } from "react-icons/hi2";

const ReusableForm = ({ children, onSubmit }) => {
  const { handleSubmit, control } = useForm();

  const enhanceChildren = (children) =>
    React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      // Recursively enhance nested children
      if (child.props?.children) {
        return React.cloneElement(child, {
          children: enhanceChildren(child.props.children),
        });
      }

      // Handle datepicker inputs
      if (
        child.props?.name &&
        child.props.type === "text" &&
        child.props["data-datepicker"]
      ) {
        return (
          <Controller
            control={control}
            name={child.props.name}
            defaultValue={null}
            render={({ field }) => {
              const dateRef = React.createRef();

              return (
                <div className="relative">
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    placeholderText={child.props.placeholder}
                    dateFormat="dd-MM-yyyy"
                    className={`${child.props.className || ""}`}
                    wrapperClassName="w-full"
                    ref={dateRef}
                    onKeyDown={(e) => e.preventDefault()} // prevent manual typing
                  />
                  <span
                    onClick={() => dateRef.current?.setOpen(true)}
                    className="absolute top-1 right-0 text-xl text-white bg-primary px-4 py-[9px] rounded-r-md cursor-pointer"
                  >
                    <HiMiniCalendarDateRange />
                  </span>
                </div>
              );
            }}
          />
        );
      }
      // Handle standard form fields
      if (
        child.props?.name &&
        (child.type === "input" ||
          child.type === "select" ||
          child.type === "textarea")
      ) {
        return (
          <Controller
            name={child.props.name}
            control={control}
            defaultValue={child.props.defaultValue || ""}
            render={({ field }) =>
              React.cloneElement(child, {
                ...field,
                checked:
                  child.props.type === "checkbox" ? field.value : undefined,
              })
            }
          />
        );
      }

      return child;
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {enhanceChildren(children)}

      <div className="flex justify-center mt-10">
        <button
          type="submit"
          className="font-semibold uppercase text-sm bg-primary text-white px-16 py-2 rounded hover:bg-secondary cursor-pointer transition-all duration-700"
        >
          সাবমিট
        </button>
      </div>
    </form>
  );
};

export default ReusableForm;
