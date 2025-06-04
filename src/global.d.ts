declare module '*.scss';

declare module '@theme/*' {
  const Component: React.ComponentType<any>;
  export default Component;
}
