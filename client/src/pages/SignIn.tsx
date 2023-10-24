import { useRef } from "react";
import Layout from "../shared/Layout";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../features/user/userSlice";

export const SignIn = () => {
  const { loading, error } = useSelector((state: RootState) => state.user);
  const formSignIn = useRef<HTMLFormElement>(null);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let formData = {};

    if (formSignIn.current) {
      formData = {
        email: formSignIn.current["email"].value,
        password: formSignIn.current["password"].value,
      };
    }

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    try {
      dispatch(signInStart());
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigation("/profile");
    } catch {
      dispatch(signInFailure("Ошибка сервера, попробуйте ещё раз"));
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-center font-bold">Войти</h1>

        <form ref={formSignIn} onSubmit={handlerSubmit} className="flex flex-col mt-6 gap-4">
          <input id="email" type="email" placeholder="E-mail" className="w-full p-3 border rounded-lg" autoComplete="email" required />
          <input id="password" type="password" placeholder="Пароль" className="w-full p-3 border rounded-lg" autoComplete="password" required />

          <button disabled={loading} className="p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-50">
            {loading ? "Вхожу…" : "Войти"}
          </button>
        </form>

        <div className="mt-6">
          <p>
            Не зарегистрированы? <Link to="/sign-up">Регистрация</Link>
          </p>
        </div>

        {error && (
          <div className="mt-6">
            <p className=" text-red-500">{error}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
