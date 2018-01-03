export const DEFAULT_TEMPLATE = `
<div class="canvas_wrapper_div">
     <span class="canvas_whiteboard_buttons">
         <canvas-whiteboard-colorpicker *ngIf="colorPickerEnabled" [selectedColor]="strokeColor" (onColorSelected)="changeColor($event)"></canvas-whiteboard-colorpicker>
         <button *ngIf="drawButtonEnabled" (click)="toggleShouldDraw()"
                 [class.canvas_whiteboard_button-draw_animated]="buttonAnimation && getShouldDraw()"
                 [class.selected]="!buttonAnimation && getShouldDraw()"
                 class="canvas_whiteboard_button canvas_whiteboard_button-draw" type="button">
                <i [class]="drawButtonClass" aria-hidden="true"></i>
                   {{drawButtonText}}
        </button>
        
        <button *ngIf="polygonButtonEnabled" (click)="toggleShouldDrawPolygon()"
                 [class.canvas_whiteboard_button-draw_animated]="buttonAnimation && getShouldDrawPolygon()"
                 [class.selected]="!buttonAnimation && getShouldDrawPolygon()"
                 class="canvas_whiteboard_button canvas_whiteboard_button-draw-polygon" type="button">
                <i [class]="polygonButtonClass" aria-hidden="true"></i>
                   {{polygonButtonText}}
        </button>
        
        <button *ngIf="lineButtonEnabled" (click)="toggleShouldDrawLine()"
                 [class.canvas_whiteboard_button-draw_animated]="buttonAnimation && getShouldDrawLine()"
                 [class.selected]="!buttonAnimation && getShouldDrawLine()"
                 class="canvas_whiteboard_button canvas_whiteboard_button-draw-line" type="button">
                <i [class]="lineButtonClass" aria-hidden="true"></i>
                   {{lineButtonText}}
        </button>
        
        <button *ngIf="eraseButtonEnabled" (click)="toggleShouldErase()"
                 [class.canvas_whiteboard_button-draw_animated]="buttonAnimation && getShouldErase()"
                 [class.selected]="!buttonAnimation && getShouldErase()"
                 class="canvas_whiteboard_button canvas_whiteboard_button-erase" type="button">
                <i [class]="eraseButtonClass" aria-hidden="true"></i>
                   {{eraseButtonText}}
        </button>
        
        <button *ngIf="clearButtonEnabled" (click)="clearCanvasLocal()" type="button" class="canvas_whiteboard_button canvas_whiteboard_button-clear">
            <i [class]="clearButtonClass" aria-hidden="true"></i>
                    {{clearButtonText}}
        </button>
        
         <button *ngIf="undoButtonEnabled" (click)="undoLocal()" type="button" class="canvas_whiteboard_button canvas_whiteboard_button-undo">
             <i [class]="undoButtonClass" aria-hidden="true"></i>
                    {{undoButtonText}} 
         </button>
         
         <button *ngIf="redoButtonEnabled" (click)="redoLocal()" type="button" class="canvas_whiteboard_button canvas_whiteboard_button-redo">
             <i [class]="redoButtonClass" aria-hidden="true"></i>
                    {{redoButtonText}}
         </button> 
         <button *ngIf="saveDataButtonEnabled" (click)="saveLocal()" type="button" class="canvas_whiteboard_button canvas_whiteboard_button-save">
             <i [class]="saveDataButtonClass" aria-hidden="true"></i>
                    {{saveDataButtonText}}
         </button>
     </span>
    <canvas #canvas
            (mousedown)="canvasUserEvents($event)" (mouseup)="canvasUserEvents($event)"
            (mousemove)="canvasUserEvents($event)" (mouseout)="canvasUserEvents($event)"
            (touchstart)="canvasUserEvents($event)" (touchmove)="canvasUserEvents($event)"
            (touchend)="canvasUserEvents($event)" (touchcancel)="canvasUserEvents($event)">
    </canvas>
</div>
    `;

export const DEFAULT_STYLES = `
.canvas_whiteboard_button {
    display: inline-block;
    outline: 0px;
    padding-top: 7px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}
@media (max-width: 400px) {
     .canvas_whiteboard_buttons {
            position: absolute;
            top: 0;
            width: 100%;
            text-align: center;
      }
}
        
@media (min-width: 401px) { 
    .canvas_whiteboard_buttons {
        position: absolute;
        right: 0%;
        color: #fff;
    }
}

.canvas_whiteboard_buttons {
    padding: 5px;
}

.canvas_whiteboard_buttons > button {
    margin: 5px;
    color: #159adf;
    background-color: #fff;
    padding: 4px 14px 3px;
    border: 1px solid #d0d0d0;
}

.canvas_whiteboard_buttons > button.selected {
    color: #fff;
    background-color: #159adf;
}

.canvas_whiteboard_button-draw_animated {
    -webkit-animation: pulsate 1s ease-out;
    -webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes pulsate {
    0% {
        -webkit-transform: scale(0.1, 0.1);
        opacity: 0.0;
    }
    50% {
        opacity: 1.0;
    }
    100% {
        -webkit-transform: scale(1.2, 1.2);
        opacity: 0.0;
    }
}
.canvas_wrapper_div {
    width: 100%;
    height: 100%;
    border: 0.5px solid #e2e2e2;
}

.canvas_whiteboard_button-clear {
    padding-top: 5px;
}`;