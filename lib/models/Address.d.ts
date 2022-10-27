declare class Address {
    readonly address: string;
    constructor(address: Address | string | undefined);
    static from(address: Address | string | undefined): Address;
    toString(): string;
    truncate(): string;
    toLowercase(): string;
    eq(address: Address | string | undefined): boolean;
}
export declare type Addressish = Address | string | undefined;
export default Address;
