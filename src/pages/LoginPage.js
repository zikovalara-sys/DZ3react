import { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    // Валідація Email при введенні
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailTouched(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
            setEmailError("Електронна пошта є обов'язковою");
        } else if (!emailRegex.test(value)) {
            setEmailError("Некоректний формат електронної пошти");
        } else {
            setEmailError("");
        }
    };

    // Валідація Пароля при введенні (мінімум 6 символів)
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordTouched(true);

        if (!value) {
            setPasswordError("Пароль є обов'язковим");
        } else if (value.length < 6) {
            setPasswordError("Пароль має містити щонайменше 6 символів");
        } else {
            setPasswordError("");
        }
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();

        // Якщо є помилки або поля порожні — не пускаємо далі
        if (emailError || passwordError || !email || !password) {
            alert("Будь ласка, виправте помилки у формі перед входом");
            return;
        }

        // ТУТ ЗМІНЕНО: Тепер пускає з будь-якими даними, які пройшли попередню валідацію
        console.log("---- Вхід успішний! -----");
        console.log("Email користувача: ", email.trim());

        alert(`Вітаємо у системі! Ви увійшли як: ${email.trim()}`);

        // Очищаємо форму після успішного входу
        setEmail("");
        setPassword("");
        setEmailTouched(false);
        setPasswordTouched(false);
    };

    const getEmailClass = () => {
        if (!emailTouched) return "form-control";
        return emailError ? "form-control is-invalid" : "form-control is-valid";
    };

    const getPasswordClass = () => {
        if (!passwordTouched) return "form-control";
        return passwordError ? "form-control is-invalid" : "form-control is-valid";
    };

    return (
        <div className="container mt-2">
            <h1 className="text-center">Вхід на сайт</h1>
            <form className="col-md-6 offset-md-3" onSubmit={onHandleSubmit} noValidate>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Електронна пошта</label>
                    <input
                        type="email"
                        className={getEmailClass()}
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input
                        type="password"
                        className={getPasswordClass()}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>

                {/* Кнопка заблокована, поки користувач не введе правильний email та хоча б 6 знаків пароля */}
                <button type="submit" className="btn btn-primary" disabled={!!emailError || !!passwordError || !email || !password}>
                    Вхід
                </button>
            </form>
        </div>
    );
};

export default LoginPage;