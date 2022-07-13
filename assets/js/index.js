import { Saiyajin, Humano } from './clases/Razas.js';

// interaccion de boton registrar
let participantes = [];

document.getElementById('btnRegistrar').addEventListener('click', () => {
	let nombre = document.getElementById('nombre'); //selector del formulario
	let raza = document.getElementById('raza');
	let previewElement = document.getElementById('preview');
	let imagenSrcBg = previewElement.style.backgroundImage; // para definir el fondo
	let imgSrc = imagenSrcBg.slice(5, imagenSrcBg.length - 2); // para obtener direccion del string completo del background image
	let ki = document.getElementById('poderPelea');

	let nuevoParticipante;

	// Participante se instanciará dependiendo de la raza

	if (raza.value == 'Saiyajin') {
		nuevoParticipante = new Saiyajin(
			nombre.value,
			imgSrc,
			ki.value,
			raza.value
		);
	} else if (raza.value == 'Humano') {
		nuevoParticipante = new Humano(nombre.value, imgSrc, ki.value, raza.value);
	}

	// Validar que todo el formulario se haya llenado
	if (nombre.value && raza.value && ki.value && imagenSrcBg) {
		participantes.push(nuevoParticipante);
		// Luego de pushear los datos, resetear el formulario
		nombre.selectedIndex = 0;
		raza.selectedIndex = 0;
		previewElement.style.backgroundImage = 'none';
		imagenSrcBg = previewElement.style.backgroundColor = '#f0f0f0';
		ki.value = '';
	} else {
		alert('Faltan datos por llenar');
	}
	// console.log(participantes);
	reloadTable(); // cada vez que se registre un nuevo participante se recargara la tabla
});

// tomar todos los participantes de arreglo partcipantes y mostrarlos en tarjeta bootstrap en tabla participantes

const reloadTable = () => {
	const participantesTemplate = document.getElementById('Participantes');
	// Primero: limpiar tabla
	participantesTemplate.innerHTML = '';
	participantes.forEach((p, i) => {
		// p es personaje e i es indice o index
		participantesTemplate.innerHTML += `<div class="px-3 pb-2 participante" data-fighter="${p.getNombre()}">
        <div class="card">
            <img src="${p.getImg()}" class="card-img-top"/>
            <div class="card-body">
                <h4 class="card-title">${p.getNombre()}</h4>
                <hr class="w-50 mx-auto">
                <h6 class="card-text">Raza: ${p.getRaza()}</h6>
                <h6 class="card-text">Poder de pelea: <span class="text-danger">${p.getPoder()}</span></h6>
                <button class="btn btn-outline-warning" onclick="activarHabilidad('${i}')">Habilidad Especial</button>
            </div>
        </div>
    </div>`;
	});
};

// Habilidad especial, i es el indice del arreglo participantes
window.activarHabilidad = (i) => {
	const participante = participantes[i];
	if (participante.getRaza() == 'Saiyajin') {
		participante.Transformacion();
	} else if (participante.getRaza() == 'Humano') {
		participante.Coraje();
	}
	reloadTable();
};

// boton quien es el mas fuerte
document.getElementById('btnMasFuerte').addEventListener('click', () => {
	const masFuerte = participantes.sort(
		(a, b) => b.getPoder() - a.getPoder()
	)[0]; //formula para ordenar de mayor a menor. El primer elemento del arreglo, el primer elemento correspondera al mas fuerte
	const nombre = masFuerte.getNombre();

	document.querySelector(`[data-fighter='${nombre}'] div`).style.boxShadow =
		'0px 0px 5px 1px yellow';
});
