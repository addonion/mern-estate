import { useRef, useState } from "react";
import Layout from "../shared/Layout";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formSignIn = useRef<HTMLFormElement>(null);

  const navigation = useNavigate();

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        <h1 className="text-center font-bold">Sign In</h1>

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
