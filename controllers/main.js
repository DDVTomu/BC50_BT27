import renderDataTable from "../utils/callData.js";
import tabModel from "../models/tabModel.js";
import ChosenItem from "../models/ChosenItem.js";
import ListChosen from "../models/ListChosen.js";
const renderTable = new renderDataTable();
const tabModelList = new tabModel();
const getEle = (id) => document.getElementById(id);

const getItemArr = (result) => {
  let id = result.id;
  let type = result.type;
  let name = result.name;
  let desc = result.desc;
  let imgSrc_jpg = result.imgSrc_jpg;
  let imgSrc_png = result.imgSrc_png;
  const item = new ChosenItem(id, type, name, desc, imgSrc_jpg, imgSrc_png);
  return item;
};

const getListArr = (result) => {
  let tabName = result.tabName;
  let showName = result.showName;
  let type = result.type;
  const list = new ListChosen(tabName, showName, type);
  return list;
};

const getData = () => {
  renderTable
    .getJSON(`/data/Data.json`, "GET", null)
    .then(function (res) {
      const dataList = res.data;
      dataList.navPills.forEach((pill) => {
        let list = getListArr(pill);
        tabModelList.addList(list);
      });
      dataList.tabPanes.forEach((tab) => {
        let item = getItemArr(tab);
        tabModelList.addItem(item);
      });
      populateTabs();
    })
    .catch(function (err) {
      console.log("res", err);
    });
};
getData();

const populateTabs = () => {
  let content1 = "";
  let content2 = "";
  Object.entries(tabModelList.listArr).forEach(([key, pill]) => {
    content1 += `<li class="nav-item" role="presentation" key="${key}">
    <button class="nav-link" id="pills-${pill.tabName}-tab" data-toggle="pill" data-target="#pills-${pill.tabName}" type="button" role="tab" aria-controls="pills-${pill.tabName}" aria-selected="true">${pill.showName}</button>
  </li>`;

    content2 += `<div
  class="tab-pane fade"
  id="pills-${pill.tabName}"
  role="tabpanel"
  aria-labelledby="pills-${pill.tabName}-tab"
  data-type="${pill.type}"
>
${getItems(pill.type)}
</div>`;
  });
  getEle("pills-tab").innerHTML = content1;
  getEle("pills-tabContent").innerHTML = content2;
};

const getItems = (type) => {
  let content = "";
  Object.entries(tabModelList.itemArr).forEach(([key, item]) => {
    if (item.type == type) {
      content += `<button class="item" onclick="changeClothes(['${item.type}', '${item.imgSrc_png}'])">
      <img src="${item.imgSrc_jpg}"
      <p>${item.name}</p>
      </button>`;
    }
  });
  return content;
};

const changeClothes = ([type, image]) => {
  switch (type) {
    case "topclothes":
      console.log(`This is topclothes`);
      $(".bikinitop").css("background", "url(" + image + ")");
      break;
    case "botclothes":
      console.log(`This is botclothes`);
      $(".bikinibottom").css("background", "url(" + image + ")");
      break;
    case "shoes":
      console.log(`This is shoes`);
      $(".feet").css("background", "url(" + image + ")");
      break;
    case "handbags":
      console.log(`This is handbags`);
      $(".handbag").css("background", "url(" + image + ")");
      break;
    case "necklaces":
      console.log(`This is necklaces`);
      $(".necklace").css("background", "url(" + image + ")");
      break;
    case "hairstyle":
      console.log(`This is hairstyle`);
      $(".hairstyle").css("background", "url(" + image + ")");
      break;
    case "background":
      console.log(`This is background`);
      $(".background").css("background", "url(" + image + ")");
      break;
  }
};

window.changeClothes = changeClothes;
