import { useState } from "react";

const RegisterPage = () => {
    // Стани для полів
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState(null); // сам файл
    const [photoPreview, setPhotoPreview] = useState(""); // URL для прев'ю

    const [fullNameValid, setFullNameValid] = useState(
        {
            isError: false,
            errorMessage: ""
        });
    const [emailValid,setEmailValid] = useState(
        {
            isError: false,
            errorMessage: ""
        });
    const [phoneValid, setPhoneValid] = useState(
        {isError: false,
            errorMessage: ""
        });
    const [passwordValid,setPasswordValid] = useState(

        {
            isError: false,
            errorMessage:""
        });
    const [photoValid,setPhotoValid] = useState(
        {
            isError: false,
            errorMessage: ""
        });

    // Стани для помилок (true/false)
    const [fullNameError, setFullNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [photoError, setPhotoError] = useState(false);

    // Тексти помилок
    const [fullNameErrorMsg, setFullNameErrorMsg] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [phoneErrorMsg, setPhoneErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [photoErrorMsg, setPhotoErrorMsg] = useState("");

    // ---- Функції валідації ----
    const validateFullName = (value) => {
        if (value.trim() === "") {
            setFullNameValid({isError: true, errorMessage: "Введіть ПІБ"});
            return false;
        } else if (value.trim().split(/\s+/).length < 2) {
            setFullNameValid({isError: true, errorMessage: "Введіть ім'я та прізвище (мінімум два слова)"});
            return false;
        } else {
            setFullNameValid({isError: false, errorMessage: ""});
            return true;
        }
    };

    const validateEmail = (value) => {
        // Простий regex для перевірки email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() === "") {
            setEmailValid({isError:true,errorMessage:"Введіть електронну пошту"});
            return false;
            //setEmailError(true);
            //setEmailErrorMsg("Введіть електронну пошту");
        } else if (!emailRegex.test(value.trim())) {
            setEmailValid({isError:true,errorMessage:"Невірний формат email"});
            return false;
            //setEmailError(true);
            //setEmailErrorMsg("Невірний формат email");
        } else {
            setEmailValid({isError:false,errorMessage:""});
            return true;
            //setEmailError(false);
            //setEmailErrorMsg("");
        }
    };

    const validatePhone = (value) => {
        // Дозволяємо цифри, пробіли, дужки, '+', мінімум 10 цифр
        const cleaned = value.replace(/[^0-9+]/g, "");
        if (cleaned === "") {
            setPhoneValid({isError:true, errorMessage:"Введіть номер телефону" });
            return false;
            //setPhoneError(true);
            //setPhoneErrorMsg("Введіть номер телефону");
        } else if (cleaned.replace(/[^0-9]/g, "").length < 10) {
            setPhoneValid({isError:true, errorMessage:"Номер має містити щонайменше 10 цифр" });
            return false;
            //setPhoneError(true);
            //setPhoneErrorMsg("Номер має містити щонайменше 10 цифр");
        } else {
            setPhoneValid({isError:false, errorMessage:"" });
            return true;
            //setPhoneError(false);
            //setPhoneErrorMsg("");
        }
    };

    const validatePassword = (value) => {
        if (value === "") {
            setPasswordValid({isError:true, errorMessage:"Введіть пароль" });
            return false;
            //setPasswordError(true);
            //setPasswordErrorMsg("Введіть пароль");
        } else if (value.length < 6) {
            setPasswordValid({isError:true, errorMessage:"Пароль має містити щонайменше 6 символів"});
            return false;
            //setPasswordError(true);
            ///setPasswordErrorMsg("Пароль має містити щонайменше 6 символів");
        } else {
            setPasswordValid({isError:false, errorMessage:""});
            return true;
            //setPasswordError(false);
            //setPasswordErrorMsg("");
        }
    };

    const validatePhoto = (file) => {
        if (!file) {
            setPhotoValid({isError: true, errorMessage:"Оберіть фото" })
            //setPhotoError(true);
            //setPhotoErrorMsg("Оберіть фото");
            return false;
        }
        // Перевіряємо, чи це зображення
        if (!file.type.startsWith("image/")) {
            setPhotoValid({isError: true, errorMessage:"Файл має бути зображенням" })
            //setPhotoError(true);
            //setPhotoErrorMsg("Файл має бути зображенням");
            return false;
        }
        setPhotoValid({isError: false, errorMessage:""});
        //setPhotoError(false);
        //setPhotoErrorMsg("");
        return true;
    };

    // ---- Обробники змін ----
    const onChangeFullName = (e) => {
        const value = e.target.value;
        setFullName(value);
        validateFullName(value);
    };

    const onChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const onChangePhone = (e) => {
        const value = e.target.value;
        setPhone(value);
        validatePhone(value);
    };

    const onChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const onChangePhoto = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        if (file) {
            // Перевіряємо валідність файлу
            const isValid = validatePhoto(file);
            if (isValid) {
                // Створюємо URL для прев'ю
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPhotoPreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setPhotoPreview(""); // якщо невалідний – чистимо прев'ю
            }
        } else {
            setPhotoPreview("");
            validatePhoto(null); // викликає помилку
        }
    };

    // ---- Відправка форми ----
    const onHandleSubmit = (e) => {
        e.preventDefault();
        console.log("fullName = ", fullName);

        // Повторно перевіряємо всі поля (на випадок, якщо користувач не вийшов з поля)
        const isValidFullName = validateFullName(fullName); //Валідація виконується асинхронно.
        const isValidateEmail = validateEmail(email);
        const isValidatePhone = validatePhone(phone);
        const isValidatePassword = validatePassword(password);
        const isPhoto = validatePhoto(photo);

        // Якщо є хоч одна помилка – не відправляємо
        if (!isValidFullName || !isValidateEmail || !isValidatePhone || !isValidatePassword || !isPhoto) {
            alert("Будь ласка, виправте помилки у формі");
            return;
        }


        // Якщо всі поля валідні
        console.log("----Реєстрація користувача-----");
        console.log("ПІБ:", fullName);
        console.log("Email:", email);
        console.log("Телефон:", phone);
        console.log("Пароль:", password);
        console.log("Фото:", photo ? photo.name : "не вибрано");

        alert("Реєстрація успішна! (демо)");
        // Скидаємо форму (за бажанням)
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setPhoto(null);
        setPhotoPreview("");
        // Скидаємо помилки
        // setFullNameError(false);
        // setFullNameErrorMsg("");
        // setFullNameValid({isError: false, errorMessage: ""});
        //setEmailError(false);
        //setEmailErrorMsg("");
        //setPhoneError(false);
        //setPhoneErrorMsg("");
        //setPasswordError(false);
        //setPasswordErrorMsg("");
        //setPhotoError(false);
        //setPhotoErrorMsg("");
        // Скидаємо input file (важливо для можливості повторного вибору того ж файлу)
        document.getElementById("photoInput").value = "";
    };

    // ---- Допоміжна функція для класів Bootstrap ----
    const getFieldClass = (error, value) => {
        if (error) return "is-invalid";
        if (value !== "" && !error) return "is-valid";
        return "";
    };

    return (
        <div className="container mt-2">
            <h1 className="text-center">Реєстрація на сайті</h1>
            <form className="col-md-6 offset-md-3" onSubmit={onHandleSubmit}>
                {/* ПІБ */}
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">ПІБ</label>
                    <input
                        type="text"
                        className={`form-control ${getFieldClass(fullNameValid.isError, fullName)}`}
                        id="fullName"
                        value={fullName}
                        onChange={onChangeFullName}
                        placeholder="Вальца Тихоша"
                    />
                    {fullNameValid.isError && <div className="invalid-feedback">{fullNameValid.errorMessage}</div>}
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Електронна пошта</label>
                    <input
                        type="email"
                        className={`form-control ${getFieldClass(emailValid.isError, email)}`}
                        id="email"
                        value={email}
                        onChange={onChangeEmail}
                        placeholder="user@example.com"
                    />
                    {emailValid.isError && <div className="invalid-feedback">{emailValid.errorMessage}</div>}
                </div>

                {/* Телефон */}
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Телефон</label>
                    <input
                        type="tel"
                        className={`form-control ${getFieldClass(phoneValid.isError, phone)}`}
                        id="phone"
                        value={phone}
                        onChange={onChangePhone}
                        placeholder="+380501234567"
                    />
                    {phoneError && <div className="invalid-feedback">{phoneValid.errorMessage}</div>}
                </div>

                {/* Пароль */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input
                        type="password"
                        className={`form-control ${getFieldClass(passwordValid.isError, password)}`}
                        id="password"
                        value={password}
                        onChange={onChangePassword}
                        placeholder="Мінімум 6 символів"
                    />
                    {passwordError && <div className="invalid-feedback">{passwordValid.errorMessage}</div>}
                </div>

                {/* Фото */}
                <div className="mb-3">
                    <label htmlFor="photoInput" className="form-label">Фото профілю</label>
                    <input
                        type="file"
                        className={`form-control ${getFieldClass(photoValid.isError, photo ? "filled" : "")}`}
                        id="photoInput"
                        accept="image/*"
                        onChange={onChangePhoto}
                    />
                    {photoError && <div className="invalid-feedback">{photoValid.errorMessage}</div>}
                    {/* Прев'ю фото */}
                    {photoPreview && (
                        <div className="mt-2">
                            <img
                                src={photoPreview}
                                alt="Прев'ю фото"
                                style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "8px" }}
                            />
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-success">Зареєструватися</button>
            </form>
        </div>
    );
};
export default RegisterPage;
