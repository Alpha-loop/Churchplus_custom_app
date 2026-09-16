import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const dateUtils = {
  monthDayTime(
    date?: string | Date
  ) {
    if (!date) return "";

    const isToday =
      dayjs(date).isSame(
        dayjs(),
        "day"
      );

    return `${
      isToday
        ? "Today"
        : dayjs(date).format(
            "MMM DD"
          )
    }, ${dayjs(date).format(
      "HH:mm"
    )}`;
  },

  monthDayYear(
    date?: string | Date
  ) {
    if (!date) return "";

    return dayjs(date).format(
      "MMM DD, YYYY"
    );
  },

  normalDate(
    date?: string | Date
  ) {
    if (!date) return "";

    return dayjs(date).format(
      "YYYY-MM-DD"
    );
  },

  relativeDate(
    date?: string | Date
  ) {
    if (!date) return "";

    return dayjs(date).fromNow();
  },

  getISOStringGMT(
    date?: string | Date
  ) {
    if (!date) return "";

    return dayjs(date).format(
      "YYYY-MM-DDTHH:mm:ss"
    );
  },

  getTime(
    date?: string | Date
  ) {
    if (!date) return "";

    return dayjs(date).format(
      "HH:mm"
    );
  },
};