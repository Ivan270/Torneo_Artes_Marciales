import Personajes from './Consulta.js';
// Generar interaccion de boton 'Ver imagenes'
document.getElementById('buttonImages').addEventListener('click', async () => {
	// es asincrona porque necesita obtener el atributo personaje del json. Al hacer la consulta en 'Consulta.js' devuelve el objeto completo, pero solo necesitamos el atributo personajes.
	const { personajes } = await Personajes.getData(); // al ser getData funcion async, hay que esperar (await) a que termine la promesa
	console.log(personajes);

	// Obtener nombre seleccionado en formulario, para obtener imagen de ese mismo peleador seleccionado.
	const pj = document.getElementById('nombre').value;

	// Encontrar objeto que tenga la propiedad name igual a 'pj' y entrar a atributo imagenes, luego mapearlo (porque tambien es un array) dentro de un template de imagen para insertar en el MODAL, siendo 'i' el nombre de la imagen.
	// Map devuelve un arreglo, porr lo que se usará metodo join, que transforma un arreglo en un string definiendo un separador
	const imagenesPJTemplate = personajes
		.find((p) => p.name == pj)
		.imagenes.map((i) => `<img width="200" src="/assets/imgs/${pj}/${i}" />`)
		.join('');

	// Obtener div del MODAL
	document.getElementsByClassName('personajes')[0].innerHTML =
		imagenesPJTemplate; //Devuelve un html collection, pero solo le pediremos el primero

	// Para que interaccion de click a todas las imagenes, asigna la clickeada para el formulario
	// Agregar evento click a todas las imagenes de personaje
	document.querySelectorAll('.personajes img').forEach((i) => {
		// i corresponde a imagen
		i.addEventListener('click', (e) => {
			// e es evento click
			$('#imagenModal').modal('toggle'); //jquery para cierre de ventana modal
			const imagenSrc = e.target.src; // se obtiene atributo src de la imagen dentro de la que el usuario hace click en el modal
			// Se inserta en el formulario la imagen seleccionada
			document.getElementById(
				'preview'
			).style.backgroundImage = `url(${imagenSrc})`;
		});
	});
});
