export class FestivalClass {

    constructor(
        public id: number,
        public name: string,
        public location: string,
        public region: string,
        public date: Date,
    ) {}

    getState(): string {
        const today = new Date();
        
        if (this.date > today) {
            return 'Programmé';
        } else if (this.date.getFullYear() === today.getFullYear() && 
                  this.date.getMonth() === today.getMonth() && 
                  this.date.getDate() === today.getDate()) {
            return 'En cours';
        } else {
            return 'Terminé';
        }
    }

    isCurrent(): boolean {
        const today = new Date();
        return this.date.getFullYear() === today.getFullYear() && 
               this.date.getMonth() === today.getMonth() && 
               this.date.getDate() === today.getDate();
    }
}
