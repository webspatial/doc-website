declare module '*.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '@theme/*' {
  const Component: React.ComponentType<any>;
  export default Component;
}
