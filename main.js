const ehNumero = new RegExp("^(([\\d]{1,7})(\\,([\\d]{0,2}))?)$");

const valorAtualDolarEmReais = 5.72;
let valorDolar = 1;
let valorReal = 5.72;

function onkeyupDolar(inputDolar) {
    const convertido = tranformarValor(inputDolar.value, valorDolar);

    const calculo = valorDolar * valorAtualDolarEmReais;
    const temp = Math.floor(calculo * 100);
    const resultado = (temp /100).toFixed(2);

    const inputReal = document.getElementById("real");
    inputReal.value = resultado.toString().replace(".", ",");

    inputDolar.value = convertido;
}

function onkeyupReal(inputReal) {
    const convertido = tranformarValor(inputReal.value, valorReal);

    const calculo = valorDolar / valorAtualDolarEmReais;
    const temp = Math.floor(calculo * 100);
    const resultado = (temp / 100).toFixed(2);

    const inputDolar = document.getElementById("dolar");
    inputDolar.value = resultado.toString().replace(".", ",");

    inputReal.value = convertido;
}

function tranformarValor(valorInput, valorMudanca) {
    let temVirgula = false;

    if(ehNumero.test(valorInput)){
        
        /* quando a diferença entre o length e o indexOf for igual a 1
        segnifica que o numero posssui uma virgula sem numeros depois.
        ex: 123,*/
        if(valorInput.length - valorInput.indexOf(',') === 1){
            temVirgula = true; 
        }

        valorMudanca = parseFloat(valorInput.replace(",", "."));
        
    } else if(valorInput === ""){
        valorMudanca = 0;
    }
    
    const convertido = valorMudanca.toString().replace(".", ",");
    return temVirgula ? `${convertido},` : convertido;;
}
