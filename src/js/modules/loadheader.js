const Slideout = require("slideout");
const makeHeaderHide = require('./hidingheader');

const desktopHeader = `<header class="page-header">
  <div class="page-header__top">
    <div class="container container--header-top">
      <div class="page-menu">
        <ul class="page-menu__list">
          <li class="page-menu__el">
            <a class="link" href="#">Компания</a>
          </li>
          <li class="page-menu__el">
            <a class="link" href="#">Портфолио</a>
          </li>
          <li class="page-menu__el page-menu__el--separated">
            <a class="link" href="#">Проектирование</a>
          </li>
          <li class="page-menu__el">
            <a class="link" href="#">Ресторанам</a>
          </li>
          <li class="page-menu__el">
            <a class="link" href="#">Застройщикам</a>
          </li>
          <li class="page-menu__el">
            <a class="link" href="#">Гос.заказчикам</a>
          </li>
          <li class="page-menu__el page-menu__el--separated">
            <a class="link" href="#">Таблет-питание</a>
          </li>
          <li class="page-menu__el">
            <a class="link" href="#">Сервис</a>
          </li>
          <li class="page-menu__el">
            <a class="link" href="#">Контакты</a>
          </li>
        </ul>
        <div class="page-menu__mail">
          <a class="link" href="mailto:info@stolovay.ru">
            <span>info@stolovay.ru</span>
          </a>
          <div class="page-menu__mail-copybox" data-clipboard-text="info@stolovay.ru">
            <span>Скопировать</span>
          </div>
        </div>
        <div class="page-menu__phone phone">
          <a class="link" href="tel:+74957907205">
            <span>8 495 790-72-05</span>
          </a>
          <div class="phone__wrapper">
            <div class="phone__left-side">
              <span class="phone__num">8&nbsp;495&nbsp;790-72-05</span>
              <span class="phone__text1">
                Мы принимаем звонки без выходных.
              </span>
              <span class="phone__text2">
                Выберите способ связи:
              </span>
              <ul class="phone__list">
                <li class="phone__list-elem">
                  <a class="phone__list-link phone__list-link--phone" href="tel:+74957907205">
                    <span class="phone__list-text">Мобильный</span>
                  </a>
                </li>
                <li class="phone__list-elem">
                  <a class="phone__list-link phone__list-link--viber" href="#viber">
                    <span class="phone__list-text">Viber</span>
                  </a>
                </li>
                <li class="phone__list-elem">
                  <a class="phone__list-link phone__list-link--telegram" href="#telegram">
                    <span class="phone__list-text">Telegram</span>
                  </a>
                </li>
                <li class="phone__list-elem">
                  <a class="phone__list-link phone__list-link--whatsapp" href="#whatsapp">
                    <span class="phone__list-text">Whatsapp</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="phone__right-side">
              <span class="phone__title">
                Обратный звонок:
              </span>
              <span class="phone__text1">
                Мы перезвоним вам в течении часа
              </span>
              <form action="#" method="post" class="phone__form">
                <label  class="phone__label" for="phone-input-name">Имя:</label>
                <input class="phone__input" type="text" id="phone-input-name" placeholder="Анна">
                <label  class="phone__label" for="phone-input-tel">
                  Телефон:
                </label>
                <input class="phone__input" type="tel" id="phone-input-tel" placeholder="+7(123)456-78-90">
                <button class="phone__submit" type="submit">Отправить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-header__middle">
    <div class="container container--header-middle">
      <div class="logo">
        <img class="logo__image" src="./img/logo.png" alt="logo" />
        <span class="logo__text">Столовая.РУ</span>
      </div>
      <form action="#" method="get" name="search-form" id="search-form">
        <div class="select-wrapper">
          <select name="category" id="search-category">
            <option value="Все">Все</option>
            <option value="Весовое">Весовое</option>
            <option value="Для магазинов">Для магазинов</option>
            <option value="Для обеденных залов">Для обеденных залов</option>
            <option value="Нейтральное">Нейтральное</option>
            <option value="Для бара">Для бара</option>
            <option value="Для фаст-фуд">Для фаст-фуд</option>
            <option value="Посудомоечное">Посудомоечное</option>
            <option value="Тепловое">Тепловое</option>
            <option value="Термоподносы">Термоподносы</option>
            <option value="Хлебопекарное">Хлебопекарное</option>
            <option value="Холодильное">Холодильное</option>
            <option value="Электромеханическое">Электромеханическое</option>
          </select>
        </div>
        <input type="search" name="search" id="search-value" />
        <button type="submit" id="search-btn"></button>
      </form>
      <div class="portal">
        <a class="link" href="#" target="_blank" rel="noopener noreferrer">
          <span>Мы на портале поставщиков</span>
        </a>
      </div>
      <div class="cart">
        <a class="link" href="#">
          <div class="cart__wrapper">
            <span class="cart__sum">Сумма</span>
            <span class="cart__value">150 000 руб.</span>
          </div>
          <span class="cart__amount">12</span>
        </a>
      </div>
    </div>
  </div>
  <div class="page-header__bottom">
    <div class="container">
      <div class="glide categories">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides categories__list">
            <li class="glide__slide categories__elem">
              <a href="#teplovoe" class="categories__link">
                <img class="categories__img" src="./img/teplovoe.png" alt="Тепловое оборудование(фото)">
                <span class="categories__text">Тепловое</span>
              </a>
            </li>

            <li class="glide__slide categories__elem">
              <a href="#holodilnoe" class="categories__link">
                <img class="categories__img" src="./img/holodilnoe.png" alt="Холодильное оборудование(фото)">
                <span class="categories__text">Холодильное</span>
              </a>
            </li>

            <li class="glide__slide categories__elem">
              <a href="#elektromeh" class="categories__link">
                <img class="categories__img" src="./img/elektromeh.png" alt="Электромеханическое оборудование(фото)">
                <span class="categories__text">Электромеханическое</span>
              </a>
            </li>

            <li class="glide__slide categories__elem">
              <a href="#posudomoechnoe" class="categories__link">
                <img class="categories__img" src="./img/posudomoechnoe.png" alt="Посудомоечное оборудование(фото)">
                <span class="categories__text">Посудомоечное</span>
              </a>
            </li>

            <li class="glide__slide categories__elem">
              <a href="#hlebopekarnoe" class="categories__link">
                <img class="categories__img" src="./img/hlebopekarnoe.png" alt="Хлебопекарное оборудование(фото)">
                <span class="categories__text">Хлебопекарное</span>
              </a>
            </li>
            
            <li class="glide__slide categories__elem">
              <a href="#liniirazdachi" class="categories__link">
                <img class="categories__img" src="./img/liniirazdachi.png" alt="Линии раздачи(фото)">
                <span class="categories__text">Линии раздачи</span>
              </a>
            </li>

            <li class="glide__slide categories__elem">
              <a href="#neytralnoe" class="categories__link">
                <img class="categories__img" src="./img/neytralnoe.png" alt="Нейтральное(фото)">
                <span class="categories__text">Нейтральное</span>
              </a>
            </li>

            <li class="glide__slide categories__elem">
              <a href="#fastfood" class="categories__link">
                <img class="categories__img" src="./img/fastfood.png" alt="Для фаст фуда(фото)">
                <span class="categories__text">Для фаст фуда</span>
              </a>
            </li>

            <li class="glide__slide categories__elem">
              <a href="#dlyazalov" class="categories__link">
                <img class="categories__img" src="./img/dlyazalov.png" alt="Для залов(фото)">
                <span class="categories__text">Для залов</span>
              </a>
            </li>

            <li class="glide__slide categories__elem">
              <a href="#vspomogatelnoe" class="categories__link">
                <img class="categories__img" src="./img/vspomogatelnoe.png" alt="Вспомогательное(фото)">
                <span class="categories__text">Вспомогательное</span>
              </a>
            </li>

            <li class="glide__slide categories__elem">
              <a href="#dlyamagazinov" class="categories__link">
                <img class="categories__img" src="./img/dlyamagazinov.png" alt="Для магазинов(фото)">
                <span class="categories__text">Для магазинов</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="glide__arrows categories__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left categories__arrow categories__arrow--left" data-glide-dir="<"></button>
          <button class="glide__arrow glide__arrow--right categories__arrow categories__arrow--right" data-glide-dir=">"></button>
        </div>
      </div>
    </div>
  </div>
  </header>`;

