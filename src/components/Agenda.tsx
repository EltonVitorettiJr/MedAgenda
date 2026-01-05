import type {
  DateSelectArg,
  EventClickArg,
  EventSourceInput,
} from "@fullcalendar/core/index.js";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

// Interface para as props (vamos usar no futuro para passar os eventos do Supabase)
interface AgendaProps {
  events: EventSourceInput; // Por enquanto any, depois tipamos com a tabela do banco
  onSelectSlot: (arg: DateSelectArg) => void;
  onEventClick: (arg: EventClickArg) => void;
}

const Agenda = ({ events = [], onSelectSlot, onEventClick }: AgendaProps) => {
  return (
    <div className="h-[calc(100vh-180px)] bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek" // Começa vendo a SEMANA com horários
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale={ptBrLocale} // Tradução PT-BR
        slotMinTime="07:00:00" // O consultório abre as 7h
        slotMaxTime="22:00:00" // Fecha as 19h
        allDaySlot={false} // Remove a linha de "Dia Inteiro" (foco em horário marcado)
        slotDuration="00:30:00" // Consultas de 30 em 30 min
        expandRows={true} // Ocupa a altura toda disponível
        height="100%" // Altura total do container pai
        events={events} // Os dados vêm aqui
        // Estilização simples dos eventos
        eventClassNames="bg-primary-500 border-none text-white text-xs font-semibold rounded px-1"
        // Interações (vamos configurar depois)
        selectable={true}
        editable={false} // Permite arrastar (drag & drop)
        // Clique na data (vazio)
        dateClick={(arg) => console.log("Clicou na data:", arg.dateStr)}
        // Clique no evento (agendamento)
        eventClick={onEventClick}
        selectMirror={true}
        select={onSelectSlot}
      />
    </div>
  );
};

export default Agenda;
