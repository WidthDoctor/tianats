import React, { useState } from "react";
import MainMenu from "./Pages/MainMenu/MainMenu";
import General from "./Pages/General/GeneralPage";
import Footer from "./Pages/Footer/Footer";
import Procedure from "./Pages/WorkShop/Procedure";
import BigSize from "./Pages/BigSize/BigSize";
const App: React.FC = () => {
    const [page, setPage] = useState<string>('general');
// Функция для переключения страницы
const selectPage = (pageName: string): Promise<void> => {
    return new Promise((resolve) => {
      setPage(pageName); // Меняем страницу
      resolve(); // Резолвим промис сразу
    });
  };

  const renderPage = () => {
    switch (page) {
      case 'procedure':
        return <Procedure />;
      case 'BigSize':
        return <BigSize />;
      case 'general':
      default:
        return <General onSelectPage={selectPage}/>;
    }
  };

  return (
    <>
      <MainMenu onSelectPage={selectPage}/>
      {renderPage()}
      <Footer />
    </>
  );
}
export default App;
