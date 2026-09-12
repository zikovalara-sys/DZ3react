import QRCode from "react-qr-code";
import { useState } from "react";

const QRPage = () => {
    const [qrCode, setQrCode] = useState("https://europeservice.com.ua/");
    const [error, setError] = useState("");

    const onQrCodeChange = (e) => {
        const value = e.target.value;
        setQrCode(value);

        // Перевірка на порожнє поле
        if (value.trim() === "") {
            setError("Поле не повинно бути порожнім");
        } else {
            setError("");
        }
    };

    return (
        <div className="container">
            <div className="col-md-8 offset-md-2 mt-2">
                <h1 className="text-center">Генерація QR кодів</h1>

                <div className="mb-3">
                    <label htmlFor="myInputQR" className="form-label">
                        Вкажіть посилання на сайт
                    </label>
                    <input
                        type="text"
                        className={`form-control ${error ? "is-invalid" : ""}`}
                        id="myInputQR"
                        value={qrCode}
                        onChange={onQrCodeChange}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>

                {/* Показувати QR-код тільки якщо поле не порожнє */}
                {qrCode.trim() !== "" && <QRCode value={qrCode} />}
            </div>
        </div>
    );
};

export default QRPage;