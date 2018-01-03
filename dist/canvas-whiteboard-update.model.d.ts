export declare const UPDATE_TYPE: {
    "start": number;
    "drag": number;
    "stop": number;
    "polygonPoint": number;
    "polygonClose": number;
    "lineStart": number;
    "lineEnd": number;
};
export declare class CanvasCoordinates {
    private _x;
    private _y;
    constructor(x: number, y: number);
    x: number;
    y: number;
}
export declare class CanvasWhiteboardUpdate {
    private _x;
    private _y;
    private _type;
    private _strokeColor;
    private _uuid;
    private _visible;
    constructor(x: number, y: number, type: number, strokeColor?: string, uuid?: string, visible?: boolean);
    setX(newX: number): void;
    getX(): number;
    setY(newY: number): void;
    getType(): number;
    getY(): number;
    setStrokeColor(strokeColor: string): void;
    getStrokeColor(): string;
    setUUID(uuid: string): void;
    getUUID(): string;
    setVisible(visible: boolean): void;
    getVisible(): boolean;
    static deserializeJson(json: any): CanvasWhiteboardUpdate;
    /**
     * @deprecated Use the stringify() method
     */
    serializeToJson(onlyShowCoordinatesAndType?: boolean): string;
    stringify(onlyShowCoordinatesAndType?: boolean): string;
}
