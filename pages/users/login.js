import Image from "next/image";
import { useContext } from "react";
import { getSession } from "next-auth/react";
import AppContext from "../../AppContext";
import { Input, InputGroup } from "reactstrap";
import Head from "next/head";

import LoginForm from "../../components/Users/LoginForm";

export default function Login({ session }) {
  const value = useContext(AppContext);
  let { languageSelected } = value.state;
  const t = value.state.languages.login;

  const handleChange = (event) => {
    value.setLanguageSelected(event.target.value);
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/domino.ico" />
        <title>{t.pageTitle}</title>
      </Head>

      <div className="login-container min-vh-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-12 mx-auto">
              <div className="text-center image-size-small position-relative">
                <Image
                  src="/profile/user-vector.jpg"
                  alt=""
                  width="100%"
                  height="100%"
                  className="rounded-circle p-2 bg-white"
                />
              </div>
              <div className="p-5 bg-white rounded shadow-lg">
                <h3 className="mb-2 text-center pt-5">{t.signIn}</h3>
                <p className="text-center lead">{t.comment}</p>
                <LoginForm />
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <InputGroup size="sm">
                        <Input
                          id="languaje"
                          name="select"
                          type="select"
                          defaultValue={languageSelected}
                          onClick={handleChange}
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                        </Input>
                      </InputGroup>
                    </div>

                    <div className="col-8 pt-2">
                      <div className="row justify-content-end">
                        <div className="col-4 text-end align-middle">
                          <a className="text-dark" href="#">
                            {t.help}
                          </a>
                        </div>
                        <div className="col-4 text-end">
                          <a className="text-dark" href="#">
                            {t.privacy}
                          </a>
                        </div>
                        <div className="col-4 text-end">
                          <a className="text-dark" href="#">
                            {t.term}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: {
      session,
    },
  };
};
