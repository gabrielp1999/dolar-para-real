//  o enNumero é expressão regular para bloquear letras,
// definir cacas decimais e limitar numeros
const ehNumero = new RegExp("^(([\\d]{1,7})(\\,([\\d]{0,2}))?)$");

const valorAtualDolarEmReais = 5.72;
let valorDolar = 1;
let valorReal = 5.75;

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

    const inputDolar = document.getElementById("dolar");
        // o ToString converte o elemento para string 
       // replace substitui o primeiro item da aspa para o segundo
    inputDolar.value = resultado.toString().replace(".", ",");

    inputReal.value = valorTranformado.valorTexto;
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