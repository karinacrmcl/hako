let yearStart = 1950;
let yearEnd = new Date().getFullYear();
export const yearOptions = [];

for (let i = yearStart; i < yearEnd; i++) {
  yearOptions.push({ label: i, value: i });
}
