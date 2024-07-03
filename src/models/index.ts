export default class Model {
    private model: any

    constructor(model: any) {
        this.model = model;
    }

    create(data: any) {
        this.model.push(data)
    }

    findOne(data: any) {
        const key = Object.keys(data)[0];
        const value = data[key];

        return this.model.find((item: any) => item[key] === value);
    };

    findAll() {
        return this.model;
    }
}
