import { AppointmentType } from "../types/appointment";

interface AppointmentTypeSelectorProps {
  value: AppointmentType;
  id?: string;
  onChange: (value: AppointmentType) => void;
}

const AppointmentTypeSelector = ({
  value,
  id,
  onChange,
}: AppointmentTypeSelectorProps) => {
  const AppointmentTypeOptions = [
    {
      value: AppointmentType.CONSULTA,
      label: "Consulta",
      activeClasses:
        "bg-primary-500 text-white font-medium hover:opacity-70 ring-primary-500",
      inactiveClasses:
        "bg-transparent ring-primary-500 text-primary-500 font-medium hover:bg-primary-500/10",
    },
    {
      value: AppointmentType.RETORNO,
      label: "Retorno",
      activeClasses:
        "bg-[#f5a723] text-white font-medium hover:opacity-70 ring-[#f5a723]",
      inactiveClasses:
        "bg-transparent ring-[#f5a723] text-[#f5a723] font-medium hover:bg-[#f5a723]/10",
    },
  ];

  return (
    <fieldset id={id} className="grid grid-cols-2 gap-4">
      {AppointmentTypeOptions.map((item) => {
        const isSelected = value === item.value;
        const buttonClass = isSelected
          ? item.activeClasses
          : item.inactiveClasses;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`flex items-center justify-center ring-2 rounded-md
            py-2 px-4 transition-all cursor-pointer
            ${buttonClass}
            `}
          >
            {item.label}
          </button>
        );
      })}
    </fieldset>
  );
};

export default AppointmentTypeSelector;
