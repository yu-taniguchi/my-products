export function pack(format: string, data: number): string
{
    switch (format)
    {
        case 'c': //signed char
            return ('00' + data.toString(16)).slice(-2);
        case 'n': //unsigned short big-endian
            return ('0000' + data.toString(16)).slice(-4);
        default:
            return '';
    }
}

export function str2hexstr(str: string): string
{
    return str.split('').map(char => char.charCodeAt(0)).map(byte => byte.toString(16)).join('');
}