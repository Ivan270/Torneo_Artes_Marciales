import Personaje from './Personaje.js';

class Saiyajin extends Personaje {
	constructor(nombre, img, poder, raza) {
		super(nombre, img, poder, raza);
	}

	Transformacion() {
		let poder = this.getPoder();
		this.setPoder(parseInt(poder * 1.8)); // aumenta poder en 80%
	}
}
class Humano extends Personaje {
	constructor(nombre, img, poder, raza) {
		super(nombre, img, poder, raza);
	}

	Coraje() {
		let poder = this.getPoder();
		this.setPoder(parseInt(poder * 1.2)); // aumenta poder en 20%
	}
}

export { Saiyajin, Humano };
