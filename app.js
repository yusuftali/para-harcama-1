"use strict";
// Elements
let totalMoneyElement = document.querySelector("#totalMoney");
let percentageElement = document.querySelector("#percentageLeft");
let buyButtons = document.querySelectorAll("#buy");
let sellButtons = document.querySelectorAll("#sell");
const appContainer = document.querySelector(".app-container");

// Default data
let rteFortune = 480000000000;
let totalPercentage = 100;

let elements = [];

// Events
appContainer.addEventListener("click", (e) => {
  let element = e.target.parentElement;

  if (e.target.classList.contains("btn-buy")) {
    buyItem(element);
  } else if (e.target.classList.contains("btn-sell")) {
    sellItem(element);
  }
});

// Buy item
function buyItem(element) {
  // change default data to new data

  if (rteFortune - Number(element.dataset.price) >= 0) {
    rteFortune -= Number(element.dataset.price);
    totalPercentage = (rteFortune * 100) / 480000000000;

    // Item name
    let itemName = element.parentElement.querySelector("#name").textContent;

    // get span to increment by one
    let amountOfItems = element.querySelector("#amount");
    amountOfItems.textContent = `${Number(amountOfItems.textContent) + 1}`;

    // get button to enable it when item is more than 0
    let button = element.querySelector("#sell");
    if (Number(amountOfItems.textContent) > 0) {
      button.disabled = false;
    }

    updateTotalAndPercentage();

    // Create (if its new) or update recipt item(if it already exists)
    createReciptItem(
      itemName,
      Number(amountOfItems.textContent),
      formatMoney(
        Number(element.dataset.price) * Number(amountOfItems.textContent)
      )
    );

    updateReceipt();
  } else {
    cantAffordAlert();
  }
}

function cantAffordAlert() {
  totalMoneyElement.innerHTML = `<p class="totalMoney">Can't afford that!</p>`;
  percentageElement.innerHTML = `<p class ="percentageLeft">Sell something!</p>`;
}

function createReciptItem(name, amount, total) {
  let receiptItem = new ReceiptItem();
  receiptItem.name = name;
  receiptItem.amount = amount;
  receiptItem.total = total;

  if (!checkReceiptItemExists(receiptItem)) {
    receiptItemsArr.push(receiptItem);
  } else {
    updateReceiptItem(receiptItem);
  }
}

// Sell Item
function sellItem(element) {
  // change default data to new data

  rteFortune += Number(element.dataset.price);
  totalPercentage = (rteFortune * 100) / 480000000000;

  // Item name
  let itemName = element.parentElement.querySelector("p").textContent;

  // get span to decrement by one
  let amountOfItems = element.querySelector("span");
  amountOfItems.textContent = `${Number(amountOfItems.textContent) - 1}`;

  // get button to disable when item is less than 0
  let button = element.querySelector("#sell");

  if (Number(amountOfItems.textContent) === 0) {
    button.disabled = true;
  }
  updateTotalAndPercentage();

  createReciptItem(
    itemName,
    Number(amountOfItems.textContent),
    formatMoney(
      Number(element.dataset.price) * Number(amountOfItems.textContent)
    )
  );

  updateReceipt();
}

function updateTotalAndPercentage() {
  totalMoneyElement.innerHTML = `<p class="totalMoney">Kalan: ${formatMoney(
    rteFortune
  )}</p>`;
  percentageElement.innerHTML = `<p class ="percentageLeft">Paranın Sadece %${(
    100 - totalPercentage
  ).toFixed(6)} Eksildi</p>`;
}

