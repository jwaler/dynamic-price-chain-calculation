// calculated var
let totalCtn;
let totalAm;
let priceCtnExw;
let pricePcExw;
let priceCtnFob;
let pricePcFob;
let costIns;
let priceCtnCfr;
let pricePcCfr;
let priceCtnCif;
let costLogG;
let pricePcCif;
let applyCustoms;
let applyVAT;
let PVinter;
let logCostPerc;
let RtLogCost;
let WsLogCost;
let TransLogCost;
let LogRatio;
let srp;
let d_priceCtnExw;
let d_pricePcExw;
let d_totalCtn;
let d_totalAm;
let d_priceCtnFob;
let d_pricePcFob;
let d_priceCtnCfr;
let d_pricePcCfr;
let d_priceCtnCif;
let d_costLogG;
let d_pricePcCif;
let d_PVinter;
let display_srp;
let showCT;
let showVAT;
let product_name;
let country_name;
let pformat;
let pcode;
let simulation = false;
let labeling = 0;

let bycase = " / case";
let bypc = " / pc";
let unitpc = " pc";
let euro = " €";
let percentage = " %";

let tw = {
  countryname: "Taiwan",
  fob: 960,
  cif: 3740,
  ctax: 0.1,
  vat: 0.05,
  currency: 45,
  symbol: "TWD",
  transportcostpallet: 12000,
};
let hk = {
  countryname: "Hong Kong",
  fob: 960,
  cif: 3740,
  ctax: 0,
  vat: 0,
  currency: 9.5,
  symbol: "HKD",
  transportcostpallet: 3750,
};
let kr = {
  countryname: "South Korea",
  fob: 960,
  cif: 3240,
  ctax: 0.08,
  vat: 0.1,
  currency: 1.3,
  symbol: "WON",
  transportcostpallet: 400, // (k)
};
let jp = {
  countryname: "Japan",
  fob: 960,
  cif: 3740,
  ctax: 0.34,
  vat: 0.08,
  currency: 126,
  symbol: "YEN",
  transportcostpallet: 75000,
};
let sg = {
  countryname: "Singapore",
  fob: 960,
  cif: 3740,
  ctax: 0,
  vat: 0.07,
  currency: 1.7,
  symbol: "SGD",
  transportcostpallet: 750,
};
let au = {
  countryname: "Australia",
  fob: 960,
  cif: 3740,
  ctax: 0.05,
  vat: 0.1,
  currency: 1.56,
  symbol: "$AUD",
  transportcostpallet: 600,
};
let nz = {
  countryname: "New Zealand",
  fob: 960,
  cif: 3740,
  ctax: 0.2,
  vat: 0.1,
  currency: 126,
  symbol: "$ NZ",
  transportcostpallet: 600,
};
let cn = {
  countryname: "China",
  fob: 960,
  cif: 3740,
  ctax: 0.2,
  vat: 0.05,
  currency: 7,
  symbol: "RMB",
  transportcostpallet: 3500,
};
let ph = {
  countryname: "Philippines",
  fob: 960,
  cif: 3740,
  ctax: 0.2,
  vat: 0.05,
  currency: 58,
  symbol: "Pesos",
  transportcostpallet: 29000,
};
let my = {
  countryname: "Malaysia",
  fob: 960,
  cif: 3740,
  ctax: 0.2,
  vat: 0.05,
  currency: 4.91,
  symbol: "MYR",
  transportcostpallet: 1473,
};
let mdd = {
  countryname: "MDD",
  fob: 1960,
  cif: 3740,
  ctax: 0.0,
  vat: 0.0,
  currency: 1,
  symbol: "EURO",
  transportcostpallet: 0,
};

let twentyft = {
  type: "20 FEET",
  value: "9",
};

let fourtyft = {
  type: "40 FEET",
  value: "20",
};

