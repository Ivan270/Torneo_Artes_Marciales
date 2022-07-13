// IIFE
let personajes = (() => {
	const url = 'dbz.json';
	const getData = async () => {
		const res = await fetch(url);
		const data = await res.json(); // constante res debe esperar a que se resuelva promesa de metodo json
		return data;
	};

	return { getData };
})();

export default personajes;
