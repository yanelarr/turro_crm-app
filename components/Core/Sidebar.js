import { useRouter } from "next/router";
import { useContext } from "react";
import AppContext from "../../AppContext";
import Link from "next/link";
import { menus } from "../../data";

const Sidebar = () => {
  const router = useRouter();
  const value = useContext(AppContext);
  const t = value.state.languages.breadcrumb;

  const mainMenu = (
    { id, text, path, iconClass, hasChild, parent_id, target },
    index
  ) => {
    if (id == 0) {
      return (
        <li className="nav-item" key={index}>
          <Link href={path}>
            <a
              className={
                router.asPath === path
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
            >
              <i className={iconClass}></i>
              <span>{t[text]}</span>
            </a>
          </Link>
        </li>
      );
    } else {
      if (hasChild) {
        return (
          <li className="nav-item" key={index}>
            <a
              className={
                router.asPath === path
                  ? "nav-link collapsed"
                  : "nav-link collapsed"
              }
              data-bs-target={"#" + target}
              data-bs-toggle="collapse"
            >
              <i className={iconClass}></i>
              <span>{text}</span>
              <i className="bi bi-chevron-right ms-auto"></i>
            </a>

            <ul
              id={target}
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              {menus.map(({ text, path, parent_id }, idx) => {
                if (parent_id == id) {
                  return (
                    <li key={idx}>
                      <Link href={path}>
                        <a href="#">
                          <i className="bi bi-circle"></i>
                          <span>{t[text]}</span>
                        </a>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </li>
        );
      } else {
        if (!parent_id && path != "-") {
          return (
            <li className="nav-item" key={index}>
              <Link href={path}>
                <a
                  className={
                    router.asPath === path
                      ? "nav-link active"
                      : "nav-link collapsed"
                  }
                >
                  <i className={iconClass}></i>
                  <span>{t[text]}</span>
                </a>
              </Link>
            </li>
          );
        } else {
          if (path == "-") {
            return (
              <li className="nav-heading" key={index}>
                {t[text]}
              </li>
            );
          }
        }
      }
    }
  };

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {menus.map((menu, index) => {
          return mainMenu(menu, index);
        })}
      </ul>
    </aside>
  );
};
export default Sidebar;
