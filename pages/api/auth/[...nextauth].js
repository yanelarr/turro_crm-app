import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  // Configure one or more authentication providers

  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        username: {
          label: "Usuario",
          type: "text",
          placeholder: "Nombre de Usuario",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        const url = `${process.env.API_URL}login`;

        const response = await axios.post(url, {
          username: credentials.username,
          password: credentials.password,
        }, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "accept-Language": credentials.locale
          }
        });

        if (response.status == 200) {
          // expire in 30 days

          const user = {
            id: response.data.user_id,
            fullname: response.data.fullname,
            job: response.data.job,
            token: response.data.token,
            locale: credentials.locale,
          };

          if (user) {
            // return user
            return Promise.resolve(user);
          } else {
            // return null
            return Promise.resolve(null);
          }
        }
        // return null;
        return Promise.resolve(null);
      },
    }),
  ],
  // theme: {
  //   colorScheme: "light",
  // },
  pages: {
    signIn: "/login",
    //    signOut: '/signout',
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = user;
      }
      return token;
    },
    session: (seshProps) => {
      return seshProps.token;
    },
  },
  secret: process.env.TOKEN_SECRET,
  jwt: {
    secret: process.env.TOKEN_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
});

// export default NextAuth(options)