const format = ["Food Service", "Cash & Carry", "Retail"]; // 0, 1 ,2
const incoterm = ["EXW", "FOB", "CFR", "CIF", "DDP"];
const country = [tw, hk, kr, jp, sg, au, nz, cn, ph, my, mdd];
let items = [
  (p1 = {
    name: "Vegan Chocolate Cake",
    code: 5281,
    format: format[0],
    pc: 20.56,
    pccase: 36,
    palletization: 250,
  }),
  (p2 = {
    name: "Chocolate fondant",
    code: 419,
    format: format[0],
    pc: 5.75,
    pccase: 20,
    palletization: 250,
  }),
  (p3 = {
    name: "Macarons",
    code: 4723,
    format: format[0],
    pc: 11.88,
    pccase: 72,
    palletization: 250,
  }),
  (p4 = {
    name: "Macarons",
    code: 5241,
    format: format[1],
    pc: 6.12,
    pccase: 36,
    palletization: 600,
  }),
  (p5 = {
    name: "Chocolate fondant",
    code: 4241,
    format: format[1],
    pc: 3.47,
    pccase: 10,
    palletization: 600,
  }),
  (p6 = {
    name: "Chocolate fondant",
    code: 4720,
    format: format[2],
    pc: 0.727,
    pccase: 2,
    palletization: 2244,
  }),
  (p7 = {
    name: "Cheesecake",
    code: 4721,
    format: format[2],
    pc: 1.167,
    pccase: 2,
    palletization: 2244,
  }),
  (p8 = {
    name: "Macarons",
    code: 4824,
    format: format[2],
    pc: 2.111,
    pccase: 12,
    palletization: 1584,
  }),
];
const reefer = [twentyft, fourtyft];
const insurance = 0.005;
const area = document.querySelector("#results");
const itemInformation = document.querySelector("#output-header");

function FetchCountry() {
  for (var i = 0; i < country.length; i++) {
    var option = document.createElement("option");
    option.text = country[i].countryname;
    document.querySelector("#select-country").add(option, null);
  }
}

function RemoveOptGroup(num) {
  for (var i = 1; i <= num; i++) {
    document
      .getElementsByTagName("optgroup")[0]
      .parentNode.removeChild(document.getElementsByTagName("optgroup")[0]);
  }
}

function FetchItems() {
  // Reset beforehand the select content in case we need to dynamically refresh with changes
  // remove options first
  document.getElementById("select-items").length = 2;
  // get HTMLcollection length
  let num = document.getElementsByTagName("optgroup").length;
  // pass into a function using loop to delete one by one live HTMLcollection objects
  RemoveOptGroup(num);

  for (var j = 0; j < format.length; j++) {
    let optgroup = document.createElement("optgroup");
    optgroup.id = "group" + j;
    optgroup.label = format[j];
    optgroup.name = "parent";

    document.querySelector("#select-items").add(optgroup);
    for (var i = 0; i < items.length; i++) {
      if (items[i].format === format[j]) {
        let option = document.createElement("option");
        option.text = items[i].name;

        option.id = items[i].code;
        document.querySelector("#" + optgroup.id).append(option);
      }
    }
  }
}
function FetchIncoterm() {
  for (var i = 0; i < incoterm.length; i++) {
    var option = document.createElement("option");
    option.text = incoterm[i];
    document.querySelector("#select-incoterm").add(option, null);
  }
}
function FetchReefer() {
  for (var i = 0; i < reefer.length; i++) {
    var option = document.createElement("option");
    option.text = reefer[i].type;
    document.querySelector("#select-container").add(option, null);
  }
}
function FetchRange() {
  for (var i = 0; i < format.length; i++) {
    var option = document.createElement("option");
    option.text = format[i];
    document.querySelector("#select-range").add(option, null);
  }
}

FetchReefer();
FetchCountry();
FetchIncoterm();
FetchItems();
FetchRange();
refreshProgressBar();

