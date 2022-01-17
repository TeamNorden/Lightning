export type RGBColor = [number, number, number]

export type LTNLoggerType =
    | 'LOGIN'
    | 'COMMAND'
    | 'EVENT'
    | 'READY'
    | 'LOAD'
    | 'DATABASE'

export type LTNLoggerUtilsType = 'ERROR' | 'WARN'

export type LTNLoggerOptions = {
    primary: RGBColor
    secondary: RGBColor
} & {
    [key in LTNLoggerType]?: RGBColor
} & {
    [key in LTNLoggerUtilsType]?: RGBColor
}
