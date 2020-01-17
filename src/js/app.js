import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI.form;

  form.addEventListener("submit", e => {
    e.preventDefault();
    onFormSubmit();
  });

  // EVENTS_

  // HANDLERS
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteDate(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // Gathering values from inputs
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const retrun_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    // CODE, CODE, yy-mm, yy-mm
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      retrun_date,
      currency
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }
});