function FetchReeferValue(ReeferPicked) {
  let return_value;
  for (var i = 0; i < reefer.length; i++) {
    if (ReeferPicked === reefer[i].type) {
      return_value = reefer[i].value;
    }
  }
  return return_value;
}

function refreshProgressBar() {
  for (let e of document.querySelectorAll(
    'input[type="range"].slider-progress'
  )) {
    e.style.setProperty("--value", e.value);
    e.style.setProperty("--min", e.min == "" ? "0" : e.min);
    e.style.setProperty("--max", e.max == "" ? "100" : e.max);
    e.addEventListener("input", () => e.style.setProperty("--value", e.value));
  }
}
// Slider & margins events
// TDP slider events
document.querySelector("#tdp-slider-input").addEventListener("keyup", testNum);
document
  .querySelector("#tdp-slider-input")
  .addEventListener("keyup", Calculation);
document.querySelector("#tdp-slider").addEventListener("input", displayNum);

// Wholesaler Slider events
document
  .querySelector("#middle-slider-input")
  .addEventListener("keyup", testNum);
document
  .querySelector("#middle-slider-input")
  .addEventListener("keyup", Calculation);
document.querySelector("#middle-slider").addEventListener("input", displayNum);

// Retail slider events
document
  .querySelector("#retail-slider-input")
  .addEventListener("keyup", testNum);

document
  .querySelector("#retail-slider-input")
  .addEventListener("keyup", Calculation);
document.querySelector("#retail-slider").addEventListener("input", displayNum);

// radio button
document.querySelector("#labeling").addEventListener("change", Calculation);

//add EVENTS to fields
// automatic change
document.querySelector("#select-settings").addEventListener("change", Simulate);

// manual change
document
  .querySelector("#select-items")
  .addEventListener("change", triggerModal);
document.querySelector("#select-items").addEventListener("change", Calculation);

document
  .querySelector("#select-container")
  .addEventListener("change", Calculation);
document
  .querySelector("#select-country")
  .addEventListener("change", Calculation);
document
  .querySelector("#select-incoterm")
  .addEventListener("change", Calculation);

// add event to instruction button
// document.querySelector("#showins").addEventListener("click", showToast);

// event for modal buttons
// document.querySelector("#make-sim").addEventListener("click", ownSimulation);
document.querySelector("#recipient-price").addEventListener("keyup", testNum);
document.querySelector("#user-input").addEventListener("click", ownSimulation);

function triggerModal() {
  if (document.querySelector("#select-items").options[1].selected === true) {
    document.querySelector("#button-modal").click();
  }
}

function ownSimulation() {
  // verify form is valid here!
  const selectorId = [
    "#recipient-name",
    "#select-range",
    "#recipient-pccase",
    "#recipient-ctnpal",
    "#recipient-price",
  ];
  let validator = 0;
  let ni_name = document.querySelector("#recipient-name").value;
  let ni_range = document.querySelector("#select-range").value;
  let ni_pccase = parseInt(document.querySelector("#recipient-pccase").value);
  let ni_ctnpal = parseInt(document.querySelector("#recipient-ctnpal").value);
  let ni_price = parseFloat(document.querySelector("#recipient-price").value);

  for (var i = 0; i < selectorId.length; i++) {
    if (document.querySelector(selectorId[i]).value === "") {
      document.querySelector(selectorId[i]).classList.add("is-invalid");
      validator += 1;
    } else {
      document.querySelector(selectorId[i]).classList.remove("is-invalid");
      document.querySelector(selectorId[i]).classList.add("is-valid");
    }
  }
  if (isNaN(ni_ctnpal) === true) {
    document.querySelector(selectorId[3]).classList.add("is-invalid");
    validator += 1;
  } else {
    document.querySelector(selectorId[3]).classList.remove("is-invalid");
    document.querySelector(selectorId[3]).classList.add("is-valid");
  }
  if (isNaN(ni_pccase) === true) {
    document.querySelector(selectorId[2]).classList.add("is-invalid");
    validator += 1;
  } else {
    document.querySelector(selectorId[2]).classList.remove("is-invalid");
    document.querySelector(selectorId[2]).classList.add("is-valid");
  }
  if (validator === 0) {
    let price = ParseFloat(ni_price);
    let x = Math.floor(Math.random() * 100 + 1);
    let newItems = {
      name: ni_name,
      code: x + ni_pccase + ni_ctnpal,
      format: ni_range,
      pc: price,
      pccase: ni_pccase,
      palletization: ni_ctnpal,
    };
    items.push(newItems);
    simulation = true;
    Simulate(simulation);
    cleanModal(selectorId);
  }
}

