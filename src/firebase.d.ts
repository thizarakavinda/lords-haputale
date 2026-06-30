declare module 'firebase/app' {
  export function initializeApp(config: any): any;
}

declare module 'firebase/database' {
  export function getDatabase(app?: any): any;
  export function ref(db: any, path?: string): any;
  export function push(reference: any, value: any): Promise<any>;
}
