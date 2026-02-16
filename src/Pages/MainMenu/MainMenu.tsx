import React from "react";
import "./MainMenu.css";

interface MainMenuProps {
  onSelectPage: (pageName: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onSelectPage }) => {
  return (
    <>
      <section className="main-menu">
        <div className="menu_wrapper">
          <div className="title_container">
            <h1 id="main-menu__title">Tiana wedding</h1>
            <h3 id="main-menu__subtitle">мастерская татьяны поповой</h3>
          </div>
          <nav>
            <ul className="main-menu__list">
              <li onClick={() => onSelectPage('general')}>
                <a href="#">Главная</a>
              </li>
              <li className="first-dropdown">
                <a href="#">Мастерская <span className="triangle">&#9660;</span></a>
                <ul className="sub-menu">
                  <li onClick={() => onSelectPage('procedure')}>
                    <a href="#">Порядок работы</a>
                  </li>
                  <li className="types-selector">
                    <a href="#">Типы Платьев &raquo;</a>
                    <ul className="type-dress-submenu">
                      <li>
                        <a href="#">Бальное (пышное)</a>
                      </li>
                      <li>
                        <a href="#">Принцесса (А-силуэт)</a>
                      </li>
                      <li>
                        <a href="#">Греческое (Ампир)</a>
                      </li>
                      <li>
                        <a href="#">Рыбка (Русалка)</a>
                      </li>
                      <li>
                        <a href="#">Прямое (Колонна)</a>
                      </li>
                      <li>
                        <a href="#">Трапеция</a>
                      </li>
                      <li>
                        <a href="#">Мини и Миди</a>
                      </li>
                      <li>
                        <a href="#">Костюм</a>
                      </li>
                    </ul>
                  </li>
                  <li className="details-selector">
                    <a  href="#">Детали кроя &raquo;</a>
                    <ul className="details-submenu">
                      <li>
                        <a href="#">Линии выреза</a>
                      </li>
                      <li>
                        <a href="#">Спинка</a>
                      </li>
                      <li>
                        <a href="#">Рукав</a>
                      </li>
                      <li>
                        <a href="#">Шлейф</a>
                      </li>
                      <li>
                        <a href="#">Фата</a>
                      </li>
                      <li>
                        <a href="#">Аксессуары</a>
                      </li>
                      <li>
                        <a href="#">Топы и Болеро</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a onClick={() => onSelectPage('BigSize')} href="#">Большие размеры</a>
                  </li>
                </ul>
              </li>
              <li className="second-dropdown">
                <a href="#">Галерея <span className="triangle">&#9660;</span></a>
                <ul className="sub-menu">
                  <li>
                    <a href="#">Мои невесты</a>
                  </li>
                  <li>
                    <a href="#">Фотопроекты</a>
                  </li>
                  <li>
                    <a href="#">Большие размеры</a>
                  </li>
                </ul>
              </li>
              <li>
                <a onClick={() => onSelectPage('BigSize')} href="#">Большие размеры</a>
              </li>
              <li>
                <a href="#">Контакты</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}

export default MainMenu;
