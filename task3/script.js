const sendBtn = document.querySelector(".send-button");
const table = document.querySelector(".universities-table");
const tableBody = document.querySelector(".table-body");
const resetBtn = document.querySelector(".reset-button");
const saved = document.querySelector(".saved");
const savedNum = document.querySelector(".number-of-saved");
let savedCouner = 0;

sendBtn.addEventListener("click", async () => {
  const country = document.querySelector(".country").value;
  const formattedCountry = country.trim().toLowerCase();

  tableBody.innerHTML = "";
  savedCouner = 0;
  saved.style.display = "none";

  try {
    const response = await fetch(
      `http://universities.hipolabs.com/search?country=${formattedCountry}`,
    );

    if (!response.ok) {
      throw new Error("Error while getting data");
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error("It seems you entered invalid country name!");
    }

    table.style.display = "table";
    saved.style.display = "block";
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
        <td>
           <input type="checkbox" name="favourite" class="favourite-checkbox"/>
           <label>Add to my list</label>
        </td>
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

tableBody.addEventListener("change", (e) => {
  if (e.target.classList.contains("favourite-checkbox")) {
    if (e.target.checked) {
      savedCouner++;
      savedNum.textContent = savedCouner;
    } else {
      savedCouner--;
      savedNum.textContent = savedCouner;
    }
  }
});
