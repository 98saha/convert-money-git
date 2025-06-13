
const form = document.getElementById("converterForm");
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.querySelector(".result");
const loading = document.querySelector(".loading");
const error = document.querySelector(".error");
const converTerbtn = document.getElementById("converTerbtn");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

async function convertMoney() {
  // Verificação do valor
  if (!amount.value || amount.value <= 0) {
    error.textContent = "Insira um valor válido.";
    error.style.display = "block";
    return;
  }

  // Oculta botões e mensagens
  error.style.display = "none";
  result.innerHTML = "";
  converTerbtn.style.display = "none";
  loading.style.display = "block";

  try {
    const response = await fetch(API_URL + fromCurrency.value);
    if (!response.ok) throw new Error("Erro na resposta da API");

    const data = await response.json();
    const rate = data.rates[toCurrency.value];

    if (!rate) throw new Error("Moeda de destino inválida");

    const convertedValue = (amount.value * rate).toFixed(2);

    // Aguarda para mostrar o loading
    setTimeout(() => {
      loading.style.display = "none";
      converTerbtn.style.display = "inline-block";
      result.innerHTML = `
            <div>
              ${amount.value} ${fromCurrency.value} = <strong>${convertedValue} ${toCurrency.value}</strong>
            </div>
          `;
    }, 1000);
  } catch (err) {
    loading.style.display = "none";
    converTerbtn.style.display = "inline-block";
    error.textContent = "Erro ao converter. Verifique os dados e tente novamente.";
    error.style.display = "block";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  convertMoney();
});


