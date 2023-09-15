// import { displayLoading, hideLoading } from "./DisplayLoading";
// import React, { useState, useEffect } from "react";
// import LoadingIndicator from "./LoadingIndicator";

// const CurrencyConverter = () => {
//   const [rates, setRates] = useState({});
//   const [selectedCode, setSelectedCode] = useState("GBP");
//   const [inputValue, setInputValue] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);

//   const ratesUrl = "https://api.nbp.pl/api/exchangerates/tables/c";

//   // useEffect(() => {
//   //   getRates();
//   // }, []);

//   const getRates = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(ratesUrl);
//       const data = await res.json();
//       const rateList = data[0]?.rates;

//       const filteredRates = rateList.filter((rate) =>
//         ["EUR", "USD", "CHF", "GBP"].includes(rate.code)
//       );

//       const ratesObject = {};
//       filteredRates.forEach((rate) => {
//         ratesObject[rate.code] = rate;
//       });

//       setRates(ratesObject);
//     } catch (error) {
//       alert("Problem z pobieraniem danych spróbuj ponownie!");
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateResult = () => {
//     const selectedRate = rates[selectedCode];
//     const parsedInputValue = parseFloat(inputValue);

//     if (selectedRate && !isNaN(parsedInputValue) && parsedInputValue > 0) {
//       const convertedValue = parsedInputValue * selectedRate.bid;
//       setResult(`TO: ${convertedValue.toFixed(2)} PLN`);
//     } else {
//       setResult("Coś poszło nie tak.");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // calculateResult();
//     getRates();
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <select
//           value={selectedCode}
//           onChange={(e) => setSelectedCode(e.target.value)}
//         >
//           {/* Options for currency selection */}
//         </select>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//         />
//         <button type="submit">Calculate</button>
//       </form>
//       {loading && <LoadingIndicator />}
//       <div className="result">{result}</div>
//     </div>
//   );
// };

// export default CurrencyConverter;

import React, { useState, useEffect } from "react";
import Loading from "../Components/Loading/Loading";
import Form from "../Components/Form/Form";

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [selectedCode, setSelectedCode] = useState("GBP");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const ratesUrl = "https://api.nbp.pl/api/exchangerates/tables/c";

  useEffect(() => {
    getRates();
  }, []);

  const getRates = async () => {
    setLoading(true);
    try {
      const res = await fetch(ratesUrl);
      const data = await res.json();
      const rateList = data[0]?.rates;

      const filteredRates = rateList.filter((rate) =>
        ["EUR", "USD", "CHF", "GBP"].includes(rate.code)
      );

      const ratesObject = {};
      filteredRates.forEach((rate) => {
        ratesObject[rate.code] = rate;
      });

      setRates(ratesObject);
      // calculateResult(); /// ERROR
    } catch (error) {
      alert("Problem z pobieraniem danych spróbuj ponownie!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateResult = () => {
    const selectedRate = rates[selectedCode];
    const parsedInputValue = parseFloat(inputValue);

    if (selectedRate && !isNaN(parsedInputValue) && parsedInputValue > 0) {
      const convertedValue = parsedInputValue * selectedRate.bid;
      setResult(`TO: ${convertedValue.toFixed(2)} PLN`);
    } else {
      setResult("Coś poszło nie tak.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateResult();
    // getRates();
  };

  return (
    <>
      <Form
        selectedCode={selectedCode}
        setSelectedCode={setSelectedCode}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSubmit={handleSubmit}
        result={result}
      />
      {loading && <Loading />}
    </>
  );
};

export default CurrencyConverter;
