const sendBtn = document.querySelector(".send-button");
const table = document.querySelector(".universities-table");
const tableBody = document.querySelector(".table-body");
const resetBtn = document.querySelector(".reset-button");

sendBtn.addEventListener("click", async () => {
  const country = document.querySelector(".country").value;
  const formattedCountry = country.trim().toLowerCase();

  tableBody.innerHTML = "";

  try {
    const response = await fetch(
      `http://universities.hipolabs.com/search?country=${formattedCountry}`,
    );

    if (!response) {
      throw new Error("Error while getting data");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("It seems you entered invalid country name!");
    }

    table.style.display = "table";
    let rowCount = 0;

    data.forEach((university) => {
      rowCount += 1;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${rowCount}</td>
        <td>${university.alpha_two_code}</td>
        <td>${university.domains}</td>
        <td>${university.name}</td>
        <td> <a href="${university.web_pages}" target="_blank">${university.web_pages}</a></td>
`;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

resetBtn.addEventListener("click", () => {
  table.style.display = "none";
  tableBody.innerHTML = "";
  document.querySelector(".country").value = "";
});
