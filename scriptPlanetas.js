
let corposCelestes = [];
let planetasFiltrados = [];
let terraFiltrada = [];
let planetaSemLua = [];
let planetasNome = [];
let planetasNomeOrdenados = [];
let planetasNomeVirgula = "Teste";
let cincoMenoresPlanetas = [];
let massaTotal = [];

async function getBodies() {
    console.log("Buscando dados...");
    const result = await axios.get("https://api.le-systeme-solaire.net/rest/bodies/");
    corposCelestes = result.data.bodies;
}

function filtrarPlanetas() {
    const filtradoPlaneta = corposCelestes.filter(planeta => planeta.isPlanet === true)
    planetasFiltrados = filtradoPlaneta
}

function filtrarTerra() {
    const filtroTerra = corposCelestes.filter(planeta1 => planeta1.englishName === "Earth")
    terraFiltrada = filtroTerra
}

function planetasSemLuas(){
    const planetaNotLua = planetasFiltrados.some((semLua) => semLua.moons === null)
    planetaSemLua = planetaNotLua
}

function listarNomesPlanetas() {
    planetasNome = planetasFiltrados.map((planeta) => {
        return `Nome ${planeta.englishName}`;
    });
}

function listarPlanetasOrdenados() {
    planetasFiltrados.sort(function(a, b){return a.meanRadius - b.meanRadius})
    planetasNomeOrdenados = planetasFiltrados.map((planeta) => {
        return `Nome: ${planeta.englishName} Raio médio: ${planeta.meanRadius}`;
    });
}

function listarPlanetasVirgula() {
    let planetasNomeSomente = planetasFiltrados.map((planeta) => {
        return planeta.englishName;
    });
    planetasNomeVirgula = planetasNomeSomente.join(", ")
}

function somarMassas() {
    planetasFiltrados.sort(function(a, b){return a.meanRadius - b.meanRadius})
    cincoMenoresPlanetas = planetasFiltrados.slice(0, 5);

    massaTotal = cincoMenoresPlanetas.reduce((total, planeta) => {
        return total + planeta.mass.massValue * Math.pow(10,planeta.mass.massExponent);
    }, 0);
}




getBodies().then(() => {
    filtrarPlanetas()
    filtrarTerra()
    planetasSemLuas()
    listarNomesPlanetas()
    listarPlanetasOrdenados()
    listarPlanetasVirgula()
    somarMassas()
    console.log("Questão 1");
    console.log(corposCelestes);
    console.log("Questão 2");
    console.log(planetasFiltrados);
    console.log("Questão 3");
    console.log(terraFiltrada);
    console.log("Questão 4");
    console.log("Existe planeta sem lua? " + planetaSemLua);
    console.log("Questão 5");
    console.log(planetasNome);
    console.log("Questão 6");
    console.log(planetasNomeOrdenados);
    console.log("Questão 7");
    console.log(planetasNomeVirgula);
    console.log("Questão 8");
    console.log(`Massa total dos 5 menores planetas: ${massaTotal}`);

}).catch((err) => {
    console.error("Erro", err);
}).finally(() => {
    console.log('Terminou');
});
