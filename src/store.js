import { writable } from "svelte/store";

export const links = writable([
  {
    name: "Accelerated Reader",
    href:
      "https://ukhosted51.renlearn.co.uk/2236651/Public/RPM/Login/Login.aspx?srcID=s",
    color: "#316295"
  },
  {
    name: "TT Rockstars",
    href: "https://play.ttrockstars.com/auth/school/student/29696",
    color: "#673ab7"
  },
  {
    name: "Espresso Coding",
    href: "https://online.espresso.co.uk/espresso/login/Authn/UserPassword",
    color: "#0e629e"
  },
  {
    name: "Nessy",
    href: "https://www.nessy.com/uk/",
    color: "#2f8f5e"
  },
  {
    name: "Seesaw",
    href: "https://app.seesaw.me/#/student/login",
    color: "#6bace5"
  },
  {
    name: "Sparx Maths",
    href: "https://www.sparxmaths.uk/",
    color: "#1d435e"
  },
  {
    name: "Scratch",
    href: "https://scratch.mit.edu",
    color: "#fcba03"
  }
]);
