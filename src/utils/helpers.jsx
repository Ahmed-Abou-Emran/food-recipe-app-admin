export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "egp" }).format(
    value
  );

export const formatDate = (date) =>
  Intl.DateTimeFormat("en-EG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Australia/Sydney",
  }).format(Date.parse(date));

export const range = (start, end, step = 1) => {
  let output = [];

  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
};