const mobileHeader = `
<header class="page-header-mobile">
  <div class="container-mobile">
    <div class="page-header-mobile__wrapper">
      <div class="page-header-mobile__burger">
        <div class="page-header-mobile__burger-line"></div>
    </div>
    <div class="page-header-mobile__logo">
      <img class="page-header-mobile__logo-image" src="./img/logo-mobile.png" alt="logo" />
      <div class="page-header-mobile__logo-text">
        <span class="page-header-mobile__logo-text1">Столовая.РУ</span>
        <span class="page-header-mobile__logo-text2">Создание пищеблоков</span>
      </div>
    </div>
    <div class="page-header-mobile__search">
      <img src="./img/search-mobile.svg" alt="поиск" class="page-header-mobile__search-img">
      <form action="#" method="get" name="search-form" id="search-form-mobile">
        <input type="search" name="search" id="search-value-mobile" />
      </form>
    </div>
    <div class="page-header-mobile__phone">
      <a class="link" href="tel:+74957907205">
        <img class="page-header-mobile__phone-img" src="./img/phone-mobile.png" alt="Телефон">
      </a>
    </div>
    <div class="page-header-mobile__cart">
      <a class="link" href="#">
        <img class="page-header-mobile__cart-img" src="./img/cart-mobile.png" alt="Корзина">
        <span class="page-header-mobile__cart-amount">12</span>
      </a>
    </div>
    </div>
  </div>
</header>
`;

function loadheader() {
  if (window.innerWidth <= 900) {
    document.querySelector('.main-wrapper').insertAdjacentHTML("afterbegin", mobileHeader);
    const burger = document.querySelector(".page-header-mobile__burger");
    const search = document.querySelector(".page-header-mobile__search");
    let slideout = new Slideout({
      panel: document.querySelector(".main-wrapper"),
      menu: document.querySelector(".menu-mobile"),
      padding: 256,
      tolerance: 70,
    });
    burger.addEventListener("click",  () => slideout.toggle());
    search.addEventListener("click", () =>
      search.classList.toggle("page-header-mobile__search--opened")
    );
  } else {
    document.querySelector(".main-wrapper").insertAdjacentHTML("afterbegin", desktopHeader);
    makeHeaderHide();
  }
}


module.exports = loadheader;