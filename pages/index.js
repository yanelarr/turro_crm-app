import Layout from "../layouts/Layout";
import Infocard from "../components/Dashboard/Infocard";
import { useContext, useEffect } from "react";
import AppContext from "../AppContext";
import { getSession } from "next-auth/react";
import fs from "fs";

export default function Home({ session }) {
  const value = useContext(AppContext);
  useEffect(() => {
    value.setLanguageSelected(session.locale);
  }, [session.locale, value]);

  const t = value.state.languages.home;

  return (
    <Layout user={session} title={t.title}>
      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <Infocard
                name={"sales"}
                title={t.sales}
                clsIcon={"bi bi-cart"}
                value={"145"}
                percent={"12%"}
                moment={t.salesMoment}
                status={t.salesStatus}
              />
              <Infocard
                name={"revenue"}
                title={t.revenue}
                clsIcon={"bi bi-currency-dollar"}
                value={"$3,264"}
                percent={"8%"}
                moment={t.revenueMoment}
                status={t.revenueStatus}
              />
              <Infocard
                name={"customers"}
                title={t.partner}
                clsIcon={"bi bi-people"}
                value={"1244"}
                percent={"12%"}
                moment={t.partnerMoment}
                status={t.partnerStatus}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown">
                  <i className="bi bi-three-dots"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>

                  <li>
                    <a className="dropdown-item" href="#">
                      Today
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Month
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Year
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                <h5 className="card-title">
                  Recent Activity <span>| Today</span>
                </h5>

                <div className="activity">
                  <div className="activity-item d-flex">
                    <div className="activite-label">32 min</div>
                    <i className="bi bi-circle-fill activity-badge text-success align-self-start"></i>
                    <div className="activity-content">
                      Quia quae rerum{" "}
                      <a href="#" className="fw-bold text-dark">
                        explicabo officiis
                      </a>{" "}
                      beatae
                    </div>
                  </div>

                  <div className="activity-item d-flex">
                    <div className="activite-label">56 min</div>
                    <i className="bi bi-circle-fill activity-badge text-danger align-self-start"></i>
                    <div className="activity-content">
                      Voluptatem blanditiis blanditiis eveniet
                    </div>
                  </div>

                  <div className="activity-item d-flex">
                    <div className="activite-label">2 hrs</div>
                    <i className="bi bi-circle-fill activity-badge text-primary align-self-start"></i>
                    <div className="activity-content">
                      Voluptates corrupti molestias voluptatem
                    </div>
                  </div>

                  <div className="activity-item d-flex">
                    <div className="activite-label">1 day</div>
                    <i className="bi bi-circle-fill activity-badge text-info align-self-start"></i>
                    <div className="activity-content">
                      Tempore autem saepe{" "}
                      <a href="#" className="fw-bold text-dark">
                        occaecati voluptatem
                      </a>{" "}
                      tempore
                    </div>
                  </div>

                  <div className="activity-item d-flex">
                    <div className="activite-label">2 days</div>
                    <i className="bi bi-circle-fill activity-badge text-warning align-self-start"></i>
                    <div className="activity-content">
                      Est sit eum reiciendis exercitationem
                    </div>
                  </div>

                  <div className="activity-item d-flex">
                    <div className="activite-label">4 weeks</div>
                    <i className="bi bi-circle-fill activity-badge text-muted align-self-start"></i>
                    <div className="activity-content">
                      Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/users/login",
        permanent: false,
      },
    };

  const userImage = `./public/profile/${session.id}.jpg`;
  const fileExists = fs.existsSync(userImage);
  if (fileExists) {
    session["avatar"] = `/profile/${session.id}.jpg`;
  } else {
    session["avatar"] = "/profile/empty.jpg";
  }

  return {
    props: {
      session,
    },
  };
};
