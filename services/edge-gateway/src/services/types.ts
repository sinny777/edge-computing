import { Interface } from "readline";
import { SystemInfo } from "../models";

export interface CommonServiceI {
    getSystemInformation(valueObject: any): Promise<SystemInfo> ;
    getSerialNumber(): Promise<string> ;
}

export interface RadioServiceI {
    initRadio(): void;
    isAvailable(): boolean;
}

export interface GatewayServiceI {
    initGateway(): void;    
    getSystemInformation(valueObject: any): Promise<SystemInfo> ;
}