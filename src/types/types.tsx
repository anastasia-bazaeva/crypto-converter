export enum ThemeType {
    Light = 'light',
    Dark = 'dark'
}

export enum OptionNameType {
    BTC = 'BTC',
    ETH = 'ETH',
    USDT = 'USDT'
}

export enum OptionFullName {
    Bitcoin = 'Bitcoin',
    Etheriem = 'Ethereum',
    Tether = 'Tether'
}

export type OptionType = {
    value: OptionNameType,
    name: OptionFullName,
    label: string,
}

export type reqType = {
    from: OptionFullName,
    to: OptionNameType
}