// Format Money Function
function formatMoney(number) {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

// Class to create unique receipt items
class ReceiptItem {
  constructor() {
    this.name;
    this.amount;
    this.total;
  }
}

let receiptItemsArr = [];

// Function that check if that receipt items its already added on the array
function checkReceiptItemExists(receiptItem) {
  let i = 0;
  let exists = false;

  while (!exists && i < receiptItemsArr.length) {
    let itemX = receiptItemsArr[i];
    if (itemX.name === receiptItem.name) {
      exists = true;
    }
    i++;
  }

  return exists;
}

function updateReceiptItem(receiptItem) {
  let i = 0;
  let itemInArr = null;

  while (itemInArr === null && i < receiptItemsArr.length) {
    let itemX = receiptItemsArr[i];

    if (itemX.name === receiptItem.name) {
      itemInArr = itemX;
    }
    i++;
  }

  if (itemInArr) {
    itemInArr.name = receiptItem.name;
    itemInArr.amount = receiptItem.amount;
    itemInArr.total = receiptItem.total;
  }
}

// Function to create recipt (iterara por el array y mostrara los objetos en una lista)
function updateReceipt() {
  let title = `<h1>Receipt</h1>`;
  let receipt = "";
  let total = formatMoney(480000000000 - rteFortune);

  for (let i = 0; i < receiptItemsArr.length; i++) {
    let itemX = receiptItemsArr[i];

    if (itemX.amount !== 0) {
      receipt += `<p>${itemX.name} x <strong> ${itemX.amount}</strong>..............$ ${itemX.total}</p>`;
    }
  }

  document.querySelector("#receipt-container").innerHTML =
    title + receipt + `<p class="totalRecipt">Total is: $ ${total}</p>`;
}

// Function to print
function printSection(el) {
  let printsection = document.getElementById(el).innerHTML;
  document.body.innerHTML = printsection;

  window.print();
}

// Element class - preload data - generate html elements

class Element {
  static nro = 1;
  constructor(name, price, image) {
    this.id = Element.nro++;
    this.name = name;
    this.price = price;
    this.amount = 0;
    this.image = image;
  }
}

function createAndSaveElement(elementName, price, image) {
  if (elementName !== "" && price > 0 && image !== "") {
    let newElement = new Element(elementName, price, image);
    elements.push(newElement);
  }
}

preLoad();

function preLoad() {
  createAndSaveElement("AirPods Pro", 249, "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361");

  createAndSaveElement(
    "Nintendo Switch",
    299,
    "https://images.yaoota.com/cHSKCqs-N9rs779XBLaGPnWMOis=/trim/fit-in/500x500/filters:quality(80)/yaootaweb-production-ng/media/crawledproductimages/7cd78f0921706c987b6a074e558c74990acecad8.jpg"
  );
  createAndSaveElement("PS5", 499, "https://cdn.cimri.io/image/1000x1000/sonyplaystationoyunkonsolu_622618972.jpg");
  createAndSaveElement("Xbox Series X", 499, "https://cdn.cimri.io/image/1000x1000/microsoftxboxseriesxtboyunkonsolusiyah_622648424.jpg");
  createAndSaveElement(
    "Iphone 14 Pro Max - 1TB",
    1599,
    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-storage-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663790290238"
  );
  createAndSaveElement(
    "Samsung S22 Ultra - 1TB",
    1199,
    "https://cdn.vatanbilgisayar.com/Upload/PRODUCT/samsung/thumb/132360-2_large.jpg"
  );
  createAndSaveElement(
    "MacBook Pro 16' M1 Max (64GB RAM | 8TB) ",
    6099,
    "https://productimages.hepsiburada.net/s/34/1500/10443423252530.jpg"
  );

  createAndSaveElement(
    "Mac Studio M1 Ultra (128GB RAM | 8TB)",
    7999,
    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-studio-hero-202203?wid=410&hei=436&fmt=jpeg&qlt=95&.v=1645665541274"
  );

  createAndSaveElement(
    "Gaming PC(Ryzen 9 7950X, RTX 4090, 128GB, 8TB SSD)",
    8999,
    "https://cdn.vatanbilgisayar.com/Upload/PRODUCT/cooler-master/thumb/110792_small.jpg"
  );
  createAndSaveElement(
    "MSI GT76 Titan DT",
    11000,
    "https://webdenal.s3.amazonaws.com/catalog2/995086.jpg"
  );
  createAndSaveElement(
    "iPad Pro 12.9' M2 2TB",
    2400,
    "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-11-select-wifi-spacegray-202210?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1664411207157"
  );
  createAndSaveElement(
    "Apple Watch Ultra (Titanium Case) ",
    800,
    "https://cdn.vatanbilgisayar.com/Upload/PRODUCT/apple/thumb/135233-1-2_large.jpg"
  );
  createAndSaveElement(
    "Apple Tv 4K ",
    149,
    "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/apple-tv-4k-hero-select-202210_FMT_WHH?wid=640&hei=600&fmt=jpeg&qlt=90&.v=1664896361164"
  );
  createAndSaveElement(
    "Tesla Model X",
    159000,
    "https://tesla-cdn.thron.com/delivery/public/image/tesla/8410774a-2d2c-4867-805d-9a549b9eac30/bvlatuR/std/4096x2561/Model-X-Range-Hero-Desktop-LHD"
  );
  createAndSaveElement(
    "Lüks Villa",
    45000000,
    "https://tranio.com.tr/photos/adt/a86f6f2d/21377484/655x407.jpg"
  );
  createAndSaveElement(
    "Bugatti Chiron",
    6000000,
    "https://media.ed.edmunds-media.com/bugatti/chiron/2022/ot/2022_bugatti_chiron_det_ot_819221_1600.jpg"
  );
  createAndSaveElement(
    "GALATASARAY Spor Kulübü",
    141000000,
    "https://www.freepnglogos.com/uploads/galatasaray-logo-png/siyah-uzerine-gs-logosu-ve-yildizar-hd-kalite-ucretsiz-indir-15.png"
  );
  createAndSaveElement(
    "FENERBAHÇE Spor Kulübü",
    177000000,
    "https://media.fenerbahce.org/getmedia/2cbef677-513c-4b0d-9aa3-dae69a3677fb/5yildiz_logo.jpg?width=1200&height=675&ext=.jpg"
  );
  createAndSaveElement(
    "BEŞİKTAŞ Spor Kulübü",
    122000000,
    "https://productimages.hepsiburada.net/s/78/500/110000019639981.jpg"
  );
  createAndSaveElement(
    "TRABZONSPOR Spor Kulübü",
    145000000,
    "https://www.trabzonspor.org.tr/download/resources/haber1_8953561372_1000x700_false.jpg"
  );
 
}

elements.forEach((element) => {
  let newElement = document.createElement("div");

  newElement.classList.add("element");

  newElement.innerHTML = `<img src="${element.image}" alt="${element.name}" />
  <p id="name">${element.name}</p>
  <span id="price"> ${formatMoney(element.price)}</span>
  <div class="buyAndSellContainer" data-price="${element.price}">
    <button class="btn-sell" id="sell" disabled>Sell</button>
    <span id="amount">${element.amount}</span>
    <button class="btn-buy" id="buy" >Buy</button>
  </div>`;

  appContainer.appendChild(newElement);
});
