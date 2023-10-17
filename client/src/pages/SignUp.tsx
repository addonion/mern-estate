import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../shared/Layout";

export const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formSignUp = useRef<HTMLFormElement>(null);

  const navigation = useNavigate();

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let formData = {};

    if (formSignUp.current) {
      formData = {
        username: formSignUp.current["username"].value,
        email: formSignUp.current["email"].value,
        password: formSignUp.current["password"].value,
      };
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    try {
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setError(null);
      navigation("/profile");
    } catch {
      setLoading(false);
      setError("Ошибка сервера, попробуйте ещё раз");
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-center font-bold">Sign Up</h1>

        <form ref={formSignUp} onSubmit={handlerSubmit} className="flex flex-col mt-6 gap-4">
          <input id="username" type="text" placeholder="Имя пользователя" className="w-full p-3 border rounded-lg" autoComplete="name" required />
          <input id="email" type="email" placeholder="E-mail" className="w-full p-3 border rounded-lg" autoComplete="email" required />
          <input id="password" type="password" placeholder="Пароль" className="w-full p-3 border rounded-lg" autoComplete="password" required />

          <button disabled={loading} className="p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-50">
            {loading ? "Регистрация…" : "Зарегистрироваться"}
          </button>
        </form>

        <div className="mt-6">
          <p>
            Вы уже зарегистрированы? <Link to="/sign-in">Войти</Link>
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