function cleanModal(selectorId) {
  document
    .querySelector("#user-input")
    .setAttribute("data-bs-dismiss", "modal");
  document.querySelector("#close-modal").click();
  for (var i = 0; i < selectorId.length; i++) {
    document.querySelector(selectorId[i]).value = "";
    document.querySelector(selectorId[i]).classList.remove("is-valid");
  }
  document.querySelector(selectorId[4]).value = "";
}

function Simulate(simulation) {
  let option_num;

  if (simulation === true) {
    option_num = 5;
  } else {
    option_num = document.querySelector("#select-settings").value;
  }
  let i = ParseInt(option_num);
  switch (i) {
    case 1:
      document.querySelector("#select-incoterm").options[0].selected = true;
      document.querySelector("#select-items").options[0].selected = true;
      document.querySelector("#select-country").options[0].selected = true;
      document.querySelector("#select-container").options[0].selected = true;
      document.querySelector("#tdp-slider-input").value = 0.0;
      document.querySelector("#middle-slider-input").value = 0.0;
      document.querySelector("#retail-slider-input").value = 0.0;
      document.querySelector("#tdp-slider").value = 0.0;
      document.querySelector("#middle-slider").value = 0.0;
      document.querySelector("#retail-slider").value = 0.0;
      break;
    case 2: //bakery account: incoterm : 4, item : 1, country : 1 (20%, 20%, 65%), reefer 20
      document.querySelector("#select-incoterm").options[4].selected = true;
      document.querySelector("#select-items").options[2].selected = true;
      document.querySelector("#select-country").options[1].selected = true;
      document.querySelector("#select-container").options[1].selected = true;
      document.querySelector("#tdp-slider-input").value = 20.0;
      document.querySelector("#middle-slider-input").value = 20.0;
      document.querySelector("#retail-slider-input").value = 65.0;
      document.querySelector("#tdp-slider").value = 20.0;
      document.querySelector("#middle-slider").value = 20.0;
      document.querySelector("#retail-slider").value = 65.0;
      break;
    case 3: // Distrib : incoterm : 1, item : 3, country : 2 (30%, 30%, 0%), reefer 20
      document.querySelector("#select-incoterm").options[1].selected = true;
      document.querySelector("#select-items").options[4].selected = true;
      document.querySelector("#select-country").options[2].selected = true;
      document.querySelector("#select-container").options[1].selected = true;
      document.querySelector("#tdp-slider-input").value = 30.0;
      document.querySelector("#middle-slider-input").value = 30.0;
      document.querySelector("#retail-slider-input").value = 0.0;
      document.querySelector("#tdp-slider").value = 30.0;
      document.querySelector("#middle-slider").value = 30.0;
      document.querySelector("#retail-slider").value = 0.0;
      break;
    case 4: // KA : incoterm : 3, item : 2, country : 3 (25%, 0%, 65%), reefer 40
      document.querySelector("#select-incoterm").options[3].selected = true;
      document.querySelector("#select-items").options[3].selected = true;
      document.querySelector("#select-country").options[3].selected = true;
      document.querySelector("#select-container").options[2].selected = true;
      document.querySelector("#tdp-slider-input").value = 25;
      document.querySelector("#middle-slider-input").value = 0;
      document.querySelector("#retail-slider-input").value = 65;
      document.querySelector("#tdp-slider").value = 25;
      document.querySelector("#middle-slider").value = 0;
      document.querySelector("#retail-slider").value = 65;
      break;
    case 5: // Own simulation
      FetchItems();
      const last_entry = items[items.length - 1].code;
      document
        .querySelector("#select-items")
        .options.namedItem(last_entry).selected = true;
      break;
    default:
      console.log("error");
  }
  Calculation();
}

