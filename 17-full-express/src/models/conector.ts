import fs from 'fs/promises';
export class Connector<T extends { id: number }> {
    data: Array<T>;
    filePath: string;
    // eslint-disable-next-line no-unused-vars
    constructor(private storeName: string) {
        this.data = [];
        this.filePath = `./data/${this.storeName}.json`;
    }
    private async readFile() {
        return JSON.parse(
            await fs.readFile(this.filePath, { encoding: 'utf-8' })
        ) as Array<T>;
    }
    private async writeFile(data: Array<T>) {
        fs.writeFile(this.filePath, JSON.stringify(data), {
            encoding: 'utf-8',
        });
    }

    async readAll(): Promise<Array<T>> {
        return this.readFile();
    } // getAll , findAll , o readAll solicitar todos los elementos
    async read(id: number): Promise<T | undefined> {
        const fileData = await this.readFile();
        const task = fileData.find((item) => item.id === id);
        return task;
    } // find, get, solicitar un unico elemento del array
    async create(data: Partial<T>): Promise<T | undefined> {
        const fileData = await this.readFile();
        const newTask = { ...data, id: fileData[fileData.length - 1].id + 1 };
        fileData.push(newTask as T);
        this.writeFile(fileData);
        return newTask as T;
    }
    async update(id: number, data: Partial<T>): Promise<T> {
        let fileData = await this.readFile();
        let updateItem;
        if (data.id) delete data.id;
        fileData = fileData.map((item) => {
            if (item.id === id) {
                updateItem = { ...item, ...data };
                return updateItem;
            } else {
                return item;
            }
        });
        this.writeFile(fileData);

        return updateItem as unknown as T;
    }
    async delete(id: number) {
        let status = { status: 0 };
        let fileData = await this.readFile();
        const prevLength = fileData.length;

        fileData = fileData.filter((item) => item.id !== id);

        this.writeFile(fileData);

        if (prevLength === fileData.length) {
            status.status = 404;
            return status;
        } else {
            status.status = 202;
            return status;
        }
    }
}
// export class conector {
//     private storeName
//     constructor( storeName: string) {
//         this.storeName = storeName;
//     }

//     read() {}
//     create() {}
//     update() {}
//     delete() {}
// }
// otra forma de hacerlo.
