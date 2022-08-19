export interface IDictionary<TValue> {
    [id: string]: TValue;
}

export const GetRandomInteger = (max: number) => Math.floor(max * Math.random());

export class IdGenerator {
    static id: number = 1;

    static generate = () => this.id++;
}