export function getMobileDate(date) {
  return `${date.split(" ")[0].split("").slice(0, 3).join("")}, ${date
    .split(" ")[1]
    .split("")
    .slice(0, 3)
    .join("")}, ${date.split(" ")[2].replace(",", "")}`;
}
