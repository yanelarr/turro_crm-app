import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";
import Topbar from "../components/Core/Topbar";
import Sidebar from "../components/Core/Sidebar";
import Footer from "../components/Core/Footer";

import Breadcrumb from "../components/Core/Breadcrumbs/Breadcrumbs";
import BreadcrumbItem from "../components/Core/Breadcrumbs/BreadcrumbItem";

export default function Layout({ children, user, title }) {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1,
        isDisabled: index === 0 && pathArray.length > 1,
      };
    });
    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return (
    <>
      <Topbar user={user} />

      <Sidebar />

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>{title}</h1>
          <Breadcrumb>
            <BreadcrumbItem
              isCurrent={router.pathname === "/"}
              href="/"
              icon="bi bi-house-door-fill"
            >
              Home
            </BreadcrumbItem>
            {breadcrumbs &&
              breadcrumbs.map((breadcrumb) => (
                <BreadcrumbItem
                  key={breadcrumb.href}
                  href={breadcrumb.href}
                  isCurrent={breadcrumb.isCurrent}
                  isDisabled={breadcrumb.isDisabled}
                >
                  {breadcrumb.label}
                </BreadcrumbItem>
              ))}
          </Breadcrumb>
        </div>

        {children}

        <a
          href="#"
          className="back-to-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>
      </main>

      <Footer />
    </>
  );
}

Layout.proptypes = {
  children: PropTypes.node
};
