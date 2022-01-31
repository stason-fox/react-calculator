import "./Calculator.css";
import React, { useState } from "react";

const Calculator = () => {
    const [expression, setExpression] = useState("");
    const [answer, setAnswer] = useState(0);

    const display = (symbol) => {
        setExpression((prevValue) => {
            if (
                /[+*-/]/.test(symbol) &&
                /[+*-/]/.test(prevValue[prevValue.length - 1])
            ) {
                let newValue;
                if (/[-]/.test(symbol)) {
                    newValue = prevValue.slice(0, prevValue.length) + symbol;
                } else {
                    let count = 0;
                    for (let i = 0; i < prevValue.length; i++) {
                        if (isNaN(+prevValue[i])) {
                            count++;
                        } else {
                            count = 0;
                        }
                    }
                    newValue =
                        prevValue.slice(0, prevValue.length - count) + symbol;
                }
                setExpression(newValue);
            } else {
                if (prevValue) {
                    prevValue = prevValue + "";
                    let valArr = prevValue.split(/[+/*-]/g);
                    let lastNumber = valArr[valArr.length - 1];
                    if (
                        !isNaN(lastNumber) &&
                        /[.]/.test(lastNumber) &&
                        symbol === "."
                    ) {
                        symbol = "";
                    }
                }
                setExpression(
                    (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
                );
            }
        });
        setAnswer((prevValue) =>
            (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
        );
    };

    const calculate = () => {
        setAnswer(eval(expression));
        setExpression(eval(expression));
    };

    const allClear = () => {
        setExpression("");
        setAnswer(0);
    };

    const clear = () => {
        setExpression((prev) => {
            setAnswer(0);
            prev = prev + "";
            return prev
                .split("")
                .slice(0, prev.length - 1)
                .join("");
        });
    };

    return (
        <div className="calculator-grid">
            <div className="display">
                <input
                    className="expression"
                    type="text"
                    value={expression}
                    placeholder="0"
                    disabled
                ></input>
                <input
                    className="answer"
                    id="display"
                    value={answer}
                    disabled
                ></input>
            </div>
            <button onClick={allClear} className="clear" id="span-two">
                AC
            </button>
            <button onClick={clear} className="c">
                C
            </button>
            <button onClick={() => display("/")} className="divide">
                ÷
            </button>
            <button onClick={() => display("7")} className="seven">
                7
            </button>
            <button onClick={() => display("8")} className="eight">
                8
            </button>
            <button onClick={() => display("9")} className="nine">
                9
            </button>
            <button onClick={() => display("*")} className="multiply">
                x
            </button>
            <button onClick={() => display("4")} className="four">
                4
            </button>
            <button onClick={() => display("5")} className="five">
                5
            </button>
            <button onClick={() => display("6")} className="six">
                6
            </button>
            <button onClick={() => display("-")} className="subtract">
                -
            </button>
            <button onClick={() => display("1")} className="one">
                1
            </button>
            <button onClick={() => display("2")} className="two">
                2
            </button>
            <button onClick={() => display("3")} className="three">
                3
            </button>
            <button onClick={() => display("+")} className="add">
                +
            </button>
            <button
                onClick={() => display("0")}
                className="zero"
                id="lower-left"
            >
                0
            </button>
            <button onClick={() => display(".")} className="decimal">
                .
            </button>
            <button onClick={calculate} className="equals" id="lower-right">
                =
            </button>
        </div>
    );
};

export default Calculator;
