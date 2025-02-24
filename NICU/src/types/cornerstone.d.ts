declare module 'cornerstone-core' {
  export function enable(element: HTMLElement): void;
  export function disable(element: HTMLElement): void;
  export function loadImage(imageId: string): Promise<any>;
  export function displayImage(element: HTMLElement, image: any): void;
}

declare module 'cornerstone-web-image-loader' {
  export const external: {
    cornerstone: any;
  };
}

declare module 'cornerstone-tools' {
  export const external: {
    cornerstone: any;
    cornerstoneMath: any;
  };
  export function init(config?: any): void;
  export const math: any;
  export function addTool(tool: any): void;
  export function setToolActive(toolName: string, config: { mouseButtonMask: number }): void;
  export const WwwcTool: any;
  export const ZoomTool: any;
  export const PanTool: any;
}