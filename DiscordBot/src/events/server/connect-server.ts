import { Socket } from 'net';
import * as binary from '../../functions/binary-functinos.js';

const SERVER_ADDRESS = 'tanic.aternos.me';
const SERVER_PORT = 24187;
const SERVER_DESCRIPTION = 'Welcome to §1tanike §rserver!';

let data: string;
let serverInfo: InfoFromPing;
let serverInfoDetail: string;
let serverOnline = false;

interface InfoFromPing
{
    ServerName: string | undefined,
    Players: number | undefined,
    MaxPlayer: number | undefined,
    ProtocolVer: number | undefined,
    Version: string | undefined;
}


export function sendPingOldPre17(): void
{
    let tanicClientOldPre17 = new Socket();

    tanicClientOldPre17.connect(SERVER_PORT, SERVER_ADDRESS, () =>
    {
        tanicClientOldPre17.write(Buffer.from([0xFE, 0x01]));
    });

    tanicClientOldPre17.on('data', raw_data =>
    {
        if (raw_data.readUint8(0) == 255)
        {
            let str_data = '';
            for (let i = 0; i < (raw_data.length - 1) / 2; i++)
            {
                let str = String.fromCharCode(raw_data.readUint16BE(2 * i + 1));
                str_data += str;
            }
            let claster = str_data.split('\x00');
            serverInfo = {
                ServerName: claster[3],
                Players: parseInt(claster[4] ?? ''),
                MaxPlayer: parseInt(claster[5] ?? ''),
                ProtocolVer: parseInt(claster[1] ?? ''),
                Version: claster[2]
            };
        }
        if (serverInfo.ServerName == SERVER_DESCRIPTION)
        {
            serverOnline = true;
        }
        else
        {
            serverOnline = false;
        }
        tanicClientOldPre17.destroy();
    });

    tanicClientOldPre17.on('error', (e) =>
    {
        serverOnline = false;
        console.log(e);
        tanicClientOldPre17.destroy();
    });
}

export function sendPing(): void
{
    let tanicClient = new Socket;
    data = '0004' + binary.pack('c', SERVER_ADDRESS.length) + binary.str2hexstr(SERVER_ADDRESS) + binary.pack('n', SERVER_PORT) + '01';
    data = binary.pack('c', data.length / 2) + data + '0100';
    let byte_data = Buffer.from(data, 'hex');

    tanicClient.connect(SERVER_PORT, SERVER_ADDRESS, () =>
    {
        tanicClient.write(byte_data);
    });

    tanicClient.on('data', raw_data =>
    {
        let str_data = raw_data.toString('utf8');
        str_data = str_data.substring(str_data.indexOf('{'));
        try
        {
            str_data = JSON.parse(str_data);
            serverInfoDetail = str_data;
        }
        catch (e)
        {
            console.log(e);
        };
        tanicClient.destroy();
    });

    tanicClient.on('error', (e) =>
    {
        console.log(e);
        tanicClient.destroy();
    });
}

export function getServerInfo(): InfoFromPing
{
    return serverInfo;
}

export function getServerInfoDetail(): string
{
    return serverInfoDetail;
}

export function isServerOnline(): boolean
{
    return serverOnline;
};