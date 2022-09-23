import "./styles.css";

if (document.readyState !== "loading") {
  console.log("Document is ready!");
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready after waiting!");
  });
}

const municipalityUrl =
  "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
const employmentUrl =
  "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";

const tableBodyElem = document.getElementById("tbody");

loadData(municipalityUrl, employmentUrl);

async function loadData(municipalityUrl, employmentUrl) {
  // Load municipality
  let municipalityurl = municipalityUrl;
  let loadmunicipality = await fetch(municipalityurl);
  let loadedmunicipality = await loadmunicipality.json();
  // Load employmentUrl
  let employmenturl = employmentUrl;
  let loademployment = await fetch(employmenturl);
  let loadedemployment = await loademployment.json();
  console.log(loadedemployment);
  // Populate data
  console.log(loadedmunicipality);
  let AlueIndexObject =
    loadedmunicipality.dataset.dimension.Alue.category.index;
  let PopulationObject = loadedmunicipality.dataset.value;
  let MunicipalitiesObject =
    loadedmunicipality.dataset.dimension.Alue.category.label;
  let EmploymentObject = loadedemployment.dataset.value;
  let allMunicipalityKeys = Object.keys(MunicipalitiesObject);
  console.log(allMunicipalityKeys);

  for (let key in MunicipalitiesObject) {
    let municipality = MunicipalitiesObject[key];
    let idx = AlueIndexObject[key];
    let population;
    let employment;
    let employment_per;

    // Get population for municipality
    for (let i in PopulationObject) {
      if (idx == i) {
        population = PopulationObject[i];
      }
    }
    // Get employment for municipality
    for (let k in EmploymentObject) {
      if (idx == k) {
        employment = EmploymentObject[k];
      }
    }
    // Compute employment-%
    let employment_rate = Number(employment / population);
    employment_per = employment_rate.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
    });

    // Create element
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    // Add class to employment percent conditionally
    if (employment_rate > 0.45) {
      tr.className = "highly-employed";
    } else if (employment_rate < 0.25) {
      tr.className = "lowly-employed";
    } else {
      tr.className = "normally-employed";
    }

    td1.innerText = municipality;
    td2.innerText = population;
    td3.innerText = employment;
    td4.innerText = employment_per;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tableBodyElem.appendChild(tr);
    console.log(tr);
  }
}
