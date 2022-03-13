const colors = require("tailwindcss/colors");

delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];
delete colors["lightBlue"];
delete colors["gray"];
delete colors["zinc"];
delete colors["neutral"];
delete colors["stone"];

export const getColors = (color: string) => {
  if (color === "all") {
    return colors;
  } else {
    return colors[color];
  }
};