function testNum() {
  let val = this.value;
  if (isNaN(val)) {
    val = 0.0;
  } else if (val > 100.0) {
    val = 100.0;
  } else if (val < 0.0) {
    val = 0.0;
  } else {
    val = this.value;
  }
  document.querySelector("." + this.id).value = val;
  document.querySelector("#" + this.id).value = val;
}

function displayNum() {
  let currentvalue = this.value;
  document.querySelector("#" + this.id + "-input").value = currentvalue;
  Calculation();
}

function ParseInt(value) {
  let newValue = parseInt(value); //parseInt -> int(), toString() -> str()
  return newValue;
}
function ParseFloat(value) {
  let newValue = Number.parseFloat(value);
  return newValue;
}

function alertMsg(
  area,
  countryPicked,
  itemPicked,
  IncotermPicked,
  ReeferPicked,
  allow_display_message
) {
  // checking if value not selected
  if (countryPicked === "") {
    allow_display_message.push(["missing country", "#select-country"]);
  } else {
    document.querySelector("#select-country").classList.remove("is-invalid");
    document.querySelector("#select-country").classList.add("is-valid");
  }
  if (isNaN(itemPicked) === true) {
    allow_display_message.push(["missing item", "#select-items"]);
  } else {
    document.querySelector("#select-items").classList.remove("is-invalid");
    document.querySelector("#select-items").classList.add("is-valid");
  }
  if (IncotermPicked === "") {
    allow_display_message.push(["missing incoterm", "#select-incoterm"]);
  } else {
    document.querySelector("#select-incoterm").classList.remove("is-invalid");
    document.querySelector("#select-incoterm").classList.add("is-valid");
  }
  if (ReeferPicked === "") {
    allow_display_message.push(["missing incoterm", "#select-container"]);
  } else {
    document.querySelector("#select-container").classList.remove("is-invalid");
    document.querySelector("#select-container").classList.add("is-valid");
  }

  // displaying message loop
  if (allow_display_message.length > 0 || isNaN(itemPicked) === true) {
    for (var i = 0; i < allow_display_message.length; i++) {
      // change to is-valid state
      document
        .querySelector(allow_display_message[i][1])
        .classList.add("is-invalid");
    }
  } else {
    //
    return;
  }
}

function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

