let products = [];

async function fetchData() {
  let a = await fetch("js/product.json");
  let b = await a.json();
  getData(b.product);
}
fetchData();

function getData(data) {
  products = data;
  let cards = document.querySelector(".cards");
  for (let i = 0; i <= products.length - 1; i++) {
    let elem = `
      <div class="cards__item">
        <img class="cards__item_img" src=${products[i].img} alt="product" />
        <div class="cards__item_title">${products[i].name}</div>
        <div class="cards__item_price">
          <span>${products[i].price}</span>
          <span>₽</span>
        </div>
        <a class="btn" href="#">Купить</a>
      </div>
  `;
    render(elem);
  }
  clickListener(cards);
}

function render(elem, parent = document.querySelector(".cards")) {
  parent.insertAdjacentHTML("beforeend", elem);
}

function clickListener(parent) {
  parent.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.href = "";
      modalHandler(e.target);
    });
  });
}

function modalHandler(e) {
  let modalWindow = `      
		<div class="modal-body">
      <div>
        <div class="close-btn">
          <a href="#" title="Закрыть" class="close">X</a>
        </div>
        <div class="modal-form">
          <form id="form" action="javascript:sendMail();">
            <input id="name" name="fio" placeholder="Укажите ФИО" type="text" required/>
            <input id="email" name="email" placeholder="Укажите e-mail" type="email" required/>
            <input id="phone" name="phone" placeholder="+79xx-xxx-xx-xx" type="tel" required/>
            <button type="submit">Отправить </button>
          </form>
        </div>
      </div>
    </div>`;
  render(modalWindow);
  submitHandler();
}

function submitHandler() {
  let btn = document.querySelector("button[type=button]");
  let close = document.querySelector(".close");

  close.addEventListener("click", (e) => {
    let store = document.querySelector(".cards");
    store.removeChild(store.querySelector(".modal-body"));
  });
}

function sendMail() {
  let email = form.email.value;
  let name = form.name.value;
  let phone = form.phone.value;
  let title = "Отзыв";
  let body = `Здравствуйте! Меня зовут ${name}. Мой номер телефона: ${phone}.`;
  window.open(`mailto:${email}?subject=${title}&body=${body}`);
}
