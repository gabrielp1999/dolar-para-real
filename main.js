//  o enNumero é expressão regular para bloquear letras,
// definir cacas decimais e limitar numeros
const ehNumero = new RegExp("^(([\\d]{1,7})(\\,([\\d]{0,2}))?)$");



let valorAtualDolarEmReais = "";
let valorDolar = "";
let valorReal = "";

async function buscarApi() {

    const resultado = await axios(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL`);
    let valorDolarApi = resultado.data.USDBRL.bid;

    // const data = `Atualizado em: ${resultado.data.USDBRL.create_date}`;
    valorReal = valorDolarApi;
    valorAtualDolarEmReais = valorDolarApi;
}

function onkeyupDolar(inputDolar) {
    const valorTransformado = tranformarValor(inputDolar.value, "dolar");
    valorDolar = valorTransformado.valorNumero;

    const calculo = valorDolar * valorAtualDolarEmReais;
    /// Math.floor retorna o numero inteiro
    const temp = Math.floor(calculo * 100);
    // toFixed pega a quantidade de casas decimal que passar no parametro
    const resultado = (temp /100).toFixed(2);

    const inputReal = document.getElementById("real");
    // o ToString converte o elemento para string 
    // replace substitui o primeiro item da aspa para o segundo
    inputReal.value = resultado.toString().replace(".", ",");

    inputDolar.value = valorTransformado.valorTexto;

}

function onkeyupReal(inputReal) {
    const valorTranformado = tranformarValor(inputReal.value, "real");
    valorReal = valorTranformado.valorNumero;

    const calculo = valorReal / valorAtualDolarEmReais;
    /// Math.floor retorna o numero inteiro
    const temp = Math.floor(calculo * 100);
    const resultado = (temp / 100).toFixed(2);


    const  calculoEuro = inputReal.value / valorEuro;
    const temp2 = Math.floor(calculoEuro * 100);
    const resultado2 = (temp2 / 100).toFixed(2);

    const inputDolar = document.getElementById("dolar");
    const inputEuro = document.getElementById("euro");
        // o ToString converte o elemento para string 
       // replace substitui o primeiro item da aspa para o segundo
    inputDolar.value = resultado.toString().replace(".", ",");
    
    inputEuro.value = resultado2.toString().replace(".", ",");
    inputReal.value = valorTranformado.valorTexto;
}

function onkeyupEuro(inputEuro) {
    const inputReal = document.getElementById("real");

    const calculo = inputEuro.value * valorEuro;
    inputReal.value = calculo;
}

function tranformarValor(valorInput, moeda) {
    let temVirgula = false;
    let valorNumero = moeda === "real" ? valorReal : valorDolar;

    if(ehNumero.test(valorInput)){
        
        /* quando a diferença entre o length e o indexOf for igual a 1
        segnifica que o numero posssui uma virgula sem numeros depois.
        ex: 123,*/
        if(valorInput.length - valorInput.indexOf(',') === 1){
            temVirgula = true; 
        }
        // parseFloat serve para converter string em number e replace substitui
        valorNumero  = parseFloat(valorInput.replace(",", "."));
        
    } else if(valorInput === ""){
        valorNumero = 0;
    }
    
    const convertido = valorNumero.toString().replace(".", ",");
    return{
        valorTexto: temVirgula ? `${convertido},` : convertido,
        valorNumero 
    }
}

document.getElementById('real').value = valorReal.toString().replace(".", ",");
document.getElementById('dolar').value = valorDolar.toString().replace(".", ",");



buscarApi()