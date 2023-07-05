import { useState, useContext, useEffect, useRef } from "react";
import Layout from "../../layouts/Layout";

import AppContext from "../../AppContext";
import { getSession } from "next-auth/react";

import axios from "axios";
import Swal from "sweetalert2";
import fs from "fs";

import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

import Info from "../../components/Profile/Info";
import classnames from "classnames";
import View from "../../components/Profile/View";
import EditProfile from "../../components/Profile/Edit";
import ChangePassword from "../../components/Profile/ChangePassword";

export default function Profile({ session }) {
  const value = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);
  const [activeTab, setActiveTab] = useState("1");
  const [reload, setReload] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": session.locale,
      "Authorization": `Bearer ${session.token}`,
    },
  };

  const [profile, setProfile] = useState({
    id: "",
    username: "",
    fullname: "",
    dni: "",
    job: "",
    email: "",
    phone: "",
    photo: "",
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    value.setLanguageSelected(session.locale);

    const fetchData = async () => {
      const url = `/api/profile/services?id=${session.id}`;
      setLoading(true);

      try {
        const { data } = await axios.get(url, config);
        const tmp = data.result.data;

        console.log(tmp);

        profile.id = tmp.id;
        profile.username = tmp.username;
        profile.fullname = tmp.fullname;
        profile.dni = tmp.dni;
        profile.job = tmp.job;
        profile.email = tmp.email;
        profile.phone = tmp.phone;
        profile.photo = session.avatar;

        setProfile(profile);

        setLoading(false);

        setReload(false);
      } catch (error) {
        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al consultar la API...",
          showConfirmButton: true,
        });
      }
    };

    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      fetchData();
    } else {
      // do componentDidUpdate logic
      if (reload) {
        fetchData();
      }
    }
  });

  return (
    <Layout user={session} title={"Profile"}>
      <section className="section profile">
        <Row>
          <Col xl={4}>
            <Info profile={profile} />
          </Col>

          <Col xl={8}>
            <Card>
              <CardBody className="card-body pt-3">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      href="#"
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggleTab("1");
                      }}
                    >
                      Vista General
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        toggleTab("2");
                      }}
                    >
                      Editar Pérfil
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        toggleTab("3");
                      }}
                    >
                      Cambio de Contraseña
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <View profile={profile} />
                  </TabPane>
                  <TabPane tabId="2">
                    <EditProfile profile={profile} setProfile={setProfile} />
                  </TabPane>
                  <TabPane tabId="3">
                    <ChangePassword profile={profile} />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
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
