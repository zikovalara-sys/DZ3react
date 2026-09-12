import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Групуємо помилки в об'єкти для чистоти коду
    const [emailError, setEmailError] = useState({ isError: false, msg: "" });
    const [passwordError, setPasswordError] = useState({ isError: false, msg: "" });

    // Прапорці для відображення зеленої рамки успіху (is-valid)
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    // Регулярний вираз для перевірки коректності формату email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onHandleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        // 1. Валідація Email
        if (email.trim() === "") {
            setEmailError({ isError: true, msg: "Введіть електронну пошту" });
            setIsEmailValid(false);
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError({ isError: true, msg: "Некоректний формат електронної пошти (наприклад, user@mail.com)" });
            setIsEmailValid(false);
            isValid = false;
        } else {
            setEmailError({ isError: false, msg: "" });
            setIsEmailValid(true);
        }

        // 2. Валідація Пароля
        if (password === "") {
            setPasswordError({ isError: true, msg: "Введіть пароль" });
            setIsPasswordValid(false);
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError({ isError: true, msg: "Пароль має містити не менше 6 символів" });
            setIsPasswordValid(false);
            isValid = false;
        } else {
            setPasswordError({ isError: false, msg: "" });
            setIsPasswordValid(true);
        }

        // 3. Перевірка результату валідації
        if (isValid) {
            console.log("----Вхід користувача-----");
            console.log("Email = ", email);
            console.log("Password = ", password);

            alert("Вхід успішний! Вітаємо у системі.");

            // Скидання форми та успішних статусів
            setEmail("");
            setPassword("");
            setIsEmailValid(false);
            setIsPasswordValid(false);
        } else {
            alert("Будь ласка, виправте помилки у формі");
        }
    };

    return (
        <div className="container mt-2">
            <h1 className="text-center">Вхід на сайт</h1>
            <form className="col-md-6 offset-md-3" onSubmit={onHandleSubmit}>

                {/* Поле Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Електронна пошта</label>
                    <input
                        type="text" // змінено на text, щоб HTML5 не перебивав кастомну валідацію Bootstrap
                        className={`form-control ${
                            emailError.isError ? "is-invalid" : isEmailValid ? "is-valid" : ""
                        }`}
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError.isError) setEmailError({ isError: false, msg: "" });
                        }}
                    />
                    {emailError.isError && (
                        <div className="invalid-feedback">{emailError.msg}</div>
                    )}
                </div>

                {/* Поле Пароля */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input
                        type="password"
                        className={`form-control ${
                            passwordError.isError ? "is-invalid" : isPasswordValid ? "is-valid" : ""
                        }`}
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (passwordError.isError) setPasswordError({ isError: false, msg: "" });
                        }}
                    />
                    {passwordError.isError && (
                        <div className="invalid-feedback">{passwordError.msg}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">Вхід</button>
            </form>
        </div>
    );
};

export default LoginPage;