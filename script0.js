"use strict";

async function getDataFromFile(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("Ошибка при загрузке файла");
    return await response.json();
  } catch (error) {
    console.error("Произошла ошибка:", error);
    throw error;
  }
}

const cardsData = "cards.json";
const cardEl = document.querySelector(".item-box-container");

getDataFromFile(cardsData).then((data) => {
  if (cardEl) {
    data.forEach((card) => {
      const cardHtml = `
      <a href="#" class="item-box"
        style="display: flex; flex-direction: column; max-width: 360px; background-color: #F8F8F8; text-decoration: none;">
        <img src="${card.photoSrc}" alt="card photo" class="item-img">
        <div class="item-text"
          style="display: flex; flex-direction: column; padding-left: 16px;">
          <span class="item-title"
            style="padding-top: 24px; padding-bottom: 12px; color: #000000; font-size: 13px; font-weight: 400;">${card.cardTitle}</span>
          <span class="item-description"
            style="padding-bottom: 18px; color: #5D5D5D; font-size: 14px; font-weight: 300; width: 314.743px;">${card.cardDescription}</span>
          <span class="item-rice"
            style="color: #F16D7F; padding-bottom: 20px; font-size: 16px; font-weight: 400;">$${card.cardPrice}.00</span>
        </div>
      </a>
      `;
      cardEl.insertAdjacentHTML("beforeend", cardHtml);
    });
  } else {
    console.log("Элемент .item-box-container не найден.");
  }
});