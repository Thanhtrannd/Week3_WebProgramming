import "./styles.css";

if (document.readyState !== "loading") {
  console.log("Document is ready!");
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready after waiting!");
  });
}

const inputUrl =
  "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
const tableBodyElem = document.getElementsByTagName("tbody");

loadData(inputUrl);

async function loadData(inputUrl) {
  let url = inputUrl;
  let loadPromise = await fetch(url);
  let loadedJSON = await loadPromise.json();

  console.log(loadedJSON);
  let AlueIndexObject = loadedJSON.dataset.dimension.Alue.category.index;
  let PopulationObject = loadedJSON.dataset.value;
  let MunicipalitiesObject = loadedJSON.dataset.dimension.Alue.category.label;
  let allMunicipalityKeys = Object.keys(MunicipalitiesObject);
  console.log(allMunicipalityKeys);

  for (let key in MunicipalitiesObject) {
    let municipality = MunicipalitiesObject[key];
    let idx = AlueIndexObject[key];
    let population;
    for (let i in PopulationObject) {
      if (idx === i) {
        population = PopulationObject[i];
      }
    }
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");

    td1.innerText = municipality;
    td2.innerText = population;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tableBodyElem.appendChild(tr);
  }
}
