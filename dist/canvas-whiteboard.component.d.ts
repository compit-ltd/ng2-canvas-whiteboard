import { EventEmitter, ElementRef, OnInit, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { CanvasWhiteboardUpdate } from "./canvas-whiteboard-update.model";
import { CanvasWhiteboardService } from "./canvas-whiteboard.service";
export interface CanvasWhiteboardOptions {
    batchUpdateTimeoutDuration?: number;
    imageUrl?: string;
    aspectRatio?: number;
    strokeColor?: string;
    lineWidth?: number;
    drawButtonEnabled?: boolean;
    drawButtonClass?: string;
    drawButtonText?: string;
    clearButtonEnabled?: boolean;
    clearButtonClass?: string;
    clearButtonText?: string;
    undoButtonEnabled?: boolean;
    undoButtonClass?: string;
    undoButtonText?: string;
    redoButtonEnabled?: boolean;
    redoButtonClass?: string;
    redoButtonText?: string;
    saveDataButtonEnabled?: boolean;
    saveDataButtonClass?: string;
    saveDataButtonText?: string;
    colorPickerEnabled?: boolean;
    shouldDownloadDrawing?: boolean;
    startingColor?: string;
    polygonButtonEnabled?: boolean;
    polygonButtonClass?: string;
    polygonButtonText?: string;
    polygonBorderColor?: string;
    polygonFillColor?: string;
    polygonClosePixelRadius?: number;
    lineButtonEnabled?: boolean;
    lineButtonClass?: string;
    lineButtonText?: string;
    eraseButtonEnabled?: boolean;
    eraseButtonClass?: string;
    eraseButtonText?: string;
    buttonAnimation?: boolean;
}
export declare class CanvasWhiteboardComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    private _canvasWhiteboardService;
    options: CanvasWhiteboardOptions;
    batchUpdateTimeoutDuration: number;
    imageUrl: string;
    aspectRatio: number;
    drawButtonClass: string;
    clearButtonClass: string;
    undoButtonClass: string;
    redoButtonClass: string;
    saveDataButtonClass: string;
    drawButtonText: string;
    clearButtonText: string;
    undoButtonText: string;
    redoButtonText: string;
    saveDataButtonText: string;
    drawButtonEnabled: boolean;
    clearButtonEnabled: boolean;
    undoButtonEnabled: boolean;
    redoButtonEnabled: boolean;
    saveDataButtonEnabled: boolean;
    enableCors: boolean;
    shouldDownloadDrawing: boolean;
    colorPickerEnabled: boolean;
    lineWidth: number;
    strokeColor: string;
    polygonBorderColor: string;
    polygonFillColor: string;
    polygonClosePixelRadius: number;
    polygonButtonEnabled: boolean;
    polygonButtonClass: string;
    polygonButtonText: string;
    lineButtonEnabled: boolean;
    lineButtonClass: string;
    lineButtonText: string;
    eraseButtonEnabled: boolean;
    eraseButtonClass: string;
    eraseButtonText: string;
    buttonAnimation: boolean;
    startingColor: string;
    onClear: EventEmitter<any>;
    onUndo: EventEmitter<any>;
    onRedo: EventEmitter<any>;
    onBatchUpdate: EventEmitter<CanvasWhiteboardUpdate[]>;
    onImageLoaded: EventEmitter<any>;
    onSave: EventEmitter<string | Blob>;
    canvas: ElementRef;
    context: CanvasRenderingContext2D;
    private _imageElement;
    private _shouldDraw;
    private _canDraw;
    private _shouldDrawPolygon;
    private _canDrawPolygon;
    private _canDrawLine;
    private _polygonPoints;
    private _clientDragging;
    private _lastUUID;
    private _lastPositionForUUID;
    private _undoStack;
    private _redoStack;
    private _drawHistory;
    private _batchUpdates;
    private _updatesNotDrawn;
    private _updateTimeout;
    private _canvasWhiteboardServiceSubscriptions;
    private _shouldDrawLine;
    private _shouldErase;
    constructor(_canvasWhiteboardService: CanvasWhiteboardService);
    /**
     * Initialize the canvas drawing context. If we have an aspect ratio set up, the canvas will resize
     * according to the aspect ratio.
     */
    ngOnInit(): void;
    /**
     * Recalculate the width and height of the canvas after the view has been fully initialized
     */
    ngAfterViewInit(): void;
    /**
     * This method reads the options which are helpful since they can be really long when specified in HTML
     * This method is also called everytime the options object changes
     * For security reasons we must check each item on its own since if we iterate the keys
     * we may be injected with malicious values
     *
     * @param {CanvasWhiteboardOptions} options
     * @private
     */
    private _initInputsFromOptions(options);
    private _isNullOrUndefined(property);
    /**
     * Init global window listeners like resize and keydown
     * @private
     */
    private _initCanvasEventListeners();
    /**
     * Subscribes to new signals in the canvas whiteboard service and executes methods accordingly
     * Because of circular publishing and subscribing, the canvas methods do not use the service when
     * local actions are completed (Ex. clicking undo from the button inside this component)
     * @private
     */
    private _initCanvasServiceObservables();
    /**
     * Calculate the canvas width and height from it's parent container width and height (use aspect ratio if needed)
     * @private
     */
    private _calculateCanvasWidthAndHeight();
    /**
     * If an image exists and it's url changes, we need to redraw the new image on the canvas.
     */
    ngOnChanges(changes: any): void;
    /**
     * Load an image and draw it on the canvas (if an image exists)
     * @constructor
     * @param callbackFn A function that is called after the image loading is finished
     * @return Emits a value when the image has been loaded.
     */
    private _loadImage(callbackFn?);
    /**
     * Sends a notification after clearing the canvas
     * This method should only be called from the clear button in this component since it will emit an clear event
     * If the client calls this method he may create a circular clear action which may cause danger.
     */
    clearCanvasLocal(): void;
    /**
     * Clears all content on the canvas.
     */
    clearCanvas(): void;
    /**
     * This method resets the state of the canvas and redraws it.
     * It calls a callback function after redrawing
     * @param callbackFn
     * @private
     */
    private _removeCanvasData(callbackFn?);
    /**
     * Clears the canvas and redraws the image if the url exists.
     * @param callbackFn A function that is called after the background is redrawn
     * @return Emits a value when the clearing is finished
     */
    private _redrawBackground(callbackFn?);
    private _drawStartingColor();
    /**
     * Returns a value of whether the user clicked the draw button on the canvas.
     */
    getShouldDraw(): boolean;
    /**
     * Toggles drawing on the canvas. It is called via the draw button on the canvas.
     */
    toggleShouldDraw(): void;
    /**
     * Set if polygon drawing is enabled from the client using the canvas
     * @param {boolean} shouldDraw
     */
    setShouldDraw(shouldDraw: boolean): void;
    /**
     * Returns a value of whether the user clicked the polygon button on the canvas.
     */
    getShouldDrawPolygon(): boolean;
    /**
     * Toggles polygon drawing on the canvas. It is called via the polygon button on the canvas.
     */
    toggleShouldDrawPolygon(): void;
    /**
     * Set if line drawing is enabled from the client using the canvas
     * @param {boolean} shouldDrawPolygon
     */
    setShouldDrawPolygon(shouldDrawPolygon: boolean): void;
    /**
     * Set if line drawing is enabled from the client using the canvas
     * @param {boolean} shouldDrawPolygon
     */
    setShouldDrawLine(shouldDrawLine: boolean): void;
    /**
     * Returns a value of whether the user clicked the line button on the canvas.
     */
    getShouldDrawLine(): boolean;
    /**
     * Toggles line drawing on the canvas. It is called via the line button on the canvas.
     */
    toggleShouldDrawLine(): void;
    /**
     * Set if erasing is enabled from the client using the canvas
     * @param {boolean} shouldDrawPolygon
     */
    setShouldErase(shouldErase: boolean): void;
    /**
     * Returns a value of whether the user clicked the erase button on the canvas.
     */
    getShouldErase(): boolean;
    /**
     * Toggles erase on the canvas. It is called via the erase button on the canvas.
     */
    toggleShouldErase(): void;
    /**
     * Replaces the drawing color with a new color
     * The format should be ("#ffffff" or "rgb(r,g,b,a?)")
     * This method is public so that anyone can access the canvas and change the stroke color
     *
     * @param {string} newStrokeColor The new stroke color
     */
    changeColor(newStrokeColor: string): void;
    /**
     * This method is invoked by the undo button on the canvas screen
     * It calls the global undo method and emits a notification after undoing.
     * This method should only be called from the undo button in this component since it will emit an undo event
     * If the client calls this method he may create a circular undo action which may cause danger.
     */
    undoLocal(): void;
    /**
     * This methods selects the last uuid prepares it for undoing (making the whole update sequence invisible)
     * This method can be called if the canvas component is a ViewChild of some other component.
     * This method will work even if the undo button has been disabled
     */
    undo(): void;
    /**
     * This method takes an UUID for an update, and redraws the canvas by making all updates with that uuid invisible
     * @param {string} updateUUID
     * @private
     */
    private _undoCanvas(updateUUIDs);
    /**
     * This method is invoked by the redo button on the canvas screen
     * It calls the global redo method and emits a notification after redoing
     * This method should only be called from the redo button in this component since it will emit an redo event
     * If the client calls this method he may create a circular redo action which may cause danger.
     */
    redoLocal(): void;
    /**
     * This methods selects the last uuid prepares it for redoing (making the whole update sequence visible)
     * This method can be called if the canvas component is a ViewChild of some other component.
     * This method will work even if the redo button has been disabled
     */
    redo(): void;
    /**
     * This method takes an UUID for an update, and redraws the canvas by making all updates with that uuid visible
     * @param {string} updateUUID
     * @private
     */
    private _redoCanvas(updateUUIDs);
    /**
     * Catches the Mouse and Touch events made on the canvas.
     * If drawing is disabled (If an image exists but it's not loaded, or the user did not click Draw),
     * this function does nothing.
     *
     * If a "mousedown | touchstart" event is triggered, dragging will be set to true and an CanvasWhiteboardUpdate object
     * of type "start" will be drawn and then sent as an update to all receiving ends.
     *
     * If a "mousemove | touchmove" event is triggered and the client is dragging, an CanvasWhiteboardUpdate object
     * of type "drag" will be drawn and then sent as an update to all receiving ends.
     *
     * If a "mouseup, mouseout | touchend, touchcancel" event is triggered, dragging will be set to false and
     * an CanvasWhiteboardUpdate object of type "stop" will be drawn and then sent as an update to all receiving ends.
     *
     */
    canvasUserEvents(event: any): void;
    /**
     * Get the coordinates (x,y) from a given event
     * If it is a touch event, get the touch positions
     * If we released the touch, the position will be placed in the changedTouches object
     * If it is not a touch event, use the original mouse event received
     * @param eventData
     * @return {EventPositionPoint}
     * @private
     */
    private _getCanvasEventPosition(eventData);
    /**
     * The update coordinates on the canvas are mapped so that all receiving ends
     * can reverse the mapping and get the same position as the one that
     * was drawn on this update.
     *
     * @param {CanvasWhiteboardUpdate} update The CanvasWhiteboardUpdate object.
     * @param {number} eventX The offsetX that needs to be mapped
     * @param {number} eventY The offsetY that needs to be mapped
     */
    private _prepareToSendUpdate(update, eventX, eventY);
    /**
     * Catches the Key Up events made on the canvas.
     * If the ctrlKey or commandKey(macOS) was held and the keyCode is 90 (z), an undo action will be performed
     * If the ctrlKey or commandKey(macOS) was held and the keyCode is 89 (y), a redo action will be performed
     * If the ctrlKey or commandKey(macOS) was held and the keyCode is 83 (s) or 115(S), a save action will be performed
     *
     * @param event The event that occurred.
     */
    private _canvasKeyDown(event);
    /**
     * On window resize, recalculate the canvas dimensions and redraw the history
     * @private
     */
    private _redrawCanvasOnResize();
    /**
     * Redraw the saved history after resetting the canvas state
     * @private
     */
    private _redrawHistory();
    /**
     * Draws an CanvasWhiteboardUpdate object on the canvas. if mappedCoordinates? is set, the coordinates
     * are first reverse mapped so that they can be drawn in the proper place. The update
     * is afterwards added to the undoStack so that it can be
     *
     * If the CanvasWhiteboardUpdate Type is "drag", the context is used to draw on the canvas.
     * This function saves the last X and Y coordinates that were drawn.
     *
     * @param {CanvasWhiteboardUpdate} update The update object.
     * @param {boolean} mappedCoordinates? The offsetX that needs to be mapped
     */
    private _draw(update, mappedCoordinates?);
    /**
     * Sends the update to all receiving ends as an Event emit. This is done as a batch operation (meaning
     * multiple updates are sent at the same time). If this method is called, after 100 ms all updates
     * that were made at that time will be packed up together and sent to the receiver.
     *
     * @param {CanvasWhiteboardUpdate} update The update object.
     * @return Emits an Array of Updates when the batch.
     */
    private _prepareUpdateForBatchDispatch(update);
    /**
     * Draws an Array of Updates on the canvas.
     *
     * @param {CanvasWhiteboardUpdate[]} updates The array with Updates.
     */
    drawUpdates(updates: CanvasWhiteboardUpdate[]): void;
    /**
     * Draw any missing updates that were received before the image was loaded
     *
     */
    private _drawMissingUpdates();
    /**
     * Draws an image on the canvas
     *
     * @param {CanvasRenderingContext2D} context The context used to draw the image on the canvas.
     * @param {HTMLImageElement} image The image to draw.
     * @param {number} x The X coordinate for the starting draw position.
     * @param {number} y The Y coordinate for the starting draw position.
     * @param {number} width The width of the image that will be drawn.
     * @param {number} height The height of the image that will be drawn.
     * @param {number} offsetX The offsetX if the image size is larger than the canvas (aspect Ratio)
     * @param {number} offsetY The offsetY if the image size is larger than the canvas (aspect Ratio)
     */
    private _drawImage(context, image, x, y, width, height, offsetX, offsetY);
    /**
     * The HTMLCanvasElement.toDataURL() method returns a data URI containing a representation of the image in the format specified by the type parameter (defaults to PNG).
     * The returned image is in a resolution of 96 dpi.
     * If the height or width of the canvas is 0, the string "data:," is returned.
     * If the requested type is not image/png, but the returned value starts with data:image/png, then the requested type is not supported.
     * Chrome also supports the image/webp type.
     *
     * @param {string} returnedDataType A DOMString indicating the image format. The default format type is image/png.
     * @param {number} returnedDataQuality A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp.
     If this argument is anything else, the default value for image quality is used. The default value is 0.92. Other arguments are ignored.
     */
    generateCanvasDataUrl(returnedDataType?: string, returnedDataQuality?: number): string;
    /**
     * Generate a Blob object representing the content drawn on the canvas.
     * This file may be cached on the disk or stored in memory at the discretion of the user agent.
     * If type is not specified, the image type is image/png. The created image is in a resolution of 96dpi.
     * The third argument is used with image/jpeg images to specify the quality of the output.
     *
     * @param callbackFn The function that should be executed when the blob is created. Should accept a parameter Blob (for the result).
     * @param {string} returnedDataType A DOMString indicating the image format. The default type is image/png.
     * @param {number} returnedDataQuality A Number between 0 and 1 indicating image quality if the requested type is image/jpeg or image/webp.
     If this argument is anything else, the default value for image quality is used. Other arguments are ignored.
     */
    generateCanvasBlob(callbackFn: any, returnedDataType?: string, returnedDataQuality?: number): void;
    /**
     * Generate a canvas image representation and download it locally
     * The name of the image is canvas_drawing_ + the current local Date and Time the image was created
     * Methods for standalone creation of the images in this method are left here for backwards compatibility
     *
     * @param {string} returnedDataType A DOMString indicating the image format. The default type is image/png.
     * @param {string | Blob} downloadData The created string or Blob (IE).
     */
    downloadCanvasImage(returnedDataType?: string, downloadData?: string | Blob): void;
    /**
     * Save the canvas blob (IE) locally
     * @param {Blob} blob
     * @param {string} returnedDataType
     * @private
     */
    private _saveCanvasBlob(blob, returnedDataType?);
    /**
     * This method generates a canvas url string or a canvas blob with the presented data type
     * A callback function is then invoked since the blob creation must be done via a callback
     *
     * @param callback
     * @param {string} returnedDataType
     * @param returnedDataQuality
     */
    generateCanvasData(callback: any, returnedDataType?: string, returnedDataQuality?: number): void;
    /**
     * Local method to invoke saving of the canvas data when clicked on the canvas Save button
     * This method will emit the generated data with the specified Event Emitter
     *
     * @param {string} returnedDataType
     */
    saveLocal(returnedDataType?: string): void;
    private _generateDataTypeString(returnedDataType);
    /**
     * Unsubscribe from a given subscription if it is active
     * @param {Subscription} subscription
     * @private
     */
    private _unsubscribe(subscription);
    /**
     * Unsubscribe from the service observables
     */
    ngOnDestroy(): void;
}
