import { Link } from "react-router-dom";
import Layout from "../shared/Layout";

export const SignUp = () => {
  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-center font-bold">Sign Up</h1>

        <form action="" className="flex flex-col mt-6 gap-4">
          <input id="username" type="text" placeholder="Имя пользователя" className="w-full p-3 border rounded-lg" />
          <input id="email" type="email" placeholder="E-mail" className="w-full p-3 border rounded-lg" />
          <input id="password" type="password" placeholder="Пароль" className="w-full p-3 border rounded-lg" />

          <button disabled className="p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-50">
            Зарегистрироваться
          </button>
        </form>

        <div className="mt-6">
          <p>
            Вы уже зарегистрированы? <Link to="/sign-in">Войти</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};
