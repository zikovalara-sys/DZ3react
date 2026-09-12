import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Стани для помилок
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    // Функції валідації
    const validateEmail = (value) => {
        if (value === "") {
            setEmailError(true);
            setEmailErrorMsg("Введіть електронну пошту");
        } else if (value === "admin@gmail.com") {
            setEmailError(false);
            setEmailErrorMsg("");
        } else {
            setEmailError(true);
            setEmailErrorMsg("Невірна електронна пошта");
        }
    };

    const validatePassword = (value) => {
        if (value === "") {
            setPasswordError(true);
            setPasswordErrorMsg("Введіть пароль");
        } else if (value === "123456") {
            setPasswordError(false);
            setPasswordErrorMsg("");
        } else {
            setPasswordError(true);
            setPasswordErrorMsg("Невірний пароль");
        }
    };

    // Обробники змін
    const onChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const onChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    // Обробник відправки форми
    const onHandleSubmit = (e) => {
        e.preventDefault();
        console.log("----Вхід користувача-----");
        console.log("Email = ", email);
        console.log("Password = ", password);

        if (email === "admin@gmail.com" && password === "123456") {
            alert("Вітаємо Адміна у системі");
            setEmail("");
            setPassword("");
            // Скидаємо помилки
            setEmailError(false);
            setEmailErrorMsg("");
            setPasswordError(false);
            setPasswordErrorMsg("");
        } else {
            alert("Щось пішло не так :). Дані не вірні");
        }
    };

    return (
        <div className="container mt-2">
            <h1 className="text-center">Вхід на сайт</h1>
            <form className="col-md-6 offset-md-3" onSubmit={onHandleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Електронна пошта</label>
                    <input
                        type="email"
                        className={`form-control ${
                            emailError
                                ? "is-invalid"
                                : email !== "" && !emailError
                                    ? "is-valid"
                                    : ""
                        }`}
                        id="email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    {emailError && (
                        <div className="invalid-feedback">{emailErrorMsg}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input
                        type="password"
                        className={`form-control ${
                            passwordError
                                ? "is-invalid"
                                : password !== "" && !passwordError
                                    ? "is-valid"
                                    : ""
                        }`}
                        id="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                    {passwordError && (
                        <div className="invalid-feedback">{passwordErrorMsg}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">Вхід</button>
            </form>
        </div>
    );
};

export default LoginPage;
