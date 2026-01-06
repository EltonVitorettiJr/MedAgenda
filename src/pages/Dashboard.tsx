import type { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, Trash } from "lucide-react";
import { useEffect, useId, useState } from "react";
import {
  Controller,
  type Resolver,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import Agenda from "../components/Agenda";
import AppointmentTypeSelector from "../components/AppointmentTypeSelector";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Select from "../components/Select";
import { appointmentSchema } from "../schemas/appointmentSchema";
import {
  createAppointment,
  deleteAppointment,
  editAppointment,
  getAppointments,
} from "../services/appointment";
import { getPatients } from "../services/patients";
import {
  type AppointmentData,
  type AppointmentEvent,
  AppointmentType,
  HealthInsurance,
} from "../types/appointment";

interface OptionsProps {
  label: string;
  value: string;
  guardianName: string;
  phone: string;
}

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<AppointmentEvent[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingPatientId, setEditingPatientId] = useState<string | null>(null);

  const [patients, setPatients] = useState<OptionsProps[]>([]);

  const appontmentTypeId = useId();

  const healthInsuranceOptions = [
    { value: "UNIMED", label: "UNIMED" },
    { value: "PREVER", label: "PREVER" },
    { value: "PARTICULAR", label: "PARTICULAR" },
    { value: "CASSI", label: "CASSI" },
  ];

  const fetchEvents = async () => {
    try {
      const data = await getAppointments();

      setEvents(data);
    } catch (err) {
      console.error("Erro ao buscar agenda:", err);
    }
  };

  const fetchPatients = async () => {
    const data = await getPatients();

    const newPatients = data.map((patient) => ({
      value: patient.id,
      label: patient.fullName,
      guardianName: patient.guardianName,
      phone: patient.phone,
    }));

    setPatients(newPatients);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: explanation
  useEffect(() => {
    fetchEvents();
    fetchPatients();
  }, []);

  const handleDateClick = (arg: DateSelectArg) => {
    setEditingId(null);
    setEditingPatientId(null);
    reset();

    const dataInicio = arg.startStr.slice(0, 16);
    const dataFim = arg.endStr.slice(0, 16);

    setValue("start", dataInicio);
    setValue("end", dataFim);

    setIsModalOpen(true);
  };

  const handleEventClick = async (arg: EventClickArg) => {
    const { id, end, start, title, extendedProps } = arg.event;

    setEditingId(id);
    setEditingPatientId(extendedProps.patientId);

    setValue("patientName", title);
    setValue("notes", extendedProps.notes);
    setValue("phone", extendedProps.phone);
    setValue("guardianName", extendedProps.guardianName);
    setValue("healthInsurance", extendedProps.healthInsurance);
    setValue("appointmentType", extendedProps.appointmentType);

    if (start && end) {
      const offset = start.getTimezoneOffset() * 60000;
      const localStart = new Date(start.getTime() - offset)
        .toISOString()
        .slice(0, 16);
      const localEnd = new Date(end.getTime() - offset)
        .toISOString()
        .slice(0, 16);

      setValue("start", localStart);
      setValue("end", localEnd);
    }

    setIsModalOpen(true);
    await fetchEvents();
  };

  const handleDelete = async (): Promise<void> => {
    if (!editingId) return;
    if (confirm("Tem certeza que deseja excluir este agendamento?")) {
      try {
        await deleteAppointment(editingId);
        await fetchEvents();
        handleClose();
      } catch (err) {
        console.error(err);
        toast.error("Erro ao agendar. Tente novamente.");
      }
    }
  };

  const handleClose = () => {
    reset();
    setEditingId(null);
    setEditingPatientId(null);
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentData>({
    resolver: yupResolver(appointmentSchema) as Resolver<AppointmentData>,
    defaultValues: {
      appointmentType: AppointmentType.CONSULTA,
      healthInsurance: HealthInsurance.UNIMED,
    },
  });

  const onSubmit: SubmitHandler<AppointmentData> = async (data) => {
    try {
      const formatedData = {
        ...data,
        start: new Date(data.start).toISOString(),
        end: new Date(data.end).toISOString(),
      };

      if (editingId && editingPatientId) {
        await editAppointment(editingId, editingPatientId, formatedData);

        toast.success("Agendamento alterado com sucesso!");
      } else {
        await createAppointment(formatedData);

        toast.success("Agendamento realizado com sucesso!");
      }

      await fetchEvents();

      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao agendar. Tente novamente.");
    }
  };

  const selectedPatientVal = watch("patientName");

  useEffect(() => {
    if (selectedPatientVal && patients.length > 0) {
      const foundPatient = patients.find((p) => p.value === selectedPatientVal);

      if (foundPatient) {
        setValue("guardianName", foundPatient.guardianName || "");
        setValue("phone", foundPatient.phone || "");
      }
    }
  }, [selectedPatientVal, patients, setValue]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="container-app">
        <div className="flex items-center justify-between space-y-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">MedAgenda</h1>
            <h2 className="text-gray-500 text-sm">
              Gerencie os agendamentos do dia.
            </h2>
          </div>

          <Button
            className="bg-primary-500 hover:bg-primary-600 text-white
            px-4 py-2 rounded-md font-medium transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="mr-1" /> Novo Agendamento
          </Button>
        </div>

        <div className="w-237.5">
          <Agenda
            events={events}
            onSelectSlot={handleDateClick}
            onEventClick={handleEventClick}
          />
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          title={editingId ? "Editar Agendamento" : "Novo Agendamento"}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Select
                  label="Paciente"
                  {...register("patientName")}
                  options={patients}
                />
                <span className="text-red-500 min-h-5 text-sm">
                  {errors.patientName?.message}
                </span>
              </div>
              <div>
                <Select
                  label="Convênio"
                  {...register("healthInsurance")}
                  options={healthInsuranceOptions}
                />
                <span className="text-red-500 min-h-5 text-sm">
                  {errors.patientName?.message}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor={appontmentTypeId} className="text-[15px]">
                Tipo de Consulta
              </label>
              <Controller
                name="appointmentType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <AppointmentTypeSelector
                    id={appontmentTypeId}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <span className="text-red-500 text-xs">
                {errors.appointmentType?.message}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="Nome do Responsável"
                  {...register("guardianName")}
                  type="text"
                  placeholder="Mãe / Pai / Tio"
                  error={!!errors.guardianName}
                />
                <span className="text-red-500 min-h-5 text-sm">
                  {errors.guardianName?.message}
                </span>
              </div>

              <div>
                <Input
                  label="Telefone / WhatsApp"
                  {...register("phone")}
                  type="text"
                  placeholder="(99) 99999-9999"
                  error={!!errors.phone}
                />
                <span className="text-red-500 min-h-5 text-sm">
                  {errors.phone?.message}
                </span>
              </div>
            </div>

            <div className="mb-2 grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="Início"
                  {...register("start")}
                  type="datetime-local"
                  placeholder="__/__/___"
                  error={!!errors.start}
                />
                <span className="text-red-500 min-h-5 text-sm">
                  {errors.start?.message}
                </span>
              </div>

              <div>
                <Input
                  label="Término"
                  {...register("end")}
                  type="datetime-local"
                  placeholder="__/__/___"
                  error={!!errors.start}
                />
                <span className="text-red-500 min-h-5 text-sm">
                  {errors.start?.message}
                </span>
              </div>
            </div>

            <div>
              <Input
                label="Observação"
                {...register("notes")}
                type="text"
                placeholder="Ex: nome do remédio, etc..."
                fullWidth
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              {editingId ? (
                <Button
                  type="button"
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700
                  bg-transparent ring-2 ring-red-500 hover:bg-red-50"
                >
                  <Trash size={18} className="mr-2" /> Excluir
                </Button>
              ) : (
                <Button onClick={handleClose}>Cancelar</Button>
              )}

              <Button type="submit" isLoading={isSubmitting}>
                Agendar
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
