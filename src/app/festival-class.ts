export class FestivalClass {

    constructor(
        public id: number,
        public name: string,
        public location: string,
        public region: string,
        public year: number,
        public hidden: boolean = false
    ) {}

    getState(): string {
        if (this.year > new Date().getFullYear()) {
            return 'Programmé';
        } else if (this.year === new Date().getFullYear()) {
            return 'En cours';
        } else {
            return 'Terminé';
        }
    }
}
