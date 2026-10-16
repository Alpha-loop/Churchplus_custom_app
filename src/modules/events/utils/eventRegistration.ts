// Registration is defined by the event's `checkInAttendances`:
// each entry is something a person can register for (a session /
// date, optionally tied to a group or a fee). No entries = nothing
// to register for. The event-level isRegistrationEnabled flag is
// NOT what decides this.
export type RegistrationSession = {
  id: string;
  name: string;
  date: string | null;
  groupName: string | null;
  amount: number | null;
};

export const getRegistrationSessions = (
  event: any
): RegistrationSession[] =>
  (Array.isArray(event?.checkInAttendances)
    ? event.checkInAttendances
    : []
  )
    .filter((item: any) => item?.id)
    .map((item: any) => ({
      id: String(item.id),
      name: item.name || item.eventName || event?.name || "",
      date: item.date ?? null,
      groupName: item.groupName || null,
      amount:
        typeof item.registrationAmount === "number" &&
        item.registrationAmount > 0
          ? item.registrationAmount
          : null,
    }));

export const getRegistrationError = (
  error: any
): string => {
  const data = error?.response?.data;

  if (
    typeof data?.message === "string" &&
    data.message.trim()
  ) {
    return data.message.trim();
  }

  if (!error?.response) {
    return "Couldn't reach the server. Check your internet connection and try again.";
  }

  const status = error.response.status;

  if (status === 404) {
    return "Registration isn't available for this event right now. Please contact the church office.";
  }

  if (status === 400 || status === 422) {
    return "The registration details weren't accepted. Please check them and try again.";
  }

  if (status >= 500) {
    return "Something went wrong on our side. Please try again in a moment.";
  }

  return "Couldn't complete your registration. Please try again.";
};
