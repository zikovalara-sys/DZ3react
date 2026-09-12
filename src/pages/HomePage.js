import {useState} from "react";

const HomePage = () => {
    //Ми робимо спеціальний state - який зберігає інформацію
    //Ми створили змінну count, яка зберігає 0
    //setCount - це спеціальна змінна, для зміни count
    //якщо ми викликає setCount, то відбувається Render - компонента
    const [count, setCount] = useState(0);
    const onHandlePlusClick = () => {
        setCount(count + 1); // Будемо збільшувати значення count+1
    }
    const onHandleMinusClick = () => {
        setCount(count - 1); // Будемо зменшувати значення count-1
    }
    return (
        <>
            <h1 className="text-center">Привіт команда :)</h1>
            <div className="alert alert-info" role="alert">
                Кількість елементів {count}
            </div>
            <button className="btn btn-success" onClick={onHandlePlusClick}>
                Змінити кількість на +1
            </button>
            <button className="btn btn-danger" onClick={onHandleMinusClick}>
                Змінити кількість на -1
            </button>
        </>
    )
}

export default HomePage;