function Calculation() {
  // for edge, chromium, safari browser
  refreshProgressBar();
  // all data & maths
  // reset the div to display new results
  area.innerHTML = "";
  itemInformation.innerHTML = "";
  let testtest = document.querySelector("#select-items");
  const countryPicked = document.querySelector("#select-country").value;
  const itemPicked = parseInt(testtest.options[testtest.selectedIndex].id);
  const IncotermPicked = document.querySelector("#select-incoterm").value;
  const ReeferPicked = document.querySelector("#select-container").value;
  let allow_display_message = [];
  let tdpMargin = document.querySelector("#tdp-slider-input").value;
  let MidMargin = document.querySelector("#middle-slider-input").value;
  let RetailMargin = document.querySelector("#retail-slider-input").value;
  if (document.querySelector("#labeling").checked) {
    labeling = 0.3;
  } else {
    labeling = 0;
  }
  let Reefer = FetchReeferValue(ReeferPicked);
  const tdpMarginInt = tdpMargin;
  const MidMarginInt = MidMargin;
  console.log(tdpMarginInt);
  const RetailMarginInt = RetailMargin;
  let container = Reefer;

  // Math formulas

  for (var i = 0; i < items.length; i++) {
    if (items[i].code === itemPicked) {
      let tproduct_name = items[i].name;
      let tformat = items[i].format;
      let tcode = items[i].code;
      let pc = items[i].pc + labeling;
      let pccase = items[i].pccase;
      let palletization = items[i].palletization;
      for (var j = 0; j < country.length; j++) {
        if (country[j].countryname === countryPicked) {
          country_name = country[j].countryname;
          let fobcost = country[j].fob;
          let cifcost = country[j].cif;
          let custom_tax = country[j].ctax;
          let vat = country[j].vat;
          let currency = country[j].currency;
          let symbol = country[j].symbol;
          let transportcostpallet = country[j].transportcostpallet;

          // all formulas here
          // -------------
          //exw
          priceCtnExw = roundUp(pc / (1 - tdpMarginInt / 100), 3);
          console.log(priceCtnExw);
          d_priceCtnExw = priceCtnExw + bycase;
          pricePcExw = roundUp(priceCtnExw / pccase, 3);
          d_pricePcExw = pricePcExw + bypc;
          //total header
          totalCtn = roundUp(container * palletization * pccase, 2);
          d_totalCtn = totalCtn + unitpc;
          totalAm = roundUp(container * palletization * priceCtnExw, 2);
          d_totalAm = totalAm + euro;
          // -------------
          // fob
          priceCtnFob = roundUp(
            priceCtnExw + fobcost / (container * palletization),
            3
          );
          d_priceCtnFob = priceCtnFob + bycase;
          pricePcFob = roundUp(priceCtnFob / pccase, 3);
          d_pricePcFob = pricePcFob + bypc;
          // -------------
          //cfr
          priceCtnCfr = roundUp(
            priceCtnExw + (cifcost + fobcost) / (container * palletization),
            3
          );
          d_priceCtnCfr = priceCtnCfr + bycase;
          pricePcCfr = roundUp(priceCtnCfr / pccase, 3);
          d_pricePcCfr = pricePcCfr + bypc;
          // -------------
          //cif
          costIns = roundUp(totalAm * insurance, 2);
          priceCtnCif = roundUp(
            priceCtnExw +
              (cifcost + fobcost + costIns) / (container * palletization),
            3
          );
          d_priceCtnCif = priceCtnCif + bycase;
          costLogG = roundUp(
            ((priceCtnCif - priceCtnExw) / priceCtnCif) * 100,
            2
          );
          d_costLogG = costLogG + percentage;
          pricePcCif = roundUp(priceCtnCif / pccase, 3);
          d_pricePcCif = pricePcCif + bypc;
          // -------------
          //ddp
          applyCustoms = roundUp(priceCtnCif + priceCtnCif * custom_tax, 2);
          applyVAT = roundUp(applyCustoms + applyCustoms * vat, 2);
          PVinter = roundUp((applyVAT * currency) / pccase, 3);
          console.log(roundUp(PVinter / (1 - MidMarginInt / 100), 3));
          logCostPerc = roundUp(
            transportcostpallet / (pccase * palletization * PVinter),
            2
          );
          if (countryPicked === "South Korea") {
            d_PVinter = PVinter * 1000 + " " + symbol + bypc;
          } else {
            d_PVinter = PVinter + " " + symbol + bypc;
          }

          RtLogCost = roundUp(1 - 1 * (RetailMarginInt / 100), 3);
          WsLogCost = roundUp(RtLogCost - RtLogCost * (MidMarginInt / 100), 3);
          TransLogCost = WsLogCost - WsLogCost * logCostPerc;
          LogRatio = roundUp(1 / TransLogCost, 3);
          srp = roundUp(PVinter * LogRatio, 2);
          if (srp === Infinity) {
            display_srp = "--";
          } else {
            if (countryPicked === "South Korea") {
              display_srp = 1000 * srp + " " + symbol + bypc;
            } else {
              display_srp = srp + " " + symbol + bypc;
            }
          }

          showCT = custom_tax * 100 + percentage;
          showVAT = vat * 100 + percentage;
          product_name = tproduct_name;
          country_name = country_name;
          pcode = tcode;
          pformat = tformat;
        }
      }
    }
  }

  // create array with fresh calculated data
  const gen_data = [country_name, product_name, pformat, pcode];

  const data = [
    { name: "EXW (€)", output: d_pricePcExw, type: "EXW" },
    { name: "EXW (€)", output: d_priceCtnExw, type: "EXW" },
    { name: "PO Total Amount", output: d_totalAm, type: "EXW" },
    { name: "PO quantity", output: d_totalCtn, type: "EXW" },
    { name: "FOB (€)", output: d_pricePcFob, type: "FOB" },
    { name: "FOB (€)", output: d_priceCtnFob, type: "FOB" },
    { name: "----", output: "---------", type: "FOB" },
    { name: "CFR (€)", output: d_pricePcCfr, type: "CFR" },
    { name: "CFR (€)", output: d_priceCtnCfr, type: "CFR" },
    { name: "----", output: "---------", type: "CFR" },
    { name: "CIF (€)", output: d_pricePcCif, type: "CIF" },
    { name: "CIF (€)", output: d_priceCtnCif, type: "CIF" },
    { name: "Logistic cost", output: d_costLogG, type: "CIF" },
    { name: "VAT", output: showVAT, type: "CIF" },
    { name: "Customs Tax", output: showCT, type: "CIF" },
    { name: "----", output: "---------", type: "CIF" },
    { name: "Recommended SRP", output: display_srp, type: "DDP" },
    { name: "Client price", output: d_PVinter, type: "DDP" },
    { name: "----", output: "---------", type: "DDP" },
  ];
  // alert system
  alertMsg(
    area,
    countryPicked,
    itemPicked,
    IncotermPicked,
    ReeferPicked,
    allow_display_message
  );

  // call function to create a table
  CreateTable();

  //test which array position
  let value_position;
  for (i = 0; i < incoterm.length; i++) {
    if (IncotermPicked === incoterm[i]) {
      value_position = i;
    }
  }

  // call function to display each data in data library
  if (allow_display_message.length === 0) {
    // show general information about query made
    OutputItemInfo(gen_data);
    while (value_position >= 0) {
      for (var i = 0; i < data.length; i++) {
        if (incoterm[value_position] === data[i].type) {
          addRow("table-output", data[i].name, data[i].output);
        }
      }
      value_position -= 1;
    }
  }
  // console.clear();
}

function CreateTable() {
  // Create Table element
  var div = document.createElement("table");
  // set an id to the table
  div.setAttribute("id", "table-output");
  div.setAttribute("class", "table-output");
  // append it to our div "results"
  area.appendChild(div);
}

function addRow(tableID, text, data) {
  // Get a reference to the table
  let tableRef = document.getElementById(tableID);

  // Insert a row at the end of the table
  let newRow = tableRef.insertRow(0);

  // Insert a cell in the row at index 0
  let leftCell = newRow.insertCell(0);
  let rightCell = newRow.insertCell(-1);

  // Append a text node to the cell
  let newText = document.createTextNode(text);
  let newData = document.createTextNode(data);
  leftCell.appendChild(newText);
  leftCell.style.color = "rgb(94, 94, 94)";
  leftCell.style.fontWeight = "normal";
  leftCell.style.paddingLeft = "15px";
  rightCell.appendChild(newData);
  rightCell.style.paddingLeft = "15px";
}

function OutputItemInfo(gen_data) {
  document.querySelector("#output-header").innerHTML =
    gen_data[0] +
    " - " +
    gen_data[3] +
    " - " +
    gen_data[2] +
    " - " +
    gen_data[1] +
    "<br>";
}
