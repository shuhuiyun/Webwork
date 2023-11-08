let data = [];
axios
  .get("https://hexschool.github.io/js-filter-data/data.json")
  .then(function (response) {
    data = response.data;
    filterData();
  });
let newData = [];

//移除篩選排序的css
const headerActiveGroup = document.querySelector("thead");
function removeActive() {
  const activeItem = headerActiveGroup.querySelectorAll("div");
  activeItem.forEach((item) => {
    item.classList.remove("text-danger");
  });
}

//篩選
const showList = document.querySelector(".showList");
const btnGroup = document.querySelector(".button-group");
function filterData() {
  btnGroup.addEventListener("click", function (e) {
    if (e.target.tagName == "BUTTON") {
      const btn = e.target.closest("button");
      const btnItem = btnGroup.querySelectorAll(".btn");
      btnItem.forEach((item) => {
        item.classList.remove("active");
      });
      btn.closest("div").classList.remove("active");
      const btnTxt = e.target.textContent.trim();

      let str = "";
      newData.length = 0;
      data.forEach((item) => {
        const content = ` <tr>       
        <td class="fw-bold">${item.作物名稱}</td>
        <td class="fw-bold">${item.市場名稱}</td>
          <td>${item.上價}</td>
          <td>${item.中價}</td>
          <td>${item.下價}</td>
          <td>${item.平均價}</td>
          <td>${item.交易量}</td>
        </tr>`;

        if (btnTxt == "蔬果" && item.種類代碼 == "N04") {
          str += content;
          newData.push(item);
        } else if (btnTxt == "水果" && item.種類代碼 == "N05") {
          str += content;
          newData.push(item);
        } else if (btnTxt == "花卉" && item.種類代碼 == "N06") {
          str += content;
          newData.push(item);
        }
      });
      btn.classList.add("active");
      showList.innerHTML = str;
      removeActive();
      resetArrowOpacity();
    } else {
      return;
    }
  });
}

//搜尋
const searchTxt = document.querySelector(".rounded-end");
const searchBtn = document.querySelector(".search");

searchBtn.addEventListener("click", function (e) {
  let str = "";
  newData.length = 0;
  data.filter(function (item) {
    const content = ` <tr>       
    <td class="fw-bold">${item.作物名稱}</td>
    <td class="fw-bold">${item.市場名稱}</td>
    <td>${item.上價}</td>
    <td>${item.中價}</td>
    <td>${item.下價}</td>
    <td>${item.平均價}</td>
    <td>${item.交易量}</td>
  </tr>`;

    if (
      item.作物名稱 !== null &&
      item.作物名稱.includes(searchTxt.value) == true
    ) {
      str += content;
      newData.push(item);
      removeActive();
      resetArrowOpacity();
      return;
    }
  });

  showList.innerHTML = ` <tr>
  <td colspan="7" class="text-center p-3">
  資料載入中...
  </td>
</tr>`;
  setTimeout(() => {
    showList.innerHTML = str;
  }, "500");
});

// 重製箭頭
function resetArrowOpacity() {
  const priceElements = document.querySelectorAll("[data-price]");
  priceElements.forEach((e) => {
    const upArrow = e.querySelector('[data-sort="up"]');
    const downArrow = e.querySelector('[data-sort="down"]');
    upArrow.style.opacity = 1;
    downArrow.style.opacity = 1;
  });
}

//排序
let sortOrder = 1;
const sortAdvanced = document.querySelector("thead");
sortAdvanced.addEventListener("click", function (e) {
  const sortAttribute = e.target.textContent.trim();
  sortOrder = -sortOrder;

  let clickedText = e.target.textContent.trim();
  if (
    ["上價", "中價", "下價", "平均價", "交易量"].includes(clickedText) &&
    e.target.nodeName == "DIV" &&
    newData.length !== 0
  ) {
    removeActive();
    resetArrowOpacity();
    const sortedData = newData.sort((a, b) => {
      const result = a[sortAttribute] - b[sortAttribute];
      return sortOrder * result;
    });

    const upArrow = e.target.querySelector('[data-sort="up"]');
    const downArrow = e.target.querySelector('[data-sort="down"]');

    if (sortOrder === -1) {
      upArrow.style.opacity = 0.5;
      downArrow.style.opacity = 1;
    } else {
      upArrow.style.opacity = 1;
      downArrow.style.opacity = 0.5;
    }

    const str = sortedData
      .map((item) => {
        return `<tr>       
        <td class="fw-bold">${item.作物名稱}</td>
        <td class="fw-bold">${item.市場名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td>
      </tr>`;
      })
      .join("");

    e.target.classList.add("text-danger");
    showList.innerHTML = str;
  }
});

//排序選單

const selectElement = document.getElementById("js-select");

selectElement.addEventListener("change", function () {
  let selectArr = ["排序", "上價", "中價", "下價", "平均價", "交易量"];
  const sortAttribute = selectArr[selectElement.selectedIndex];
  //console.log(selectArr[selectElement.selectedIndex]);
  if (newData.length !== 0) {
    removeActive();
    resetArrowOpacity();
    const sortedData = newData.sort((a, b) => {
      const result = a[sortAttribute] - b[sortAttribute];
      return result;
    });
    const str = sortedData
      .map((item) => {
        return `<tr>       
      <td class="fw-bold">${item.作物名稱}</td>
      <td class="fw-bold">${item.市場名稱}</td>
      <td>${item.上價}</td>
      <td>${item.中價}</td>
      <td>${item.下價}</td>
      <td>${item.平均價}</td>
      <td>${item.交易量}</td>
    </tr>`;
      })
      .join("");

    showList.innerHTML = str;
  }
});
