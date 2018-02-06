
// tehtiin ng g class models/media

// ? tekee kyseisen parametrin valinnaiseksi

export class Media {
    constructor(
        public title: string,
        public description?: string) {
    }
}
