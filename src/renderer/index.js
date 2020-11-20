import { ipcRenderer } from "electron";
import { addAttributes, create, getById } from "common/utils";
import { readFileSync, readdirSync } from "fs";
import * as path from "path";
import { slide } from "./slider.js";
import { Algorithm } from "./modal";
import "../static/server/style.scss";

const isDevelopment = process.env.NODE_ENV !== "production";

document.body.innerHTML = readFileSync(
  path.join(__static, "server/index.html"),
  "utf8"
);

let mainElement = getById("main");
let slidesElement = getById("slides");
let prev = getById("prev");
let next = getById("next");

const algorithm = new Modal();

let slidesFragment = document.createDocumentFragment();
readdirSync(path.join(__static, "images/slides")).forEach((file) => {
  const img = create("img");
  img.setAttribute(
    "src",
    isDevelopment
      ? `images/slides/${file}`
      : path.resolve(__static, `images/slides/${file}`)
  );
  img.classList.add("slide");
  slidesFragment.appendChild(img);
});

slidesElement.appendChild(slidesFragment);

slide(mainElement, slidesElement, prev, next);

ipcRenderer.on("store-data", (event, store) => {
  switch (store.set) {
    case "server": {
      setServerInfo(store.address, store.port);
      break;
    }
    case "client": {
      setClientInfo(store.address);
      break;
    }
    case "lux": {
      updateLuxValue(store.value);
      algorithm.updateLuxValue(parseInt(store.value));
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    const lux = Math.floor(Math.random() * 5000);
    console.log(lux);
    algorithm.updateLuxValue(lux);
  }
});

function setServerInfo(address, port) {
  getById("server-ip").innerHTML = address;
  getById("server-port").innerHTML = port;
}

function setClientInfo(address) {
  getById("client-ip").innerHTML = address;
}

function updateLuxValue(value) {
  getById("lux-value").innerHTML = value;
}
